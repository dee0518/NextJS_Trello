import React from 'react';
import styled from 'styled-components';

const TrelloCard = ({ card: { title, description } }) => {
  return <Card>{title}</Card>;
};

const Card = styled.li`
  width: 100%;
  padding: 10px 15px;
  margin-bottom: 10px;
  border-radius: 5px;
  font-size: 16px;
  line-height: 1.2;
  vertical-align: middle;
  background: ${({ theme }) => theme.color5};
  color: ${({ theme }) => theme.color50};
`;

export default TrelloCard;
