// src/hooks/useUpdateSpace.ts
"use client";

import { useMutation } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { authTokenAtom } from "@/context/authAtom";
import { updateUser } from "@/services/makeUser";

export function useUpdateUser() {
  const token = useAtomValue(authTokenAtom);

  return useMutation({
    mutationFn: async ({
      id,
      nombre,
      email,
      password,
      rol,
    }: {
      id: number;
      nombre: string;
      email: string;
      password: string;
      rol: string;
    }) => {
      if (!token) throw new Error("No hay token de autenticación");
      return updateUser(
        id,
        { nombre, email, password, rol },
        token
      );
    },
  });
}
