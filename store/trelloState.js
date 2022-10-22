import { atom } from 'recoil';

const trelloListState = atom({
  key: 'trelloListState',
  default: [],
});

const editedTrelloState = atom({
  key: 'editedTrelloState',
  default: { listId: -1, cardId: -1 },
});

export { trelloListState, editedTrelloState };
