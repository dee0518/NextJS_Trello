import React, { useRef, useState, useEffect } from 'react';
import Head from 'next/head';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { trelloListState, trelloState } from '../store/trelloState';
import styled from 'styled-components';
import Input from '../components/Input';
import Button from '../components/Button';
import Trello from '../components/trello/Trello';
import OpenListFormButton from '../components/trello/OpenListFormButton';
import TrelloWrapper from '../components/trello/TrelloWrapper';

const Home = () => {
  const trelloInputRef = useRef();
  const trelloList = useRecoilValue(trelloListState);
  const setTrello = useSetRecoilState(trelloState);
  const [isShowListForm, setIsListShowForm] = useState(true);

  useEffect(() => {
    if (isShowListForm) trelloInputRef.current.focus();
  }, [isShowListForm]);

  const onToggleListForm = () => setIsListShowForm((prev) => !prev);
  const onAddTrello = () => {
    if (trelloInputRef.current.value.trim() === '') return;

    const id = Math.max(...trelloList.map((trello) => trello.id), 0) + 1;
    setTrello({ id, title: trelloInputRef.current.value, cards: [] });

    trelloInputRef.current.value = '';
    trelloInputRef.current.focus();
  };

  const onKeyUpForListForm = (e) => {
    if (e.key === 'Enter') onAddTrello();
    if (e.key === 'Esc') {
      e.preventDefault();
      setIsListShowForm(false);
    }
  };

  return (
    <>
      <Head>
        <title>NextJS_Trello</title>
      </Head>
      <HomeWrapper>
        {trelloList.length > 0 &&
          trelloList.map((trello) => (
            <Trello key={trello.id} trello={trello} />
          ))}
        {isShowListForm ? (
          <TrelloWrapper>
            <Input
              placeholder="Enter list title..."
              ref={trelloInputRef}
              onKeyUp={onKeyUpForListForm}
            />
            <AddBtn onClick={onAddTrello}>Add Trello</AddBtn>
            <CancelBtn onClick={onToggleListForm}>Cancel</CancelBtn>
          </TrelloWrapper>
        ) : (
          <OpenListFormButton onClick={onToggleListForm}>
            + Add Another List
          </OpenListFormButton>
        )}
      </HomeWrapper>
    </>
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
