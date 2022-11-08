import React, { Fragment } from 'react';
import Image from 'next/image';
import { useRecoilState, useResetRecoilState } from 'recoil';
import styled from 'styled-components';
import {
  editedIdState,
  isShowModalState,
  dragIdState,
  trelloListState,
} from '../../store/trelloState';
import TrelloCardModal from './TrelloCardModal';
import detail from '../../public/assets/images/detail.svg';

const TrelloCard = ({ trelloId, card: { id, title, description } }) => {
  const [dragId, setDragId] = useRecoilState(dragIdState);
  const resetDragId = useResetRecoilState(dragIdState);
  const [editedId, setEditedId] = useRecoilState(editedIdState);
  const [isShowModal, setIsShowModal] = useRecoilState(isShowModalState);
  const [trelloList, setTrelloList] = useRecoilState(trelloListState);
  const onOpenModal = () => {
    setIsShowModal(true);
    setEditedId({ trelloId, cardId: id });
  };

  const onDragStart = (e) => {
    e.dataTransfer.effectAllowed = 'copy';
    setDragId({ trelloId, cardId: id });
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDragEnd = () => {
    resetDragId();
  };

  const onDelete = (trelloId, id, e) => {
    e.stopPropagation();
    setTrelloList(
      trelloList.map((trello) =>
        trello.id === trelloId
          ? { ...trello, cards: trello.cards.filter((card) => card.id !== id) }
          : trello
      )
    );
  };

  return (
    <Fragment>
      {isShowModal && editedId.cardId === id && <TrelloCardModal />}
      <Card
        className={dragId.cardId == id ? 'dragging' : ''}
        onClick={onOpenModal}
        draggable={true}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}
      >
        <Title>{title}</Title>
        {description !== '' && (
          <Image src={detail} width="20px" alt="description" />
        )}
        <DeleteBtn onClick={onDelete.bind(null, trelloId, id)}>
          <DeleteSvg viewBox="0 0 18 18">
            <path d="M13 18H5a2 2 0 0 1-2-2V7a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v9a2 2 0 0 1-2 2zm3-15a1 1 0 0 1-1 1H3a1 1 0 0 1 0-2h3V1a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1h3a1 1 0 0 1 1 1z" />
          </DeleteSvg>
        </DeleteBtn>
      </Card>
    </Fragment>
  );
};

const Card = styled.li`
  position: relative;
  width: 100%;
  padding: 10px 15px;
  margin-bottom: 10px;
  border-radius: 5px;
  vertical-align: middle;
  background: ${({ theme }) => theme.trelloCardBg};
  color: ${({ theme }) => theme.trelloCardTitle};
  cursor: pointer;
  transition: background 0.3s ease;

  &.dragging {
    background: ${({ theme }) => theme.color100};
  }
`;

const Title = styled.span`
  display: block;
  padding-right: 40px;
  margin-bottom: 5px;
  font-size: 16px;
  line-height: 1.2;
`;

const DeleteBtn = styled.button`
  position: absolute;
  right: 5px;
  top: 50%;
  display: flex;
  align-items: center;
  width: 30px;
  height: 30px;
  border: 0;
  background: transparent;
  transform: translate3d(0, -50%, 0);
`;

const DeleteSvg = styled.svg`
  width: 18px;
  height: 18px;
  fill: ${({ theme }) => theme.trelloListTitle};
`;

export default TrelloCard;
