// src/hooks/useUpdateSpace.ts
"use client";

import { useMutation } from "@tanstack/react-query";
import { updateSpace } from "@/services/makeService";
import { useAtomValue } from "jotai";
import { authTokenAtom } from "@/context/authAtom";

export function useUpdateSpace() {
  const token = useAtomValue(authTokenAtom);

  return useMutation({
    mutationFn: async ({
      id,
      nombre,
      descripcion,
      capacidad,
      ubicacion,
      imagenUrl,
    }: {
      id: number;
      nombre: string;
      descripcion: string;
      capacidad: number;
      ubicacion: string;
      imagenUrl: string;
    }) => {
      if (!token) throw new Error("No hay token de autenticación");
      return updateSpace(
        id,
        { nombre, descripcion, capacidad, ubicacion, imagenUrl },
        token
      );
    },
  });
}
