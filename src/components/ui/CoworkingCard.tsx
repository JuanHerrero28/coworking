import styled from "styled-components";
import Image from "next/image";
import { Space } from "@/types/Coworking";
import DetailButton from "./DetailButton";
import { useRouter } from "next/navigation";

const Card = styled.div`
  background-color: #fff;
  border-radius: 16px;
  padding: 16px;
  width: 280px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  border-radius: 12px;
  overflow: hidden;
`;

const StyledImage = styled(Image)`
  object-fit: cover;
  border-radius: 12px;
  filter: grayscale(20%) brightness(2) contrast(0.6) saturate(1.3) hue-rotate(180deg);
`;

const ColorOverlay = styled.div`
  position: absolute;
  inset: 0;
  background-color: #a0c3ff; 
  mix-blend-mode: color; 
  pointer-events: none;
`;

const Name = styled.h3`
  font-size: 0.8rem;
  font-weight: 600;
  color: #222;
  margin-top: 12px;
`;

const Barrio = styled.p`
  font-size: 0.7rem;
  color: #666;
`;

export default function CoworkingCard({ coworking }: { coworking: Space }) {
  const router = useRouter();
  return (
    <Card>
      <ImageWrapper>
        <StyledImage
          src={coworking.imagenUrl}
          alt={coworking.nombre}
          fill
        />
        <ColorOverlay />
      </ImageWrapper>
      <Name>{coworking.nombre}</Name>
      <Barrio>{coworking.ubicacion}</Barrio>
       <DetailButton onClick={() => router.push(`/dashboard/spaces/${coworking.id}`)}>
        Ver detalle
      </DetailButton>
    </Card>
  );
}
