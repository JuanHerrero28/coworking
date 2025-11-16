"use client";

import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { authTokenAtom } from "@/context/authAtom";
import { getSpaceById } from "@/services/makeService";
import styled from "styled-components";

interface Space {
  id: number;
  nombre: string;
  descripcion: string;
  capacidad: number;
  ubicacion: string;
  imagenUrl: string;
  disponible: boolean;
}

interface Props {
  id: number;
}

export default function SpaceDetailPageContent({ id }: Props) {
  const token = useAtomValue(authTokenAtom);
  const [space, setSpace] = useState<Space | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token || !id) {
      setError("ID o token inválido");
      setLoading(false);
      return;
    }

    const fetchSpace = async () => {
      try {
        const data = await getSpaceById(id, token);
        setSpace(data);
      } catch (err) {
        console.error(err);
        setError("No se encontró el espacio");
      } finally {
        setLoading(false);
      }
    };

    fetchSpace();
  }, [id, token]);

  if (loading) return <Message>Cargando espacio...</Message>;
  if (error) return <Message>{error}</Message>;

  return (
    <Container>
      <Title>{space?.nombre}</Title>
      <Image src={space?.imagenUrl} alt={space?.nombre} />
      <Description>{space?.descripcion}</Description>
      <Info>
        <span>Capacidad: {space?.capacidad} personas</span>
        <span>Ubicación: {space?.ubicacion}</span>
        <span>{space?.disponible ? "Disponible" : "No disponible"}</span>
      </Info>
    </Container>
  );
}

const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
`;

const Image = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 12px;
`;

const Description = styled.p`
  font-size: 1rem;
  line-height: 1.5;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-weight: 500;
`;

const Message = styled.p`
  text-align: center;
  margin-top: 4rem;
  font-size: 1.2rem;
  color: red;
`;
