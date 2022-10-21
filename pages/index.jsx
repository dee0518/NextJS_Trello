import React, { useState } from 'react';
import styled from 'styled-components';
import TrelloList from '../components/trello/TrelloList';

const Home = (props) => {
  const [trelloList, setTrelloList] = useState([
    {
      id: 1,
      title: 'To do List',
      card: [
        {
          id: 1,
          title: 'go to study',
          description: 'hard',
        },
      ],
    },
  ]);
  const [edited, setEdited] = useState([-1, -1]);
  const [isShowAddListForm, setIsShowAddListForm] = useState(true);
  const [newTrelloList, setNewTrelloList] = useState({
    id: -2,
    title: '',
    card: [],
  });

  return (
    <HomeWrapper>
      {trelloList.length > 0 &&
        trelloList.map((trello) => (
          <TrelloList key={trello.id} trello={trello} edited={edited} />
        ))}
      {isShowAddListForm && (
        <TrelloList trello={newTrelloList} edited={[-2, -2]} />
      )}
    </HomeWrapper>
  );
};

const HomeWrapper = styled.div`
  display: flex;
  gap: 10px;
  padding: 20px;
`;

export default Home;
