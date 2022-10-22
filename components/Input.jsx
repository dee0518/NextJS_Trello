import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  width: 100%;
  height: 45px;
  border: 0;
  padding: 10px 13px;
  border-radius: 4px;
  background: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.textColor};
  font-size: 16px;

  &:read-only {
    background: transparent;
    color: ${({ theme }) => theme.trelloListTitle};
  }
`;

export default Input;
