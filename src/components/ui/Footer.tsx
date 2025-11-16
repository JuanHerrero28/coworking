"use client";

import styled from "styled-components";
import Link from "next/link";
import { FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";

const PRIMARY = "#a0c3ff";
const TEXT_COLOR = "#201F22";
const SUBTEXT = "#555";
const BG = "#ffffff";

const FooterContainer = styled.footer`
  width: 100%;
  background-color: ${BG};
  color: ${TEXT_COLOR};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  padding: 2rem 1rem;
  border-top: 2px solid ${PRIMARY};
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.06);
`;

const TopSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  max-width: 1200px;

  @media (max-width: 700px) {
    flex-direction: column;
    gap: 14px;
  }
`;

const Logo = styled.h3`
  font-weight: 700;
  font-size: 1.3rem;
  color: ${TEXT_COLOR};
  letter-spacing: 0.5px;
  margin: 0;
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 1.5rem;

  @media (max-width: 700px) {
    gap: 1rem;
  }

  a {
    color: ${SUBTEXT};
    font-size: 0.95rem;
    font-weight: 500;
    text-decoration: none;
    transition: 0.2s ease;

    &:hover {
      color: ${PRIMARY};
      transform: translateY(-2px);
    }
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;

  svg {
    color: ${PRIMARY};
    font-size: 1.2rem;
    cursor: pointer;
    transition: all 0.25s ease;

    &:hover {
      transform: scale(1.15);
      opacity: 0.8;
    }
  }
`;

const BottomSection = styled.div`
  width: 90%;
  max-width: 1200px;
  text-align: center;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  margin-top: 10px;
  padding-top: 10px;

  p {
    font-size: 0.85rem;
    color: ${SUBTEXT};
    letter-spacing: 0.3px;
  }
`;

export default function Footer() {
  return (
    <FooterContainer>
      <TopSection>
        <Logo>Space CO</Logo>

        <NavLinks>
          <Link href="/">Inicio</Link>
          <Link href="/coworkings">Coworkings</Link>
          <Link href="/reservas">Reservas</Link>
          <Link href="/contacto">Contacto</Link>
        </NavLinks>

        <SocialIcons>
          <FaLinkedin />
          <FaInstagram />
          <FaGithub />
        </SocialIcons>
      </TopSection>

      <BottomSection>
        <p>© {new Date().getFullYear()} Space CO — Todos los derechos reservados.</p>
      </BottomSection>
    </FooterContainer>
  );
}
