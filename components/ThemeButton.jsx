import React from 'react';
import styled from 'styled-components';
import Button from './Button';

const ThemeButton = styled(Button)`
  background: url(${(props) => props.bgImg}) no-repeat;
  background-position: center;
  background-size: 28px;
`;

export default ThemeButton;
