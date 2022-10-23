import React, { Fragment, useRef, useEffect, useState } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import {
  trelloListState,
  editedTrelloState,
  listIdForCardState,
} from '../../store/trelloState';
import styled from 'styled-components';
import Input from '../Input';
import Button from '../Button';
import Textarea from '../TextArea';
import OpenListFormButton from './OpenListFormButton';
import TrelloWrapper from './TrelloWrapper';
import TrelloCard from './TrelloCard';

const TrelloGroup = ({ trello: { id, title, cards } }) => {
  const cardTextareaRef = useRef();

  const [editedTrello, setEditedTrello] = useRecoilState(editedTrelloState);
  const [listIdForCard, setListIdForCard] = useRecoilState(listIdForCardState);
  const [trelloList, setTrelloList] = useRecoilState(trelloListState);
  const resetEditedTrello = useResetRecoilState(editedTrelloState);

  const [editedlistTitle, setEditedlistTitle] = useState(null);
  const [isShowCardForm, setIsShowCardForm] = useState(false);

  useEffect(() => {
    setListIdForCard(isShowCardForm ? id : -1);
  }, [isShowCardForm, setListIdForCard, id]);

  useEffect(() => {
    if (listIdForCard !== -1) cardTextareaRef.current.focus();
  }, [listIdForCard]);

  const onToggleCardForm = () => setIsShowCardForm((prev) => !prev);

  const onChangeTitle = (e) => setEditedlistTitle(e.target.value);
  const onClickListTitle = () => {
    setEditedTrello({ ...editedTrello, listId: id });
    setEditedlistTitle(trelloList.find((trello) => trello.id === id).title);
  };

  const onKeyUpListTitle = (e) => {
    if (e.key !== 'Backspace' && e.key !== 'Enter') return;
    if (editedlistTitle.trim() !== '' && e.key === 'Backspace') return;

    const { listId } = editedTrello;
    const originListTitle = trelloList.find(
      (trello) => trello.id === listId
    ).title;

    if (
      e.key === 'Enter' &&
      editedlistTitle.trim() !== '' &&
      originListTitle !== editedlistTitle
    )
      setTrelloList((prevList) =>
        prevList.map((list) =>
          list.id === listId ? { ...list, title: editedlistTitle } : list
        )
      );

    e.target.blur();
    resetEditedTrello();
  };

  const onAddCard = () => {
    if (cardTextareaRef.current.value.trim() === '') return;

    // prettier-ignore
    const newId = Math.max(...trelloList.find((trello) => trello.id === listIdForCard).cards.map((c) => c.id), 0) + 1;

    // prettier-ignore
    setTrelloList((prevList) => prevList.map((list) =>
        list.id === listIdForCard ? {
              ...list,
              cards: [
                ...list.cards,
                { id: newId, title: cardTextareaRef.current.value, description: '' },
              ],
            }
          : list
      )
    );

    cardTextareaRef.current.value = '';
    cardTextareaRef.current.focus();
  };

  const onKeyUpCardForm = (e) => {
    if (e.key === 'Esc') onToggleCardForm();
    if (e.key === 'Enter') onAddCard();
  };

  return (
    <TrelloWrapper>
      <ListTitle
        placeholder="Enter list title..."
        readOnly={editedTrello.listId !== id}
        value={editedTrello.listId === id ? editedlistTitle : title}
        onClick={onClickListTitle}
        onChange={onChangeTitle}
        onKeyUp={onKeyUpListTitle}
      />

      {cards.length > 0 && (
        <TrelloList>
          {cards.map((card) => (
            <TrelloCard key={'c' + card.id} card={card} />
          ))}
        </TrelloList>
      )}

      {isShowCardForm && listIdForCard === id ? (
        <Fragment>
          <Textarea
            placeholder="Enter a title for this card..."
            ref={cardTextareaRef}
            onKeyUp={onKeyUpCardForm}
          />
          <AddBtn onClick={onAddCard}>Add Card</AddBtn>
          <CancelBtn onClick={onToggleCardForm}>Cancel</CancelBtn>
        </Fragment>
      ) : (
        <OpenCardBtn onClick={onToggleCardForm}>+ Add Card</OpenCardBtn>
      )}
    </TrelloWrapper>
  );
};

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

const TrelloList = styled.ul`
  margin-top: 20px;
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

export default TrelloGroup;
