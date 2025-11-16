// src/components/Skeleton.tsx
import styled, { keyframes } from "styled-components";

const pulse = keyframes`
  0% { background-color: #f0f0f0; }
  50% { background-color:rgb(224, 224, 224); }
  100% { background-color: #f0f0f0; }
`;

export const SkeletonBox = styled.div<{ width?: string; height?: string }>`
  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || "16px"};
  border-radius: 6px;
  animation: ${pulse} 1.5s infinite ease-in-out;
`;
