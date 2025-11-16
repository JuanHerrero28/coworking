"use client";

import Link from "next/link";
import styled from "styled-components";
import { useAtomValue } from "jotai";
import { currentUserAtom } from "@/context/authAtom";
import LogoutButton from "@/components/ui/LogoutButton";
import { usePathname } from "next/navigation";

const Nav = styled.nav`
  width: 100%;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
`;

const Logo = styled(Link)`
  font-size: 1.2rem;
  font-weight: bold;
  text-decoration: none;
  color: #201f22;

  &:hover {
    opacity: 0.8;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  a {
    color: #201f22;
    text-decoration: none;
    font-weight: 300;

    &:hover {
      text-decoration: underline;
    }
  }

  @media (max-width: 600px) {
    gap: 0.8rem;
  }
`;

const Avatar = styled.div`
  width: 55px;
  height: 35px;
  border-radius: 50%;
  background-color: #a0c3ff;
  color: #201f22;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.6rem;
`;

export default function Navbar() {
  const user = useAtomValue(currentUserAtom);
  const pathname = usePathname();
  const isLanding = pathname === "/";

  // Función para obtener iniciales del email
  function getInitials(email?: string) {
    if (!email) return "";
    const namePart = email.split("@")[0];
    const parts = namePart.split(/[._-]/);
    if (parts.length === 1) return namePart.slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }

  const initials = getInitials(user?.email);

  return (
    <Nav>
      <Logo href={user ? "/dashboard" : "/"}>Space CO</Logo>

      <NavLinks>
        {user && !isLanding ? (
          <>
            <Avatar title={user.email}>{initials}</Avatar>
            <LogoutButton />
          </>
        ) : (
          <>
            <Link
              href="/login"
              style={{
                border: "1px solid #a0c3ff",
                borderRadius: "8px",
                padding: "0.4rem 1rem",
                color: "#201f22",
                fontWeight: 500,
                fontSize: "0.8rem",
                letterSpacing: "1.2px",
              }}
            >
              Login
            </Link>
            <Link
              href="/signup"
              style={{
                border: "1px solid #a0c3ff",
                borderRadius: "8px",
                padding: "0.4rem 1rem",
                color: "#201f22",
                fontWeight: 500,
                fontSize: "0.8rem",
                letterSpacing: "1.2px",
              }}
            >
              Registro
            </Link>
          </>
        )}
      </NavLinks>
    </Nav>
  );
}
