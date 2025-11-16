import styled, { css } from "styled-components";
import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  variant?: "primary" | "secondary";
};

const StyledButton = styled.button<{ $variant: "primary" | "secondary" }>`
  width: 100%;
  padding: 0.8rem 2.5rem;
  border-radius: 8px;
  fontWeight: "500";
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  border: none;

  ${({ $variant }) =>
    $variant === "primary"
      ? css`
          background-color: #000000ff;
          color: #EAEAEA;

          &:hover {
            background-color: #EAEAEA;
            color: #000000ff;
          }

          &:disabled {
            background-color: #a0c3ff;
            cursor: not-allowed;
          }
        `
      : css`
          background-color: #f0f0f0;
          color: #333;

          &:hover {
            background-color: #e0e0e0;
          }

          &:disabled {
            background-color: #ddd;
            cursor: not-allowed;
          }
        `}
`;

export default function Button({
  children,
  loading,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <StyledButton {...props} $variant={variant} disabled={loading || props.disabled}>
      {loading ? "Cargando..." : children}
    </StyledButton>
  );
}
