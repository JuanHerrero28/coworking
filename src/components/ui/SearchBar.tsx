"use client";

import { useState } from "react";
import styled, { keyframes } from "styled-components";

const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
`;

const Input = styled.input`
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  background: #fff;
  width: 250px;
  transition: all 0.2s ease-in-out;

  &:focus {
    border-color: #a0c3ff;
    outline: none;
    box-shadow: 0 0 0 2px rgba(160, 195, 255, 0.2);
  }
`;

const Button = styled.button`
  background: #a0c3ff;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 8px 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease-in-out;

  &:hover {
    background: #8db7ff;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SecondaryButton = styled(Button)`
  background: #ccc;
  color: #222;

  &:hover {
    background: #bfbfbf;
  }
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  width: 20px;
  height: 20px;
  border: 3px solid #e0e0e0;
  border-top-color: #a0c3ff;
  border-radius: 50%;
  animation: ${spin} 0.7s linear infinite;
`;

export default function SearchBar({
  onSearch,
  onReset,
  isLoading,
  hasActiveSearch,
}: {
  onSearch: (term: string) => void;
  onReset: () => void;
  isLoading: boolean;
  hasActiveSearch: boolean;
}) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(inputValue);
  };

  const handleReset = () => {
    setInputValue("");
    onReset();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Buscar coworking por nombre..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button type="submit" disabled={isLoading}>
        Buscar
      </Button>
      {hasActiveSearch && (
        <SecondaryButton type="button" onClick={handleReset}>
          Ver todos
        </SecondaryButton>
      )}
      {isLoading && <Spinner />}
    </Form>
  );
}
