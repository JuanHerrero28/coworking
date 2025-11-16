"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  crearReserva,
  obtenerReservasPorUsuario,
  actualizarReserva,
  eliminarReserva,
} from "@/services/reservasService";

// 🔹 Obtener reservas por usuario
export function useReservas(usuarioId: number, token: string) {
  return useQuery({
    queryKey: ["reservas", usuarioId],
    queryFn: () => obtenerReservasPorUsuario(usuarioId, token),
  });
}

// 🔹 Crear una reserva
export function useCrearReserva(usuarioId: number, token: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      espacioId: number;
      fechaReserva: string;
      horaInicio: string;
      horaFin: string;
    }) => crearReserva(usuarioId, data, token),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reservas", usuarioId] });
    },
  });
}

// 🔹 Actualizar una reserva existente
export function useActualizarReserva(usuarioId: number, token: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      reservaId,
      data,
    }: {
      reservaId: number;
      data: {
        espacioId: number;
        fechaReserva: string;
        horaInicio: string;
        horaFin: string;
      };
    }) => actualizarReserva(reservaId, data, token),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reservas", usuarioId] });
    },
  });
}

// 🔹 Eliminar una reserva
export function useEliminarReserva(usuarioId: number, token: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reservaId: number) => eliminarReserva(reservaId, token),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reservas", usuarioId] });
    },
  });
}
