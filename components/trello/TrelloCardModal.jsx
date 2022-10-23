import React, { useEffect } from 'react';
import styled from 'styled-components';
import Input from '../Input';
import Textarea from '../TextArea';
import Button from '../Button';
import Modal from '../Modal';
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';
import {
  editedTrelloState,
  trelloListState,
  preCardTitleState,
  isShowModalState,
} from '../../store/trelloState';

const TrelloCardModal = ({ title, description }) => {
  const { listId, cardId } = useRecoilValue(editedTrelloState);
  const [preCardTitle, setPreCartTitle] = useRecoilState(preCardTitleState);
  const setIsShowModal = useSetRecoilState(isShowModalState);

  const [trelloList, setTrelloList] = useRecoilState(trelloListState);
  const resetEditedTrello = useResetRecoilState(editedTrelloState);
  const currentTrelloList = trelloList.find((trello) => trello.id === listId);

  useEffect(() => {
    setPreCartTitle(title);
  }, []);

  const onClose = () => {
    resetEditedTrello();
    setIsShowModal(false);
  };

  const onCloseModal = () => {};
  const onChange = (e) => {
    let { name, value } = e.target;

    if (name === 'title' && value === '') value = preCardTitle;

    setTrelloList((prevList) =>
      prevList.map((trello) =>
        trello.id === listId
          ? {
              ...trello,
              cards: trello.cards.map((card) =>
                card.id === cardId ? { ...card, [name]: value } : card
              ),
            }
          : trello
      )
    );
  };

  return (
    <CardModal onClose={onCloseModal}>
      <Title
        name="title"
        placeholder="Enter card title..."
        value={title}
        onChange={onChange}
      />
      <SubTitle>in {currentTrelloList.title}</SubTitle>
      <DesTitle>Description</DesTitle>
      <Textarea
        name="description"
        placeholder="more detail..."
        height="300px"
        value={description}
        onChange={onChange}
      />
      <DeleteBtn aria-label="모달 닫기" onClick={onClose} />
    </CardModal>
  );
};

const CardModal = styled(Modal)`
  width: 500px;
`;

const Title = styled(Input)`
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
  right: 20px;
  top: 20px;
`;

export default TrelloCardModal;
