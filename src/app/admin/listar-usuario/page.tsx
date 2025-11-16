"use client";

import React from "react";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import AddPromptUser from "@/components/ui/AddPromptUser";

export default function PageEspacios() {
  useProtectedRoute(true);

  return (
    <main>
      <AddPromptUser />
    </main>
  );
}
