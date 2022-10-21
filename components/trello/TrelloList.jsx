import React, { Fragment } from 'react';
import styled from 'styled-components';
import Input from '../Input';
import Button from '../Button';
import ShowOpenButton from './ShowOpenButton';

const TrelloList = ({ trello, edited }) => {
  const [listId, itemId] = edited;
  const { id, title, card } = trello;
  const onChange = () => {};

  return (
    <Fragment>
      <ListWrapper>
        <Input
          placeholder="Enter list title"
          readOnly={listId !== id}
          value={title}
          onChange={onChange}
        />
        {listId !== -1 && (
          <Fragment>
            <AddBtn>{itemId === -1 ? 'AddList' : 'AddCard'}</AddBtn>
            <CancelBtn>Cancel</CancelBtn>
          </Fragment>
        )}
        {card.length > 0 && (
          <ul>
            {card.map((item) => (
              <Card key={item.id}>{item.title}</Card>
            ))}
          </ul>
        )}
        <ShowOpenListBtn>Add card</ShowOpenListBtn>
      </ListWrapper>
      {listId === -2 && <ShowOpenListBtn>Add list</ShowOpenListBtn>}
    </Fragment>
  );
};

const ListWrapper = styled.div`
  flex-basis: 300px;
  flex-shrink: 0;
  padding: 20px 15px 15px;
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

const ShowOpenListBtn = styled(ShowOpenButton)`
  width: 300px;
`;

const Card = styled.li`
  width: 100%;
  padding: 0 15px;
  border-radius: 5px;
  font-size: 16px;
  line-height: 40px;
  vertical-align: middle;
  background: ${({ theme }) => theme.bgColor};
`;

export default TrelloList;
