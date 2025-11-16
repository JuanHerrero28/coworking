// src/hooks/useMakeSpace.ts
"use client";

import { useMutation } from "@tanstack/react-query";
import { makeService } from "@/services/makeService";
import { useAtomValue } from "jotai";
import { authTokenAtom } from "@/context/authAtom";

export function useMakeSpace() {
  const token = useAtomValue(authTokenAtom);

  return useMutation({
    mutationFn: async (data: {
      nombre: string;
      descripcion: string;
      capacidad: number;
      ubicacion: string;
      imagenUrl: string;
    }) => {
      if (!token) throw new Error("No hay token de autenticación");
      return makeService(data, token);
    },
  });
}

