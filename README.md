# NextJS_Trello

React + NextJS를 이용한 Trello 구현하는 프로젝트입니다.
recoil + styled-components

## Folder Structure

create-next-app을 사용하여 구현.

전역관리 -> recoil
컴포넌트에서 필요한 상태 -> useState
input의 value는 useRef
모달 -> createPortal

```
NextJS_Trello/
├── components/
├── pages/
├── public/
├── styles/
├── package.json
└── webpack.config.js
```

## Issue

1. NextJS에 styled-components를 적용시 문제점
   사전 렌더링으로 인해 react만 사용할 때처럼 적용하면
   페이지 소스보기에서 스타일이 적용 안 되어 있는 html를 볼 수 있다.
   => \_document.jsx 파일을 만들어 특정 코드를 작성해야 한다.
   => babel도 작성 필요.
2. Card 추가시 boolean 값으로 추가 폼 보이는 여부를 체크했더니 리스트가 여러개일 때 모든 리스트의 카드폼이 보여짐.
3. NextJS에 styled comonent를 적용하면서 portal할 태그 만들기

## 배운점

1. \_app, \_document의 역할
2. Next.js에서 기본적으로 지켜야할 규칙
