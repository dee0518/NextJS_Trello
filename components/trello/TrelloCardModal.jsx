import React, { useEffect } from 'react';
import Image from 'next/image';
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';
import {
  editedIdState,
  trelloState,
  isShowModalState,
  trelloCardState,
} from '../../store/trelloState';
import styled from 'styled-components';
import Input from '../Input';
import Textarea from '../TextArea';
import Button from '../Button';
import Modal from '../Modal';
import deleteImg from '../../public/assets/images/delete.svg';

const TrelloCardModal = () => {
  const trello = useRecoilValue(trelloState);
  const setIsShowModal = useSetRecoilState(isShowModalState);
  const resetEditedTrello = useResetRecoilState(editedIdState);
  const [card, setCard] = useRecoilState(trelloCardState);

  const onClose = () => {
    resetEditedTrello();
    setIsShowModal(false);
  };

  const onCloseModal = () => {};
  const onChange = ({ target: { name, value } }) => {
    setCard({ ...card, [name]: value });
  };

  return (
    <Modal width={'500'} onClose={onCloseModal}>
      <Title
        name="title"
        placeholder="Enter card title..."
        value={card.title}
        onChange={onChange}
      />
      <SubTitle>in {trello.title}</SubTitle>
      <DesTitle>Description</DesTitle>
      <Textarea
        name="description"
        placeholder="more detail..."
        height="300px"
        value={card.description}
        onChange={onChange}
      />
      <DeleteBtn onClick={onClose}>
        <Image src={deleteImg} width="18" height="18" alt="모달 닫기" />
      </DeleteBtn>
    </Modal>
  );
};

const Title = styled(Input)`
  padding-left: 0;
  margin-top: 15px;
  background: none;
  font-size: 24px;
  font-weight: bold;

  &:focus {
    background: #fefefe;
  }
`;

const SubTitle = styled.div`
  margin-top: 10px;
  font-size: 16px;
`;

const DesTitle = styled.div`
  margin: 30px 0 10px;
  font-size: 24px;
  font-weight: bold;
`;

const DeleteBtn = styled(Button)`
  position: absolute;
  right: 10px;
  top: 10px;
  padding: 10px;
  background: none;

  &:hover {
    background: inherit;
  }
`;

export default TrelloCardModal;
