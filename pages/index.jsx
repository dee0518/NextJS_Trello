import React, { Fragment, useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import Input from '../components/Input';
import Button from '../components/Button';
import TrelloList from '../components/trello/TrelloList';
import Textarea from '../components/TextArea';
import OpenListFormButton from '../components/trello/OpenListFormButton';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { trelloListState, editedTrelloState } from '../store/trelloState';

const Home = () => {
  const ListInputRef = useRef();
  const cardTextareaRef = useRef();
  const [trelloList, setTrelloList] = useRecoilState(trelloListState);
  const [editedTrello, setEditedTrello] = useRecoilState(editedTrelloState);
  const resetEditedTrello = useResetRecoilState(editedTrelloState);
  const [isShowAddListForm, setIsShowAddListForm] = useState(true);
  const [isShowAddCardForm, setIsShowAddCardForm] = useState(false);
  const [listIdForCard, setListIdForCard] = useState(-1);

  const onShowOpenListForm = () => setIsShowAddListForm(true);
  const onCloseOpenListForm = () => setIsShowAddListForm(false);

  const onShowOpenCardForm = (id, _) => {
    setListIdForCard(id);
    setIsShowAddCardForm(true);
  };

  useEffect(() => {
    if (isShowAddCardForm) cardTextareaRef.current.focus();
  }, [isShowAddCardForm, listIdForCard]);
  const onCloseOpenCardForm = () => {
    setListIdForCard(-1);
    setIsShowAddCardForm(false);
  };

  const onClickTitle = (type, id, _) => {
    setEditedTrello({ ...editedTrello, [type]: id });
  };
  const creatListId = () => Math.max(...trelloList.map((t) => t.id), 0) + 1;
  const onAddList = () => {
    setTrelloList((prevList) => [
      ...prevList,
      { id: creatListId(), title: ListInputRef.current.value, card: [] },
    ]);
    ListInputRef.current.value = '';
    ListInputRef.current.focus();
  };
  const onChangeTitle = (id, e) =>
    setTrelloList((prevList) =>
      prevList.map((list) =>
        list.id === id ? { ...list, title: e.target.value } : list
      )
    );

  const onPressEnter = (e) => {
    if (e.key !== 'Enter') return;
    e.target.blur();
    resetEditedTrello();
  };

  const onPressEnterForAddedList = (e) => {
    if (e.key !== 'Enter') return;
    onAddList();
  };

  const onAddCard = () => {
    if (cardTextareaRef.current.value.trim() === '') return;

    const newId =
      Math.max(
        ...trelloList
          .find((trello) => trello.id === listIdForCard)
          .card.map((c) => c.id),
        0
      ) + 1;
    setTrelloList((prevList) =>
      prevList.map((list) =>
        list.id === listIdForCard
          ? {
              ...list,
              card: [
                ...list.card,
                {
                  id: newId,
                  title: cardTextareaRef.current.value,
                  description: '',
                },
              ],
            }
          : list
      )
    );
    onCloseOpenCardForm();
  };

  const onPressEsc = (e) => {
    if (e.key !== 'Esc') return;
    onCloseOpenCardForm();
  };

  return (
    <HomeWrapper>
      {trelloList.length > 0 &&
        trelloList.map(({ id, title, card }) => {
          const { listId } = editedTrello;
          return (
            <ListWrapper key={id}>
              <ListTitle
                placeholder="Enter list title..."
                readOnly={listId !== id}
                value={title}
                onClick={onClickTitle.bind(null, 'listId', id)}
                onChange={onChangeTitle.bind(null, id)}
                onKeyDown={onPressEnter}
              />
              <ul>
                {card.length > 0 &&
                  card.map(({ id, title, description }) => (
                    <Card key={'c' + id}>{title}</Card>
                  ))}
              </ul>
              {isShowAddCardForm && listIdForCard === id ? (
                <Fragment>
                  <Textarea
                    placeholder="Enter a title for this card..."
                    ref={cardTextareaRef}
                    onKeyDown={onPressEsc}
                  />
                  <AddBtn onClick={onAddCard}>Add Card</AddBtn>
                  <CancelBtn onClick={onCloseOpenCardForm}>Cancel</CancelBtn>
                </Fragment>
              ) : (
                <OpenCardBtn onClick={onShowOpenCardForm.bind(null, id)}>
                  + Add Card
                </OpenCardBtn>
              )}
            </ListWrapper>
          );
        })}
      {isShowAddListForm ? (
        <ListWrapper>
          <Input
            placeholder="Enter list title..."
            ref={ListInputRef}
            onKeyDown={onPressEnterForAddedList}
          />
          <AddBtn onClick={onAddList}>Add List</AddBtn>
          <CancelBtn onClick={onCloseOpenListForm}>Cancel</CancelBtn>
        </ListWrapper>
      ) : (
        <OpenListFormButton onClick={onShowOpenListForm}>
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

const ListWrapper = styled.div`
  flex-basis: 300px;
  flex-shrink: 0;
  padding: 15px 10px;
  border-radius: 6px;
  background: ${({ theme }) => theme.trelloListBg};
  box-shadow: ${({ theme }) => theme.trelloShadow};
  transition: background 0.3s ease;
`;

const ListTitle = styled(Input)`
  font-weight: bold;
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

const OpenCardBtn = styled(OpenListFormButton)`
  width: 100%;
  background: none;
  box-shadow: none;
  color: ${({ theme }) => theme.color100};

  &:hover {
    background: none;
  }
`;

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

export default Home;
