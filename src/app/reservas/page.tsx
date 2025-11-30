"use client";

import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { reservaAtom } from "@/context/reservaAtom";
import {
  useReservas,
  useActualizarReserva,
  useEliminarReserva,
} from "@/hooks/useReserva";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import type { EventApi } from "@fullcalendar/core";
import { AnimatePresence, motion } from "framer-motion";
import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/navigation";
import Footer from "@/components/ui/Footer";
import { toast } from "react-toastify";

const PRIMARY_COLOR = "#a0c3ff";
const TEXT_DARK = "#201F22";
const BACKGROUND = "#f9fafc";

// ✅ Tipo de reserva
interface Reserva {
  id: number;
  espacioId: number;
  espacio?: { nombre: string };
  fechaReserva: string;
  horaInicio: string;
  horaFin: string;
}

// 🎨 Estilos globales FullCalendar
const CalendarStyle = createGlobalStyle`
  .fc {
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
    padding: 1rem;
  }

  .fc .fc-button-primary {
    background-color: ${PRIMARY_COLOR};
    border: none;
    color: #fff;
    font-weight: 600;
    border-radius: 6px;
    text-transform: capitalize;
  }

  .fc .fc-button-primary:hover {
    background-color: #8db7ff;
  }

  .fc .fc-toolbar-title {
    color: ${TEXT_DARK};
    font-size: 1.4rem;
    font-weight: 600;
  }

  .fc-daygrid-event {
    background-color: ${PRIMARY_COLOR};
    border: none;
    border-radius: 6px;
    color: #201f22;
    padding: 2px 4px;
    font-weight: 500;
  }
`;

const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: ${BACKGROUND};
  padding: 2rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const BackButton = styled(motion.button)`
  background-color: ${PRIMARY_COLOR};
  color: #fff;
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  width: fit-content;
  transition: all 0.25s ease;
  &:hover {
    background-color: #8db7ff;
    transform: translateY(-2px);
  }
`;

const Title = styled.h1`
  font-size: 1.6rem;
  color: ${TEXT_DARK};
  font-weight: 400;
  margin: 0;
  border-left: 6px solid ${PRIMARY_COLOR};
  padding-left: 12px;
`;

const CalendarContainer = styled(motion.div)`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalContent = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  padding: 24px 30px;
  border-radius: 16px;
  width: 90%;
  max-width: 420px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: left;

  h2 {
    font-size: 1.3rem;
    margin-bottom: 10px;
    color: ${TEXT_DARK};
    text-align: center;
  }

  label {
    font-weight: 600;
    margin-top: 8px;
  }

  input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 6px;
  }

  button {
    margin-top: 12px;
    align-self: flex-end;
    background: ${PRIMARY_COLOR};
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 8px 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    &:hover {
      background: #8db7ff;
    }
  }
`;

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const LoaderWrapper = styled.div`
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  color: ${TEXT_DARK};
  text-align: center;
`;

const BigSpinner = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 5px solid ${PRIMARY_COLOR}55;
  border-top-color: ${PRIMARY_COLOR};
  animation: ${spin} 0.7s linear infinite;
