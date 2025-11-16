"use client";

import React from "react";
import AddPromptSpace from "@/components/ui/AddPromptSpace"; // tu componente
import { useProtectedRoute } from "@/hooks/useProtectedRoute";

export default function PageEspacios() {
  useProtectedRoute(true);

  return (
    <main>
      <AddPromptSpace />
    </main>
  );
}
