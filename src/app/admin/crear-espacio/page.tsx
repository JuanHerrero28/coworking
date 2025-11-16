"use client";

import React from "react";
import { MakeForm } from "@/components/forms/MakeForm";
import { useMakeSpace } from "@/hooks/useMakeSpace";
import { toast } from "react-toastify";

export default function CrearEspacioPage() {
  const { mutateAsync, isPending } = useMakeSpace();

  const handleSubmit = async (data: {
    nombre: string;
    descripcion: string;
    capacidad: number;
    ubicacion: string;
    imagenUrl: string;
  }) => {
    try {
      await mutateAsync(data);
      console.log(data);
      toast.success("✅ Espacio creado correctamente");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
        console.error("Error al crear el espacio:", error.message);
      } else {
        toast.error("❌ Error al crear el espacio");
        console.error("Error desconocido:", error);
      }
    }
  };

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <MakeForm onSubmit={handleSubmit} />
    </div>
  );
}

