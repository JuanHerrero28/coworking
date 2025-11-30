"use client";

import styled from "styled-components";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaPlus, FaList } from "react-icons/fa";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { useAtomValue } from "jotai";
import { currentUserAtom } from "@/context/authAtom";
import { BsHandThumbsUp } from "react-icons/bs";
import { useEffect, useState } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = useAtomValue(currentUserAtom);
  useProtectedRoute(true);
  const pathname = usePathname();

  // ✅ Detecta mobile correctamente con useEffect
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) {
    return (
      <MobileWarning>
        🚫 Esta sección no está disponible en dispositivos móviles.
      </MobileWarning>
    );
  }

  // ✅ Función para obtener iniciales del email
  function getInitials(email?: string) {
    if (!email) return "";
    const namePart = email.split("@")[0];
    const parts = namePart.split(/[._-]/);
    if (parts.length === 1) return namePart.slice(0, 6).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }

  const initials = getInitials(user?.email);

  return (
    <DashboardWrapper>
      <Sidebar>
        <Avatar title={user?.email}>
          {user ? (
            <>
              <BsHandThumbsUp style={{ marginRight: 4 }} />
              Hola, {initials}
            </>
          ) : (
            <Spinner/>
          )}
        </Avatar>

        <Nav>
          <StyledLink
            href="/admin/crear-espacio"
            $active={pathname === "/admin/crear-espacio"} // 👈 corregido
          >
            <FaPlus /> Crear espacio
          </StyledLink>

          <StyledLink
            href="/admin/listar-espacio"
            $active={pathname === "/admin/listar-espacio"} // 👈 corregido
          >
            <FaList /> Listar espacios
          </StyledLink>

          <StyledLink
            href="/admin/listar-usuario"
            $active={pathname === "/admin/listar-usuario"} // 👈 corregido
          >
            <FaList /> Listar usuarios
          </StyledLink>
        </Nav>
      </Sidebar>

      <MainContent>{children}</MainContent>
    </DashboardWrapper>
  );
}

/* ========================= ESTILOS ========================= */

const MobileWarning = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f8f8f8;
  font-size: 1rem;
  color: #201f22;
  text-align: center;
  padding: 1rem;
`;

const DashboardWrapper = styled.div`
  display: flex;
  height: 100vh;
  background: #f8f8f8;
`;

const Sidebar = styled.aside`
  width: 250px;
  background: #fff;
  color: #000;
  border: 1px solid #0000001a;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;

  h2 {
    margin-bottom: 2rem;
    text-align: center;
    font-weight: 600;
  }
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

// 👇 Usá un prefijo $ para evitar que styled-components pase la prop al DOM
const StyledLink = styled(Link)<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.8rem;
  color: ${({ $active }) => ($active ? "#3a393e" : "#000")};
  background: ${({ $active }) => ($active ? "#a0c3ff" : "transparent")};
  padding: 0.5rem 0.8rem;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    background: #000;
    color: #dfdfdf;
  }

  svg {
    font-size: 1rem;
  }
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
`;

const Avatar = styled.div`
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 300;
  font-size: 0.9rem;
  margin-bottom: 2rem;
  background-color: #a0c3ff;
  border-radius: 8px;
  padding: 2rem;
`;

const Spinner = styled.div`
  width: 22px;
  height: 22px;
  border: 3px solid #ffffff90;
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;



