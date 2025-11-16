"use client";

import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { useEffect } from "react";

export default function AdminPage() {
  useProtectedRoute(true); // true si es adminOnly

  useEffect(() => {
    // Evitar cache en el navegador y recargar si se vuelve a la página
    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        window.location.reload();
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <div>
      <h1>Panel de administración</h1>
    </div>
  );
}
