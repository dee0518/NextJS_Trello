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

const preCardTitleState = atom({
  key: 'preCardTitleState',
  default: '',
});

const isShowModalState = atom({
  key: 'isShowModalState',
  default: false,
});

export {
  trelloListState,
  editedTrelloState,
  listIdForCardState,
  preCardTitleState,
  isShowModalState,
};
