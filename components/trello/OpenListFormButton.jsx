import React from 'react';
import styled from 'styled-components';
import Button from '../Button';

const OpenListFormButton = styled(Button)`
  width: 300px;
  height: 40px;
  color: ${({ theme }) => theme.color0};
  background-color: ${({ theme }) => theme.color80};
  box-shadow: ${({ theme }) => theme.trelloShadow};
  text-align: left;

  &:hover {
    background-color: ${({ theme }) => theme.color60};
  }
`;

export default OpenListFormButton;
