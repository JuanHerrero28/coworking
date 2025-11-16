"use client";

import { ReactNode } from "react";
import { useAuthInit } from "@/hooks/useAuthInit";

export default function AuthProvider({ children }: { children: ReactNode }) {
  useAuthInit(); // Inicializa el usuario desde localStorage
  return <>{children}</>;
}

