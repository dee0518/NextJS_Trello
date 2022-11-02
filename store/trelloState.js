import { atom, selector } from 'recoil';

const trelloListState = atom({
  key: 'trelloListState',
  default: [
    {
      id: 1,
      title: 'To do List',
      cards: [
        {
          id: 1,
          title: 'adf',
          description: 'sdkfjalkdjf',
        },
        {
          id: 2,
          title: 'sg',
          description: '',
        },
        {
          id: 3,
          title: 'sf',
          description: 'sdkfjalkdjf',
        },
        {
          id: 4,
          title: 'afyuiyttdf',
          description: '',
        },
      ],
    },
    {
      id: 2,
      title: 'today',
      cards: [
        {
          id: 1,
          title: 'adf',
          description: 'sdkfjalkdjf',
        },
        {
          id: 2,
          title: 'sg',
          description: '',
        },
        {
          id: 3,
          title: 'sf',
          description: 'sdkfjalkdjf',
        },
        {
          id: 4,
          title: 'afyuiyttdf',
          description: '',
        },
      ],
    },
  ],
});

const editedIdState = atom({
  key: 'editedIdState',
  default: { trelloId: -1, cardId: -1 },
});

const trelloIdForCardState = atom({
  key: 'trelloIdForCardState',
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

const trelloState = selector({
  key: 'trello',
  get: ({ get }) => {
    const trelloList = get(trelloListState);
    const { trelloId } = get(editedIdState);
    return trelloList.find((trello) => trello.id === trelloId);
  },
  set: ({ get, set }, newTrello) => {
    const trelloList = get(trelloListState);
    const { trelloId } = get(editedIdState);

    const newTrelloList =
      trelloId === -1
        ? [...trelloList, newTrello]
        : trelloList.map((trello) =>
            trello.id === trelloId ? newTrello : list
          );

    set(trelloListState, newTrelloList);
  },
});

const trelloCardState = selector({
  key: 'trelloCard',
  get: ({ get }) => {
    const trello = get(trelloState);
    const { cardId } = get(editedIdState);

    return trello.cards.find((card) => card.id === cardId);
  },
  set: ({ get, set }, newCard) => {
    const trelloList = get(trelloListState);
    const { trelloId, cardId } = get(editedIdState);

    const newTrelloList = trelloList.map((trello) =>
      trello.id === trelloId
        ? {
            ...trello,
            cards:
              cardId === -1
                ? [...trello.cards, newCard]
                : trello.cards.map((card) =>
                    card.id === cardId ? newCard : card
                  ),
          }
        : trello
    );

    set(trelloListState, newTrelloList);
  },
});

export {
  trelloState,
  editedIdState,
  trelloIdForCardState,
  preCardTitleState,
  isShowModalState,
  trelloListState,
  trelloCardState,
};
