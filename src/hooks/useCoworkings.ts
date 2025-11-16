// hooks/useCoworkings.ts
"use client";

import type { Space } from "@/types/Coworking";
import { useCoworkingContext } from "@/context/CoworkingContext";

export function useCoworkings(spaces: Space[] | undefined) {
  const { filtros } = useCoworkingContext();

  if (!spaces) return [];

  return spaces.filter((space) => {
    const matchBarrio =
      filtros.barrio === "todos" ||
      space.ubicacion.toLowerCase().includes(filtros.barrio.toLowerCase());

    const matchTipo =
      filtros.tipoEspacio === "todos" ||
      space.descripcion.toLowerCase().includes(filtros.tipoEspacio.replace("_", " "));

    const matchSearch =
      !filtros.search ||
      space.nombre.toLowerCase().includes(filtros.search.toLowerCase()) ||
      space.ubicacion.toLowerCase().includes(filtros.search.toLowerCase());

    return matchBarrio && matchTipo && matchSearch;
  });
}
