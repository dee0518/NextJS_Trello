import React, { Fragment } from 'react';
import Image from 'next/image';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { editedIdState, isShowModalState } from '../../store/trelloState';
import TrelloCardModal from './TrelloCardModal';
import detail from '../../public/assets/images/detail.svg';

const TrelloCard = ({ trelloId, card: { id, title, description } }) => {
  const setEditedTrello = useSetRecoilState(editedIdState);
  const [isShowModal, setIsShowModal] = useRecoilState(isShowModalState);
  const onOpenModal = () => {
    setIsShowModal(true);
    setEditedTrello({ trelloId, cardId: id });
  };

  const onDrag = () => {};
  const onDragOver = (e) => {
    e.preventDefault();
  };
  const onDrop = (e) => {
    console.log(id);
  };

  return (
    <Fragment>
      {isShowModal && <TrelloCardModal />}
      <Card
        onClick={onOpenModal}
        draggable={true}
        onDrag={onDrag}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
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
  background: ${({ theme }) => theme.color5};
  color: ${({ theme }) => theme.color50};
  cursor: pointer;
`;

const Title = styled.div`
  margin-bottom: 5px;
  font-size: 16px;
  line-height: 1.2;
`;

export default TrelloCard;
