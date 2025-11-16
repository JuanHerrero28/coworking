"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { eliminarEspacio, getSpace, updateSpace } from "@/services/makeService";
import { useAtomValue } from "jotai";
import { authTokenAtom } from "@/context/authAtom";
import { toast } from "react-toastify";
import { Space } from "@/types/Coworking";
import styled from "styled-components";
import { SkeletonBox } from "./Skeleton";
import { useState } from "react";
import { MakeForm } from "../forms/MakeForm";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const ButtonAction = styled.button`
  background: #a0c3ff;
  border: none;
  color: rgb(78, 78, 78);
  font-weight: 300;
  font-size: 0.7rem;
  cursor: pointer;
  text-align: left;
  padding: 6px;
  border-radius: 8px;

  &:hover {
    color: rgb(14, 14, 14);
  }
`;

const Container = styled.div`
  background-color: white;
  min-height: 500px;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
`;

const Header = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 2rem;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1;
`;

const Item = styled.li`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #eee;
  padding: 0.75rem 0;
  gap: 0.5rem;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const Circle = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #a0c3ff;
`;

const Description = styled.div`
  font-size: 0.95rem;
  color: #201f22;
`;

const Right = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const DetailsBox = styled(motion.div)`
  margin-top: 0.5rem;
  background: #f9fafb;
  border-radius: 8px;
  padding: 0.8rem 1rem;
  font-size: 0.9rem;
  color: #333;
  line-height: 1.4;
`;

const FormOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

export default function AddPromptSpace() {
  const token = useAtomValue(authTokenAtom);
  const queryClient = useQueryClient();
  const [editingSpace, setEditingSpace] = useState<Space | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const {
    data: spaces,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["space"],
    enabled: !!token,
    queryFn: () => getSpace(token!),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => eliminarEspacio(token!, id),
    onSuccess: (_, idEliminado) => {
      toast.success("✅ Espacio eliminado con éxito");
      queryClient.setQueryData(["space"], (old: Space[] | undefined) =>
        old ? old.filter((item) => item.id !== idEliminado) : []
      );
      queryClient.invalidateQueries({ queryKey: ["space"] });
    },
    onError: () => toast.error("❌ Error al eliminar el espacio"),
  });

  const updateMutation = useMutation({
    mutationFn: (data: Space) =>
      updateSpace(
        data.id,
        {
          nombre: data.nombre,
          descripcion: data.descripcion,
          capacidad: data.capacidad,
          ubicacion: data.ubicacion,
          imagenUrl: data.imagenUrl,
        },
        token!
      ),
    onSuccess: () => {
      toast.success("✅ Espacio actualizado con éxito");
      queryClient.invalidateQueries({ queryKey: ["space"] });
      setEditingSpace(null);
    },
    onError: () => toast.error("❌ Error al actualizar el espacio"),
  });

  if (isLoading) {
    return (
      <Container>
        <Header>Tus espacios</Header>
        <List>
          {[...Array(5)].map((_, i) => (
            <Item key={i}>
              <TopRow>
                <Left>
                  <SkeletonBox
                    width="20px"
                    height="20px"
                    style={{ borderRadius: "50%" }}
                  />
                  <SkeletonBox width="140px" height="20px" />
                </Left>
                <Right>
                  <SkeletonBox width="60px" height="20px" />
                </Right>
              </TopRow>
            </Item>
          ))}
        </List>
      </Container>
    );
  }

  if (error) return <p>Error al cargar espacios</p>;

  return (
    <Container>
      <Header>Mis Espacios</Header>
      <List>
        {Array.isArray(spaces) && spaces.length > 0 ? (
          spaces.map((item: Space) => (
            <Item key={item.id}>
              <TopRow>
                <Left>
                  <Circle />
                  <Description>{item.nombre}</Description>
                </Left>
                <Right>
                  <ButtonAction
                    onClick={() =>
                      setExpandedId(expandedId === item.id ? null : item.id)
                    }
                  >
                    {expandedId === item.id ? "Ocultar" : "Ver detalles"}
                  </ButtonAction>
                  <ButtonAction onClick={() => setEditingSpace(item)}>
                    Editar
                  </ButtonAction>
                  <ButtonAction onClick={() => deleteMutation.mutate(item.id)}>
                    Eliminar
                  </ButtonAction>
                </Right>
              </TopRow>

              <AnimatePresence>
                {expandedId === item.id && (
                  <DetailsBox
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p>
                      <strong>Descripción:</strong> {item.descripcion}
                    </p>
                    <p>
                      <strong>Capacidad:</strong> {item.capacidad}
                    </p>
                    <p>
                      <strong>Ubicación:</strong> {item.ubicacion}
                    </p>
                    {item.imagenUrl && (
                      <div style={{ marginTop: "0.5rem" }}>
                        <strong>Imagen:</strong>
                        <Image
                          src={item.imagenUrl}
                          alt={item.nombre}
                          width={300}
                          height={200}
                          style={{
                            width: "100%",
                            height: "auto",
                            borderRadius: "8px",
                            marginTop: "0.5rem",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    )}
                  </DetailsBox>
                )}
              </AnimatePresence>
            </Item>
          ))
        ) : (
          <p>No tienes espacios asociados</p>
        )}
      </List>

      <AnimatePresence>
        {editingSpace && (
          <FormOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setEditingSpace(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 30 }}
              transition={{ duration: 0.35 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: "#fff",
                borderRadius: "12px",
                padding: "2rem",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
                minWidth: "400px",
                maxWidth: "90%",
              }}
            >
              <MakeForm
                isEditing
                initialData={{
                  nombre: editingSpace.nombre,
                  descripcion: editingSpace.descripcion,
                  capacidad: editingSpace.capacidad,
                  ubicacion: editingSpace.ubicacion,
                  imagenUrl: editingSpace.imagenUrl,
                }}
                onSubmit={async (data) => {
                  return new Promise<void>((resolve, reject) => {
                    updateMutation.mutate(
                      { id: editingSpace.id, ...data },
                      {
                        onSuccess: () => resolve(),
                        onError: () => reject(),
                      }
                    );
                  });
                }}
              />
              <ButtonAction
                onClick={() => setEditingSpace(null)}
                style={{
                  display: "block",
                  marginTop: "0.5rem",
                  textAlign: "right",
                }}
              >
                Cerrar
              </ButtonAction>
            </motion.div>
          </FormOverlay>
        )}
      </AnimatePresence>
    </Container>
  );
}
