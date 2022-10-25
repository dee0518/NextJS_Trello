import React, { Fragment } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { trelloListState } from '../store/trelloState';

const Analysis = () => {
  const trelloList = useRecoilValue(trelloListState);

  return (
    <AnalysisWrapper>
      <ChartWrapper>
        <ChartBg>
          <ChartBgLine />
          <ChartBgLine />
          <ChartBgLine />
          <ChartBgLine />
          <ChartBgLine />
          <ChartBgLine />
          <ChartBgLine />
          <ChartBgLine />
        </ChartBg>
        {trelloList.length > 0 &&
          trelloList.map((trello) => (
            <BarWrapper key={trello.id}>
              <BarLabel>{trello.title}</BarLabel>
              <Bar count={trello.cards.length * 50} />
            </BarWrapper>
          ))}
      </ChartWrapper>
    </AnalysisWrapper>
  );
};

const AnalysisWrapper = styled.div`
  display: flex;
  gap: 15px;
  height: calc(100vh - 60px);
  padding: 20px;
`;

const ChartWrapper = styled.div`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  gap: 25px;
  align-items: end;
  min-width: 300px;
  padding: 50px 60px 30px 100px;
  border-radius: 6px;
  background: ${({ theme }) => theme.trelloListBg};
  box-shadow: ${({ theme }) => theme.trelloShadow};
  transition: background 0.3s ease;
`;

const ChartBg = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  padding: 50px 30px 59px 60px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
`;

const ChartBgLine = styled.div`
  width: 100%;
  height: 1px;
  background: ${({ theme }) => theme.color30};
`;

const BarWrapper = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-flow: column-reverse nowrap;
  align-items: center;
  gap: 10px;
`;

const BarLabel = styled.span`
  font-size: 16px;
  color: ${({ theme }) => theme.color100};
`;
const Bar = styled.div`
  width: 50px;
  height: ${(props) => props.count}px;
  border-radius: 4px 4px 0 0;
  background: ${({ theme }) => theme.color60};
`;

export default Analysis;
