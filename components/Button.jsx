import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  height: 50px;
  padding: 10px 15px;
  border-radius: 5px;
  border: 0;
  font-size: 16px;
  color: ${({ theme }) => theme.textColor};
  background: #f47455;
`;

export default Button;
