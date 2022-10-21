import React, { Fragment } from 'react';
import styled from 'styled-components';
import Input from '../Input';
import Button from '../Button';

const TrelloList = ({ edited }) => {
  const [listId, itemId] = edited;
  return (
    <ListWrapper>
      <Input placeholder="Enter list title" />
      {listId !== -1 && (
        <Fragment>
          <AddBtn>{itemId === -1 ? 'AddList' : 'AddCard'}</AddBtn>
          <CancelBtn>Cancel</CancelBtn>
        </Fragment>
      )}
    </ListWrapper>
  );
};

const ListWrapper = styled.div`
  flex-basis: 300px;
  padding: 25px 15px 15px;
  border-radius: 8px;
  background: ${({ theme }) => theme.trelloListBg};
  transition: background 0.3s ease;
`;

const AddBtn = styled(Button)`
  height: 40px;
  margin-top: 15px;
  color: #fff;
`;

const CancelBtn = styled(AddBtn)`
  margin-left: 8px;
  background: #878787;
`;

export default TrelloList;
