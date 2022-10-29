import React, { useRef, useEffect, useState } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import {
  trelloState,
  trelloListState,
  editedIdState,
  trelloIdForCardState,
} from '../../store/trelloState';
import styled from 'styled-components';
import Input from '../Input';
import Button from '../Button';
import Textarea from '../TextArea';
import OpenListFormButton from './OpenListFormButton';
import TrelloWrapper from './TrelloWrapper';
import TrelloCard from './TrelloCard';

const Trello = ({ trello }) => {
  const cardTextareaRef = useRef();
  const [currentTrello, setCurrentTrello] = useRecoilState(trelloState);

  const [editedId, setEditedId] = useRecoilState(editedIdState);
  const [trelloIdForCard, setTrelloIdForCard] =
    useRecoilState(trelloIdForCardState);
  const [trelloList, setTrelloList] = useRecoilState(trelloListState);
  const resetEditedId = useResetRecoilState(editedIdState);

  const [trelloTitle, setTrelloTitle] = useState(trello.title);
  const [isShowCardForm, setIsShowCardForm] = useState(false);

  useEffect(() => {
    const trelloId = isShowCardForm ? trello.id : -1;
    setTrelloIdForCard(trelloId);
  }, [isShowCardForm, setTrelloIdForCard, trello]);

  useEffect(() => {
    if (isShowCardForm && trelloIdForCard === trello.id)
      cardTextareaRef.current.focus();
  }, [isShowCardForm, trelloIdForCard, cardTextareaRef, trello]);

  const onToggleCardForm = () => setIsShowCardForm((prev) => !prev);
  const onChangeTitle = (e) => setTrelloTitle(e.target.value);
  const onClickTrelloTitle = () =>
    setEditedId({ ...editedId, trelloId: trello.id });
  const onKeyUpTrelloTitle = (e) => {
    if (e.key !== 'Backspace' && trelloTitle.trim() !== '') return;

    if (currentTrello.title !== trelloTitle)
      setCurrentTrello({ ...currentTrello, title: trelloTitle });

    e.target.blur();
    resetEditedId();
  };

  const onAddCard = () => {
    if (cardTextareaRef.current.value.trim() === '') return;

    // prettier-ignore
    const newId = Math.max(...trelloList.find((trello) => trello.id === trelloIdForCard).cards.map((c) => c.id), 0) + 1;

    // prettier-ignore
    setTrelloList((prevList) => prevList.map((trello) =>
    trello.id === trelloIdForCard ? {
              ...trello,
              cards: [
                ...trello.cards,
                { id: newId, title: cardTextareaRef.current.value, description: '' },
              ],
            }
          : trello
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
      <TrelloTitle
        placeholder="Enter list title..."
        readOnly={editedId.trelloId !== trello.id}
        value={trelloTitle}
        onClick={onClickTrelloTitle}
        onChange={onChangeTitle}
        onKeyUp={onKeyUpTrelloTitle}
      />
      {trello.cards.length > 0 && (
        <TrelloCardList>
          {trello.cards.map((card) => (
            <TrelloCard key={card.id} trelloId={trello.id} card={card} />
          ))}
        </TrelloCardList>
      )}

      {isShowCardForm && trelloIdForCard === trello.id ? (
        <>
          <Textarea
            placeholder="Enter a title for this card..."
            ref={cardTextareaRef}
            onKeyUp={onKeyUpCardForm}
          />
          <AddBtn onClick={onAddCard}>Add Card</AddBtn>
          <CancelBtn onClick={onToggleCardForm}>Cancel</CancelBtn>
        </>
      ) : (
        <OpenCardBtn onClick={onToggleCardForm}>+ Add Card</OpenCardBtn>
      )}
    </TrelloWrapper>
  );
};

const TrelloTitle = styled(Input)`
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

const TrelloCardList = styled.ul`
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

export default Trello;
