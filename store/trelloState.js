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
          title: 'NextJS study',
          description: '온라인 강의 및 블로그 정리',
        },
        {
          id: 2,
          title: 'typescript',
          description: '예제 만들기',
        },
        {
          id: 3,
          title: 'Webpack',
          description: '빌드해보기',
        },
      ],
    },
    {
      id: 2,
      title: 'Shopping List',
      cards: [
        {
          id: 4,
          title: '가을옷',
          description: '',
        },
        {
          id: 5,
          title: '발 온열기',
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

const dragIdState = atom({
  key: 'dragIdState',
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
  dragIdState,
  trelloIdForCardState,
  preCardTitleState,
  isShowModalState,
  trelloListState,
  trelloCardState,
};
