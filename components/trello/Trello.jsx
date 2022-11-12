import React, { useRef, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import {
  trelloState,
  trelloListState,
  editedIdState,
  trelloIdForCardState,
  isShowModalState,
  dragIdState,
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
  const isShowModal = useRecoilValue(isShowModalState);
  const [currentTrello, setCurrentTrello] = useRecoilState(trelloState);
  const [editedId, setEditedId] = useRecoilState(editedIdState);
  const [trelloIdForCard, setTrelloIdForCard] =
    useRecoilState(trelloIdForCardState);
  const [trelloList, setTrelloList] = useRecoilState(trelloListState);
  const resetEditedId = useResetRecoilState(editedIdState);
  const dragId = useRecoilValue(dragIdState);
  const resetDragId = useResetRecoilState(dragIdState);

  const [trelloTitle, setTrelloTitle] = useState(trello.title);
  const [isShowCardForm, setIsShowCardForm] = useState(false);

  useEffect(() => {
    const trelloId = isShowCardForm ? trello.id : -1;
    setTrelloIdForCard(trelloId);
  }, [isShowCardForm, setTrelloIdForCard, trello]);

  useEffect(() => {
    if (isShowCardForm && trelloIdForCard === trello.id && !isShowModal)
      cardTextareaRef.current.focus();
  }, [isShowCardForm, trelloIdForCard, cardTextareaRef, trello, isShowModal]);

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
    const newId = Math.max(...trelloList.map((trello) => trello.cards.map(c => c.id)).flat(), 0) + 1;

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

  const getAfterElementId = (prevY, cur) => {
    const children = cur.closest('div').querySelector('ul')?.children;
    if (!children) return 0;
    const elements = [...children];

    const result = elements.reduce(
      (acc, element, idx) => {
        const offset = prevY - element.offsetTop - element.offsetHeight / 3;

        if (offset < 0 && offset > acc.offset) {
          return { offset, idx };
        } else return acc;
      },
      { offset: Number.MIN_SAFE_INTEGER, idx: -1 }
    );

    return result.idx === -1 ? elements.length : result.idx;
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };
  const onDrop = (e) => {
    e.preventDefault();
    const { trelloId, cardId } = dragId;

    if (trelloId === -1) return;
    const afterIdx = getAfterElementId(e.clientY, e.target);
    let newTrelloList = trelloList;
    const currentTrello = trelloList.find((trello) => trello.id === trelloId);
    const currentCard = currentTrello.cards.find((card) => card.id === cardId);
    const restCards = currentTrello.cards.filter((card) => card.id !== cardId);

    if (trello.id === trelloId) {
      const beforeCards = restCards.filter((_, i) => i < afterIdx);
      const afterCards = restCards.filter((_, i) => i >= afterIdx);
      newTrelloList = newTrelloList.map((trello) =>
        trello.id === trelloId
          ? { ...trello, cards: [...beforeCards, currentCard, ...afterCards] }
          : trello
      );
    } else {
      const dropTrelloCards = trelloList.find((t) => t.id === trello.id).cards;
      const beforeCards = dropTrelloCards.filter((_, i) => i < afterIdx);
      const afterCards = dropTrelloCards.filter((_, i) => i >= afterIdx);

      newTrelloList = newTrelloList.map((newTrello) => {
        if (newTrello.id === trello.id)
          return {
            ...newTrello,
            cards: [...beforeCards, currentCard, ...afterCards],
          };
        else if (newTrello.id === trelloId)
          return { ...newTrello, cards: restCards };
        else return newTrello;
      });
    }

    setTrelloList(newTrelloList);
    resetDragId();
  };

  return (
    <TrelloWrapper onDrop={onDrop} onDragOver={onDragOver} draggable={true}>
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
  color: ${({ theme }) => theme.trelloListTitle};

  &:hover {
    background: none;
  }
`;

export default Trello;
