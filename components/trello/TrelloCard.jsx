import React, { Fragment } from 'react';
import Image from 'next/image';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { editedIdState, isShowModalState } from '../../store/trelloState';
import TrelloCardModal from './TrelloCardModal';
import detail from '../../public/assets/images/detail.svg';

const TrelloCard = ({ trelloId, card: { id, title, description } }) => {
  const [editedId, setEditedId] = useRecoilState(editedIdState);
  const [isShowModal, setIsShowModal] = useRecoilState(isShowModalState);
  const onOpenModal = () => {
    setIsShowModal(true);
    setEditedId({ trelloId, cardId: id });
  };

  const onDragStart = (e) => {
    localStorage.setItem('dragInfo', JSON.stringify({ trelloId, cardId: id }));
  };

  return (
    <Fragment>
      {isShowModal && editedId.cardId === id && <TrelloCardModal />}
      <Card onClick={onOpenModal} draggable={true} onDragStart={onDragStart}>
        <Title>{title}</Title>
        {description !== '' && (
          <Image src={detail} width="20px" alt="description" />
        )}
      </Card>
    </Fragment>
  );
};

const Card = styled.li`
  width: 100%;
  padding: 10px 15px;
  margin-bottom: 10px;
  border-radius: 5px;
  vertical-align: middle;
  background: ${({ theme }) => theme.trelloCardBg};
  color: ${({ theme }) => theme.trelloCardTitle};
  cursor: pointer;
`;

const Title = styled.span`
  display: block;
  margin-bottom: 5px;
  font-size: 16px;
  line-height: 1.2;
`;

export default TrelloCard;
