# NextJS_Trello

React + NextJS를 이용한 Trello 구현하는 프로젝트입니다.

## Folder Structure

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

- NextJS에 styled-component를 적용시 문제점
  사전 렌더링으로 인해 react만 사용할 때처럼 적용하면
  페이지 소스보기에서 스타일이 적용 안 되어 있는 html를 볼 수 있다.
  => \_document.jsx 파일을 만들어 특정 코드를 작성해야 한다.
