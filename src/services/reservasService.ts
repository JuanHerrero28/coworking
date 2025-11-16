const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/reservas`;

// ✅ Crear reserva
export async function crearReserva(
  usuarioId: number,
  data: {
    espacioId: number;
    fechaReserva: string;
    horaInicio: string;
    horaFin: string;
  },
  token: string
) {
  const res = await fetch(`${API_URL}/${usuarioId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Error al crear la reserva");
  }

  return res.json();
}

// ✅ Obtener reservas por usuario
export async function obtenerReservasPorUsuario(usuarioId: number, token: string) {
  const res = await fetch(`${API_URL}/usuario/${usuarioId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Error al obtener reservas");
  return res.json();
}

// ✅ Actualizar una reserva existente
export async function actualizarReserva(
  reservaId: number,
  data: {
    espacioId: number;
    fechaReserva: string;
    horaInicio: string;
    horaFin: string;
  },
  token: string
) {
  const res = await fetch(`${API_URL}/${reservaId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Error al actualizar la reserva");
  }

  return res.json();
}

// ✅ Eliminar una reserva
export async function eliminarReserva(reservaId: number, token: string) {
  const res = await fetch(`${API_URL}/${reservaId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    const errorData = await res.text();
    throw new Error(errorData || "Error al eliminar la reserva");
  }

  return true;
}
