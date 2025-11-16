import styled from "styled-components";
import { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 500;
  color: #333;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.6rem 0.8rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 0.95rem;
  outline: none;

  &:focus {
    border-color: #000000ff;
  }
`;

const ErrorMsg = styled.p`
  font-size: 0.75rem;
  color: #e63946;
`;

export default function Input({ label, error, ...props }: InputProps) {
  return (
    <Wrapper>
      {label && <Label>{label}</Label>}
      <StyledInput {...props} />
      {error && <ErrorMsg>{error}</ErrorMsg>}
    </Wrapper>
  );
}
