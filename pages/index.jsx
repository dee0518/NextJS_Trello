import React, { useRef, useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { trelloListState } from '../store/trelloState';
import styled from 'styled-components';
import Input from '../components/Input';
import Button from '../components/Button';
import TrelloGroup from '../components/trello/TrelloGroup';
import OpenListFormButton from '../components/trello/OpenListFormButton';
import TrelloWrapper from '../components/trello/TrelloWrapper';

const Home = () => {
  const listInputRef = useRef();
  const [trelloList, setTrelloList] = useRecoilState(trelloListState);
  const [isShowListForm, setIsListShowForm] = useState(true);

  useEffect(() => {
    if (isShowListForm) listInputRef.current.focus();
  }, [isShowListForm]);

  const onToggleListForm = () => setIsListShowForm((prev) => !prev);
  const onAddTrelloList = () => {
    if (listInputRef.current.value.trim() === '') return;

    const id = Math.max(...trelloList.map((trello) => trello.id), 0) + 1;
    setTrelloList((prevList) => [
      ...prevList,
      { id, title: listInputRef.current.value, cards: [] },
    ]);

    listInputRef.current.value = '';
    listInputRef.current.focus();
  };

  const onKeyUpForListForm = (e) => {
    if (e.key === 'Enter') onAddTrelloList();
    if (e.key === 'Esc') {
      e.preventDefault();
      setIsListShowForm(false);
    }
  };

  return (
    <HomeWrapper>
      {trelloList.length > 0 &&
        trelloList.map((trello) => (
          <TrelloGroup key={trello.id} trello={trello} />
        ))}
      {isShowListForm ? (
        <TrelloWrapper>
          <Input
            placeholder="Enter list title..."
            ref={listInputRef}
            onKeyUp={onKeyUpForListForm}
          />
          <AddBtn onClick={onAddTrelloList}>Add List</AddBtn>
          <CancelBtn onClick={onToggleListForm}>Cancel</CancelBtn>
        </TrelloWrapper>
      ) : (
        <OpenListFormButton onClick={onToggleListForm}>
          + Add Another List
        </OpenListFormButton>
      )}
    </HomeWrapper>
  );
};

const HomeWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: start;
  gap: 10px;
  padding: 20px;
  overflow-x: auto;
`;

const AddBtn = styled(Button)`
  margin-top: 15px;
`;

const CancelBtn = styled(AddBtn)`
  margin-left: 8px;
  background: #878787;

  &:hover {
    background: #666;
  }
`;

export default Home;
