import { atom } from 'recoil';

const trelloListState = atom({
  key: 'trelloListState',
  default: [],
});

const editedTrelloState = atom({
  key: 'editedTrelloState',
  default: { listId: -1, cardId: -1 },
});

const listIdForCardState = atom({
  key: 'listIdForCardState',
  default: -1,
});

export { trelloListState, editedTrelloState, listIdForCardState };
