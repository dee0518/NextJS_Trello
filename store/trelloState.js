import { atom } from 'recoil';

const trelloListState = atom({
  key: 'trelloListState',
  default: [
    {
      id: 1,
      title: 'To do List',
      card: [
        {
          id: 1,
          title: 'go to study',
          description: 'hard',
        },
      ],
    },
  ],
});

const editedTrelloState = atom({
  key: 'editedTrelloState',
  default: { listId: -1, cardId: -1 },
});

export { trelloListState, editedTrelloState };
