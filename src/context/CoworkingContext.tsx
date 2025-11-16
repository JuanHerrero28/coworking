// context/CoworkingContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type FiltrosCoworking = {
  search: string;
  barrio: string;
  precioMax: number | null;
  tipoEspacio: string; // "todos", "desk", "private_office", etc.
};

type CoworkingContextType = {
  filtros: FiltrosCoworking;
  setFiltros: (f: FiltrosCoworking) => void;
  pagina: number;
  setPagina: (p: number) => void;
};

const CoworkingContext = createContext<CoworkingContextType | undefined>(undefined);

export const CoworkingProvider = ({ children }: { children: ReactNode }) => {
  const [filtros, setFiltros] = useState<FiltrosCoworking>({
    search: "",
    barrio: "todos",
    precioMax: null,
    tipoEspacio: "todos",
  });

  const [pagina, setPagina] = useState(1);

  return (
    <CoworkingContext.Provider value={{ filtros, setFiltros, pagina, setPagina }}>
      {children}
    </CoworkingContext.Provider>
  );
};

export const useCoworkingContext = () => {
  const context = useContext(CoworkingContext);
  if (!context) throw new Error("useCoworkingContext debe usarse dentro de un CoworkingProvider");
  return context;
};
