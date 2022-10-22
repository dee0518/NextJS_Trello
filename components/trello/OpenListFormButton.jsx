import React from 'react';
import styled from 'styled-components';

const OpenListFormButton = styled.button`
  position: relative;
  width: 100%;
  height: 40px;
  border: 0;
  padding: 10px 15px 10px 35px;
  color: ${({ theme }) => theme.textColor};
  background-color: ${({ theme }) => theme.bgColor};
  font-size: 16px;
  text-align: left;

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 15px;
    top: 50%;
    display: block;
    width: 8px;
    height: 1px;
    background: #000;
  }

  &::after {
    transform: rotate(90deg);
  }
`;

export default OpenListFormButton;
