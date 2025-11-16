"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import styled from "styled-components";

const StyledButton = styled.button`
  width: 100%;
  padding: 0.7rem 1.5rem;
  border-radius: 8px;
  font-size: 0.7rem;
  cursor: pointer;
  border: none;
  text-decoration: none;

  &:hover {
    opacity: 0.8;
  }
`;

export default function LogoutButton() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      toast.info("Sesión cerrada 👋");
      router.push("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Error al cerrar sesión");
      }
    }
  };

  return (
    <StyledButton
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium transition-colors"
    >
      Cerrar sesión
    </StyledButton>
  );
}

