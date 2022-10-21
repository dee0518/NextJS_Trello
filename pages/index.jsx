import React, { useState } from 'react';
import styled from 'styled-components';
import TrelloList from '../components/trello/TrelloList';

const Home = (props) => {
  const [trelloList, setTrelloList] = useState([]);
  const [edited, setEdited] = useState([-1, -1]);
  const [isShowAddListForm, setIsShowAddListForm] = useState(true);

  return (
    <HomeWrapper>
      {trelloList.length > 0 &&
        trelloList.map(({ id }) => <TrelloList key={id} edited={edited} />)}
      <TrelloList edited={[-2, -2]} />
    </HomeWrapper>
  );
};

const HomeWrapper = styled.div`
  display: flex;
  gap: 10px;
  padding: 20px;
`;

export default Home;
