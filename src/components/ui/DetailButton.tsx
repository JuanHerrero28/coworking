import styled from "styled-components";

const Button = styled.button`
  margin-top: 8px;
  background-color: #a0c3ff;
  color: #201f22;
  border: none;
  border-radius: 8px;
  padding: 8px 12px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: #b2cdfaff;
  }
`;

interface DetailButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
}

export default function DetailButton({ onClick, children }: DetailButtonProps) {
  return <Button onClick={onClick}>{children}</Button>;
}
