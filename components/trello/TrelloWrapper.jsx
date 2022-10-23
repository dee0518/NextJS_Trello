import React from 'react';
import styled from 'styled-components';

const TrelloWrapper = styled.div`
  flex-basis: 300px;
  flex-shrink: 0;
  padding: 15px 10px;
  border-radius: 6px;
  background: ${({ theme }) => theme.trelloListBg};
  box-shadow: ${({ theme }) => theme.trelloShadow};
  transition: background 0.3s ease;
`;

export default TrelloWrapper;
