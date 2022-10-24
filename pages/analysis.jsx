import React, { Fragment } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { trelloListState } from '../store/trelloState';

const Analysis = () => {
  const trelloList = useRecoilValue(trelloListState);

  return (
    <AnalysisWrapper>
      <ChartWrapper>
        {trelloList.length > 0 &&
          trelloList.map((trello) => (
            <Fragment key={trello.id}>
              <CharLabel>{trello.title}</CharLabel>
              <CharBar count={trello.cards.length * 10} />
            </Fragment>
          ))}
      </ChartWrapper>
      <ChartWrapper>vx</ChartWrapper>
    </AnalysisWrapper>
  );
};

const AnalysisWrapper = styled.div`
  display: flex;
  gap: 15px;
  padding: 20px;
`;

const ChartWrapper = styled.div`
  padding: 30px;
  border-radius: 6px;
  background: ${({ theme }) => theme.trelloListBg};
  box-shadow: ${({ theme }) => theme.trelloShadow};
  transition: background 0.3s ease;
`;

const CharLabel = styled.span`
  font-size: 16px;
`;
const CharBar = styled.div`
  width: 50px;
  height: ${(props) => props.count}px;
  border-radius: 4px 4px 0 0;
  background: ${({ theme }) => theme.color70};
`;

export default Analysis;
