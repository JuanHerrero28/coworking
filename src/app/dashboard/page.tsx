"use client";

import { useState } from "react";
import { useAtomValue } from "jotai";
import { currentUserAtom, authTokenAtom } from "@/context/authAtom";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { useCoworkings } from "@/hooks/useCoworkings";
import { FiltroCoworkingModal } from "@/components/ui/FiltroCoworkingModal";
import CoworkingCard from "@/components/ui/CoworkingCard";
import SearchBar from "@/components/ui/SearchBar";
import styled, { keyframes } from "styled-components";
import {
  CoworkingProvider,
  useCoworkingContext,
} from "@/context/CoworkingContext";
import { FaFilter } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { getSpace } from "@/services/makeService";
import { motion, AnimatePresence } from "framer-motion";
import type { Space } from "@/types/Coworking";
import Footer from "@/components/ui/Footer";

// 💅 Estilos base
const Main = styled.main`
  padding: 40px;
`;

const HeaderSection = styled.section`
  text-align: center;
  margin-bottom: 5px;
`;

const FilterHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 2rem 0 1.5rem 0;
`;

const Title = styled.h2`
  font-size: 1rem;
  padding: 12px 20px;
  color: #494949ff;
  margin: 0;
  border: 1px solid #a0c3ff; /* 🩵 borde institucional */
  border-radius: 12px;       /* bordes suaves */
  display: inline-block;     /* se ajusta al contenido */
  
  box-shadow: 0 2px 6px rgba(160, 195, 255, 0.25); /* sutil relieve */
`;

const FilterButton = styled.button`
  background: #a0c3ff;
  color: #201f22;
  border: none;
  border-radius: 8px;
  padding: 0.6rem 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;

  &:hover {
    background: #8db7ff;
  }
`;

const shimmer = keyframes`
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
`;

const ShimmerBox = styled.div`
  height: 230px;
  border-radius: 16px;
  background: linear-gradient(90deg, #a0c3ff33 25%, #a0c3ff66 50%, #a0c3ff33 75%);
  background-size: 800px 200px;
  animation: ${shimmer} 1.1s linear infinite;
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
`;

// 🧠 Componente principal
function DashboardContent() {
  const user = useAtomValue(currentUserAtom);
  const token = useAtomValue(authTokenAtom);
  const { filtros, setFiltros } = useCoworkingContext();
  const [showFilters, setShowFilters] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);

  const {
    data: spaces,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["spaces"],
    enabled: !!token,
    queryFn: () => getSpace(token!),
  });

  const filteredSpaces = useCoworkings(spaces);

  const handleSearch = (term: string) => {
    setFiltros({ ...filtros, search: term });
  };

  const handleReset = () => {
    setFiltros({ ...filtros, search: "" });
  };

  const handleApplyStart = () => {
    setIsFiltering(true);
    setTimeout(() => setIsFiltering(false), 600);
  };

  if (isLoading) return <p>Cargando espacios...</p>;
  if (error) return <p>Hubo un error al cargar los espacios.</p>;

  const displayName =
  user?.nombre
    ? user.nombre.charAt(0).toUpperCase() + user.nombre.slice(1, 6).toLowerCase()
    : user?.email?.slice(0, 5) || "Usuario";

  return (
    <Main>
      <HeaderSection>
        <h1 style={{ fontSize: "1.6rem", color: "#201f22" }}>
          ¡Bienvenido, <span style={{ color: "#a0c3ff" }}>{displayName}</span>!
        </h1>

        <div style={{ marginTop: "20px" }}>
          <SearchBar
            onSearch={handleSearch}
            onReset={handleReset}
            isLoading={false}
            hasActiveSearch={!!filtros.search}
          />
        </div>
      </HeaderSection>

      {/* 🔹 Nuevo contenedor para filtros + título alineados */}
      <FilterHeader>
        <Title>Listado de coworkings</Title>
        <FilterButton onClick={() => setShowFilters(true)}>
          <FaFilter /> Filtros
        </FilterButton>
      </FilterHeader>

      <CardsGrid>
        <AnimatePresence>
          {isFiltering ? (
            <>
              <ShimmerBox />
              <ShimmerBox />
              <ShimmerBox />
            </>
          ) : filteredSpaces.length > 0 ? (
            filteredSpaces.map((space: Space) => (
              <motion.div
                key={space.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
              >
                <CoworkingCard coworking={space} />
              </motion.div>
            ))
          ) : (
            <p style={{ gridColumn: "1 / -1", textAlign: "center" }}>
              ❌ No se encontraron coworkings con esos filtros.
            </p>
          )}
        </AnimatePresence>
      </CardsGrid>

      {showFilters && (
        <FiltroCoworkingModal
          visible={showFilters}
          onClose={() => setShowFilters(false)}
          onApplyStart={handleApplyStart}
        />
      )}
    </Main>
  );
}

// 🚀 Export con Provider
export default function DashboardPage() {
  useProtectedRoute();

  return (
    <CoworkingProvider>
      <DashboardContent />
      <Footer/>
    </CoworkingProvider>
  );
}
