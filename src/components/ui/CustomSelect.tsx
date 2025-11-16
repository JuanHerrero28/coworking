'use client';
import { useState } from 'react';
import styled from 'styled-components';
import { FiChevronDown } from 'react-icons/fi';

type Option = { value: string; label: string };

type CustomSelectProps = {
  name: string;
  label: string;
  options: Option[];
  required?: boolean;
};

export default function CustomSelect({
  name,
  label,
  options,
  required,
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Option>(options[0]);

  const handleSelect = (option: Option) => {
    setSelected(option);
    setOpen(false);
  };

  return (
    <SelectWrapper>
      <Label>{label}</Label>

      <HiddenInput name={name} value={selected.value} required={required} readOnly />

      <SelectButton type="button" onClick={() => setOpen(!open)} $open={open}>
        {selected.label}
        <FiChevronDown size={18} />
      </SelectButton>

      {open && (
        <Dropdown>
          {options.map((option) => (
            <OptionItem
              key={option.value}
              onClick={() => handleSelect(option)}
              $isPlaceholder={option.value === ''}
              $isSelected={option.value === selected.value}
            >
              {option.label}
            </OptionItem>
          ))}
        </Dropdown>
      )}
    </SelectWrapper>
  );
}

/* 🎨 Estilos */
const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
  font-family: inherit;
`;

const Label = styled.label`
  display: block;
  font-weight: 500;
  font-size: 14px;
  color: #201f22;
  margin-bottom: 0.3rem;
`;

const HiddenInput = styled.input`
  display: none;
`;

const SelectButton = styled.button<{ $open: boolean }>`
  width: 100%;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  background-color: #fff;
  color: #201f22;
  font-size: 14px;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: border 0.2s ease, box-shadow 0.2s ease;

  svg {
    transition: transform 0.3s ease;
    transform: ${({ $open }) => ($open ? 'rotate(180deg)' : 'rotate(0deg)')};
  }

  &:hover {
    border-color: #201f22;
  }
`;

const Dropdown = styled.ul`
  position: absolute;
  top: calc(100% + 0.3rem);
  left: 0;
  width: 100%;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  list-style: none;
  margin: 0;
  padding: 0.3rem 0;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  z-index: 10;
  max-height: 180px;
  overflow-y: auto;
`;

const OptionItem = styled.li<{ $isPlaceholder: boolean; $isSelected: boolean }>`
  padding: 0.6rem 1rem;
  font-size: 14px;
  color: ${({ $isPlaceholder }) => ($isPlaceholder ? '#888' : '#201f22')};
  background-color: ${({ $isSelected }) => ($isSelected ? '#f0f0f0' : 'transparent')};
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    color: #888;
  }
`;