`;


export default function ReservasPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [usuarioId, setUsuarioId] = useState<number | null>(null);
  const [eventos, setEventos] = useAtom(reservaAtom);
  const [selectedEvent, setSelectedEvent] = useState<EventApi | null>(null);
  const [fecha, setFecha] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");

  // 🟦 Leer token y user ID
  useEffect(() => {
    const storedToken = localStorage.getItem("auth_token");
    const storedUserId = localStorage.getItem("user_id");
    if (storedToken && storedUserId) {
      setToken(storedToken);
      setUsuarioId(Number(storedUserId));
    }
  }, []);

  const { data, isLoading } = useReservas(usuarioId ?? 0, token ?? "");
  const { mutateAsync: actualizarReserva } = useActualizarReserva(
    usuarioId ?? 0,
    token ?? ""
  );
  const { mutateAsync: eliminarReserva } = useEliminarReserva(
    usuarioId ?? 0,
    token ?? ""
  );

  // 🧩 Mapear reservas al formato del calendario
  useEffect(() => {
    if (data) {
      const eventosFormateados = data.map((r: Reserva) => ({
        id: r.id.toString(),
        title: r.espacio?.nombre || `Espacio ${r.espacioId}`,
        start: `${r.fechaReserva}T${r.horaInicio}`,
        end: `${r.fechaReserva}T${r.horaFin}`,
        extendedProps: {
          reservaId: r.id,
          espacioId: r.espacioId, // 👈 Importante
          espacio: r.espacio?.nombre || `#${r.espacioId}`,
          fecha: r.fechaReserva,
          horaInicio: r.horaInicio,
          horaFin: r.horaFin,
        },
      }));
      setEventos(eventosFormateados);
    }
  }, [data, setEventos]);

  const formatHora = (h: string) => (h?.length === 5 ? `${h}:00` : h);

  const handleEdit = async () => {
    if (!selectedEvent) return;
    try {
      const reservaId = Number(selectedEvent.extendedProps.reservaId);
      const espacioId = Number(selectedEvent.extendedProps.espacioId);
      const payload = {
        espacioId,
        fechaReserva: (fecha || selectedEvent.extendedProps.fecha).slice(0, 10),
        horaInicio: formatHora(
          horaInicio || selectedEvent.extendedProps.horaInicio
        ),
        horaFin: formatHora(horaFin || selectedEvent.extendedProps.horaFin),
      };
      await actualizarReserva({ reservaId, data: payload });
      toast.success("✅ Reserva actualizada correctamente");
      setSelectedEvent(null);
    } catch (err) {
      console.error(err);
      toast.error("Error al actualizar la reserva");
    }
  };

  const handleDelete = async () => {
    if (!selectedEvent) return;
    try {
      const reservaId = Number(selectedEvent.extendedProps.reservaId);
      await eliminarReserva(reservaId);
      toast.success("🗑️ Reserva eliminada correctamente");
      setSelectedEvent(null);
    } catch (err) {
      toast.error("Error al eliminar la reserva");
    }
  };

  if (!token || !usuarioId) {
  return (
    <PageWrapper>
      <CalendarStyle />
      <LoaderWrapper>
        <BigSpinner />
        <p>Cargando usuario...</p>
      </LoaderWrapper>
      <Footer />
    </PageWrapper>
  );
}

if (isLoading) {
  return (
    <PageWrapper>
      <CalendarStyle />
      <LoaderWrapper>
        <BigSpinner />
        <p>Cargando reservas...</p>
      </LoaderWrapper>
      <Footer />
    </PageWrapper>
  );
}

  return (
    <>
      <PageWrapper>
        <CalendarStyle />
        <BackButton
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          onClick={() => router.push("/dashboard")}
        >
          <IoArrowBack size={18} /> Atrás
        </BackButton>

        <Title>Mis Reservas</Title>

        <CalendarContainer
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={eventos}
            height="auto"
            eventClick={(info) => setSelectedEvent(info.event)}
          />
        </CalendarContainer>

        {/* 🪟 Modal Detalle / Edición */}
        <AnimatePresence>
          {selectedEvent && (
            <ModalOverlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ModalContent
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
              >
                <h2>📄 Detalle de Reserva</h2>
                <p>
                  <strong>Espacio:</strong>{" "}
                  {selectedEvent.extendedProps.espacio}
                </p>

                <label>📅 Fecha</label>
                <input
                  type="date"
                  defaultValue={selectedEvent.extendedProps.fecha}
                  onChange={(e) => setFecha(e.target.value)}
                />

                <label>🕐 Hora inicio</label>
                <input
                  type="time"
                  defaultValue={selectedEvent.extendedProps.horaInicio.slice(
                    0,
                    5
                  )}
                  onChange={(e) => setHoraInicio(e.target.value)}
                />

                <label>🕓 Hora fin</label>
                <input
                  type="time"
                  defaultValue={selectedEvent.extendedProps.horaFin.slice(0, 5)}
                  onChange={(e) => setHoraFin(e.target.value)}
                />

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "1rem",
                  }}
                >
                  <button
                    style={{ background: "#ff4d4d" }}
                    onClick={handleDelete}
                  >
                    Eliminar
                  </button>
                  <button onClick={handleEdit}>Guardar cambios</button>
                <button
                  style={{ alignSelf: "center", marginTop: "1rem" }}
                  onClick={() => setSelectedEvent(null)}
                >
                  Cerrar
                </button>
                </div>

              </ModalContent>
            </ModalOverlay>
          )}
        </AnimatePresence>
      </PageWrapper>
      <Footer />
    </>
  );
}
