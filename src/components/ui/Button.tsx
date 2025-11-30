import styled, { css, keyframes } from "styled-components";
import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  variant?: "primary" | "secondary";
};

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const StyledButton = styled.button<{ $variant: "primary" | "secondary" }>`
  width: 100%;
  padding: 0.8rem 2.5rem;
  border-radius: 8px;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s, opacity 0.2s;
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;

  ${({ $variant }) =>
    $variant === "primary"
      ? css`
          background-color: #000000ff;
          color: #eaeaea;

          &:hover {
            background-color: #eaeaea;
            color: #000000ff;
          }

          &:disabled {
            background-color: #a0c3ff;
            color: #201f22;
            cursor: not-allowed;
            opacity: 0.9;
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
            opacity: 0.9;
          }
        `}
`;

const ButtonSpinner = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid #ffffff55;
  border-top-color: #ffffff;
  animation: ${spin} 0.6s linear infinite;
`;

const SpinnerWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
`;

export default function Button({
  children,
  loading,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <StyledButton
      {...props}
      $variant={variant}
      disabled={loading || props.disabled}
    >
      {loading ? (
        <SpinnerWrapper>
          <ButtonSpinner />
          <span>Cargando...</span>
        </SpinnerWrapper>
      ) : (
        children
      )}
    </StyledButton>
  );
}
