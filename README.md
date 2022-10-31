# NextJS_Trello

React + NextJS + recoil + styled-components를 이용한 Trello 기능을 구현하는 프로젝트입니다.
<div>
<img src="https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white" />
<img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" />
<img src="https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white" />
</div>

## Folder Structure
create-next-app을 사용한 기본 구조.
```
NextJS_Trello/
├── components/
├── pages/
├── public/
├── styles/
├── stores/
├── package.json
└── webpack.config.js
```
<br>

## Components
1. recoil을 이용한 전역관리
2. useState로 컴포넌트에서만 필요한 상태관리
3. useRef를 사용하여 input & textare value 및 focus 설정
4. createPortal를 통해 index.html의 만들어둔 div#modal__root에 모달 생성.
<br>

## Issue
1. NextJS에 styled-components 문제점.
* 원인 : Pre-rendering으로 인한 문제로 페이지 소스보기에서 스타일이 적용 안 됨.
* 해결 :  _document.jsx 파일을 만들어 특정 코드 작성 및 babel 추가 설정.
2. 카드 추가폼이 오픈될 때 모든 Trello의 카드 추가폼이 보여짐.
* 원인 : 불린값으로만 관리됨.
* 해결 : Trello id값을 확인하여 해당 카드 추가폼만 보이도록 수정.
3. Card 컴포넌트의 수만큼 CardModal이 렌더링된 이슈.
* 원인 : isShowModal 상태로 Modal이 보여지는데 전역으로 관리됨.
* 해결 : isShowModal이외에 모달창이 떠야하는 cardId를 확인함.
4. next-dev.js?3515:20 Warning: `value` prop on `input` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components. 이슈 해결하기
<br>

## 배운점
1. \_app, \_document의 역할
2. Next.js에서 기본적으로 지켜야할 규칙
3. recoil의 state를 사용하는 방법
