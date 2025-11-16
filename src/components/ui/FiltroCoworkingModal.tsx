"use client";

import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useCoworkingContext } from "@/context/CoworkingContext";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const Modal = styled(motion.div)`
  background-color: white;
  width: 320px;
  border-radius: 12px;
  padding: 1.5rem;
  position: absolute;
  top: 100px;
  right: 40px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 1rem;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Item = styled.li<{ selected: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #eee;
  font-weight: ${({ selected }) => (selected ? "bold" : "normal")};
  cursor: pointer;
`;

const RadioCircle = styled.div<{ selected: boolean }>`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid #a0c3ff;
  background-color: ${({ selected }) => (selected ? "#a0c3ff" : "transparent")};
`;

const ApplyButton = styled.button`
  margin-top: 1.5rem;
  width: 100%;
  background-color: #a0c3ff;
  color: white;
  font-weight: 600;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #8db7ff;
  }
`;

const barrios = ["Todos", "Palermo", "Recoleta", "Belgrano", "Villa Urquiza"];

interface Props {
  visible: boolean;
  onClose: () => void;
  onApplyStart: () => void; // nuevo prop
}

export const FiltroCoworkingModal = ({
  visible,
  onClose,
  onApplyStart,
}: Props) => {
  const { filtros, setFiltros, setPagina } = useCoworkingContext();

  const [barrio, setBarrio] = useState("Todos");
  const [tipoEspacio, setTipoEspacio] = useState("Todos");

  useEffect(() => {
    if (visible) {
      setBarrio(filtros.barrio || "Todos");
      setTipoEspacio(filtros.tipoEspacio || "Todos");
    }
  }, [visible, filtros]);

  const handleAplicar = () => {
    onApplyStart(); // dispara shimmer
    setFiltros({
      ...filtros,
      barrio: barrio === "Todos" ? "todos" : barrio,
      tipoEspacio:
        tipoEspacio === "Todos"
          ? "todos"
          : tipoEspacio.toLowerCase().replace(" ", "_"),
    });
    setPagina(1);
    setTimeout(onClose, 300);
  };

  const handleBorrarFiltros = () => {
    setBarrio("Todos");
    setTipoEspacio("Todos");
    setFiltros({
      ...filtros,
      barrio: "todos",
      tipoEspacio: "todos",
    });
    setPagina(1);
    onClose();
  };

  return (
    <AnimatePresence>
      {visible && (
        <Overlay onClick={onClose}>
          <Modal
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Header>
              <span>Filtrar por barrio</span>
              <span
                onClick={handleBorrarFiltros}
                style={{
                  fontWeight: 400,
                  fontSize: "0.9rem",
                  cursor: "pointer",
                }}
              >
                Borrar filtros
              </span>
            </Header>

            <List>
              {barrios.map((b) => (
                <Item
                  key={b}
                  selected={barrio === b}
                  onClick={() => setBarrio(b)}
                >
                  {b}
                  <RadioCircle selected={barrio === b} />
                </Item>
              ))}
            </List>

            <ApplyButton onClick={handleAplicar}>Aplicar</ApplyButton>
          </Modal>
        </Overlay>
      )}
    </AnimatePresence>
  );
};
