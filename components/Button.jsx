import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  height: 40px;
  padding: 10px 20px;
  border-radius: 4px;
  border: 0;
  font-size: 14px;
  color: ${({ theme }) => theme.color0};
  background: ${({ theme }) => theme.color60};
  transition: background 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.color50};
  }
`;

export default Button;
