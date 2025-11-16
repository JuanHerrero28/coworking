"use client";

import { useParams, useRouter } from "next/navigation";
import { useAtomValue } from "jotai";
import { currentUserAtom, authTokenAtom } from "@/context/authAtom";
import { useSpaceById } from "@/hooks/useSpaceById";
import { useCrearReserva } from "@/hooks/useReserva";
import styled from "styled-components";
import Image from "next/image";
import DetailButton from "@/components/ui/DetailButton";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/ui/Footer";

const PRIMARY = "#a0c3ff";

/* ================== LAYOUT PRINCIPAL ================== */
const Container = styled(motion.div)`
  display: flex;
  align-items: center; /* Alinea verticalmente ambos paneles */
  justify-content: center;
  gap: 60px;
  padding: 60px 80px;
  min-height: calc(100vh - 80px);
  box-sizing: border-box;

  @media (max-width: 950px) {
    flex-direction: column;
    padding: 32px 20px;
    gap: 30px;
  }
`;

const LeftPanel = styled.div`
  flex: 1.2;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: flex-start;
`;

const RightPanel = styled.div`
  flex: 1;
  background: #fff;
  border-radius: 16px;
  padding: 32px 36px;
  display: flex;
  flex-direction: column;
  justify-content: center; /* centra verticalmente el contenido */
  gap: 18px;
  height: fit-content;
`;

/* ================== ELEMENTOS ================== */
const BackButton = styled.button`
  background: none;
  border: 2px solid ${PRIMARY};
  color: ${PRIMARY};
  border-radius: 8px;
  padding: 6px 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${PRIMARY};
    color: #fff;
  }
`;

const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: 400;
  border: 2px solid ${PRIMARY};
  padding: 10px 18px;
  border-radius: 10px;
  margin: 0;
  width: 100%;
  box-sizing: border-box;
`;

const ImageWrapper = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 360px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
`;

const Label = styled.p`
  font-weight: 700;
  color: #201f22;
  display: flex;
  align-items: center;
  gap: 5px;
  margin: 0;
`;

const Description = styled.p`
  font-size: 0.95rem;
  color: #444;
  margin: 0;
  line-height: 1.3;
`;

const Divider = styled.hr`
  border: none;
  height: 1px;
  background: #e0e0e0;
  margin: 1px 0;
`;

/* ================== MODAL ================== */
const ModalOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(3px);
`;

const ModalContent = styled(motion.div)`
  background: white;
  padding: 24px;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);

  h3 {
    margin-bottom: 8px;
    color: #201f22;
  }

  label {
    font-weight: 600;
  }

  input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 6px;
  }
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 12px;

  button {
    padding: 8px 16px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
  }

  button:first-child {
    background-color: ${PRIMARY};
    color: white;
    transition: all 0.2s ease;

    &:hover {
      background-color: #8db7ff;
    }
  }

  button:last-child {
    background-color: #ccc;
  }
`;

/* ================== COMPONENTE ================== */
export default function SpaceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);
  const token = useAtomValue(authTokenAtom);
  const currentUser = useAtomValue(currentUserAtom);

  const { data: space, isLoading, error } = useSpaceById(id, token!);
  const { mutateAsync } = useCrearReserva(currentUser?.id ?? 0, token ?? "");

  const [showModal, setShowModal] = useState(false);
  const [fechaReserva, setFechaReserva] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");

  if (!currentUser) return <p>⚠️ Debes iniciar sesión para reservar.</p>;
  if (isLoading) return <p>Cargando espacio...</p>;
  if (error) return <p>Ocurrió un error al cargar el espacio.</p>;
  if (!space) return <p>No se encontró el espacio.</p>;

  const handleReserva = async () => {
    if (!fechaReserva || !horaInicio || !horaFin) {
      toast.error("⚠️ Por favor completa todos los campos");
      return;
    }

    try {
      await mutateAsync({
        espacioId: space.id,
        fechaReserva,
        horaInicio,
        horaFin,
      });

      toast.success("✅ Reserva creada correctamente");
      setShowModal(false);
      router.push("/reservas");
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (err.message.includes("no está disponible")) {
          toast.error("⛔ El espacio no está disponible en ese horario.");
        } else {
          toast.error(err.message || "⛔ No se pudo crear la reserva");
        }
      } else {
        toast.error("⛔ No se pudo crear la reserva");
      }
    }
  };

  return (
    <>
    <Container
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* IZQUIERDA */}
      <LeftPanel>
        <BackButton onClick={() => router.back()}>← Volver</BackButton>
        <Title>{space.nombre}</Title>

        <ImageWrapper
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src={space.imagenUrl}
            alt={space.nombre}
            fill
            style={{ objectFit: "cover" }}
          />
        </ImageWrapper>
      </LeftPanel>

      {/* DERECHA */}
      <RightPanel>
        <Label>🏢 Capacidad:</Label>
        <Description>{space.capacidad}</Description>
        <Divider />

        <Label>📍 Ubicación:</Label>
        <Description>{space.ubicacion}</Description>
        <Divider />

        <Label>📝 Descripción:</Label>
        <Description>{space.descripcion}</Description>

        <div style={{ marginTop: "20px" }}>
          <DetailButton onClick={() => setShowModal(true)}>
            Reservar espacio
          </DetailButton>
        </div>
      </RightPanel>

      {/* MODAL */}
      <AnimatePresence>
        {showModal && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ModalContent
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <h3>📅 Reservar espacio</h3>

              <label>Fecha</label>
              <input
                type="date"
                value={fechaReserva}
                onChange={(e) => setFechaReserva(e.target.value)}
              />

              <label>Hora inicio</label>
              <input
                type="time"
                value={horaInicio}
                onChange={(e) => setHoraInicio(e.target.value)}
              />

              <label>Hora fin</label>
              <input
                type="time"
                value={horaFin}
                onChange={(e) => setHoraFin(e.target.value)}
              />

              <ModalActions>
                <button onClick={handleReserva}>Confirmar</button>
                <button onClick={() => setShowModal(false)}>Cancelar</button>
              </ModalActions>
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </Container>
    <Footer/>
    </>
  );
}
