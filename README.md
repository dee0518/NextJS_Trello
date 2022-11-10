# NextJS_Trello
<img src="https://img.shields.io/badge/-styled--components-DB7093?style=flat&logo=styledComponents&logoColor=white"> <img src="https://img.shields.io/badge/-react-61DAFB?style=flat&logo=react&logoColor=white"> <img src="https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white">

<br>

## 1. Outline 
Trello는 웹 기반의 프로젝트 관리할 수 있는 서비스입니다. Todo List와 마찬가지로 CRUD 기능을 구현할 수 있으며 이 데이터를 기반으로 그래프를 그려 프로젝트의 수를 파악할 수 있도록 구현했습니다. 1차 목표는 해당 기능들을 다 구현하고 2차로 MogoDB를 공부하여 데이터를 연결하려고 합니다. 현재 구현된 기능은 아래와 같습니다.

- Theme 변경: [./pages/_app.jsx](./pages/_app.jsx)
- Trello list 생성 및 title 수정: [./pages/index.jsx](/pages/index.jsx)
- Card 생성 및 삭제: [./components/trello/Trello.jsx](./components/trello/Trello.jsx)
- Card DnD: [./components/trello/TrelloCard.jsx](./components/trello/TrelloCard.jsx) 
- Card 수정: [./components/trello/TrelloCardModal.jsx](./components/trello/TrelloCardModal.jsx)
- Modal: [./components/Modal.jsx](./components/Modal.jsx)
- Bar chart UI: [./pages/analysis.jsx](./pages/analysis.jsx )
- 전역상태관리: [./store/trelloState.js](./store/trelloState.js)
<br>

## 2. Folder Structure
create-next-app을 사용한 기본 구조.
```
NextJS_Trello/
├── components/
├── pages/
├── public/
├── styles/
├── stores/
└── package.json
```
- components : 컴포넌트 폴더
- pages : Next.js에 필수적인 폴더로 폴더 안에 파일들을 기준으로 페이지가 생성
- public : 정적인 파일을 담은 폴더
- styles : 스타일 폴더
- stores : 전역으로 관리되는 상태 파일을 저장

<br>

## 3. Issue & Slove 
1. Next.js에 styled-components 적용 문제점.
    * 원인 : Pre-rendering으로 인한 문제로 페이지 소스보기에서 스타일 적용 안 됨.
    * 해결 : _document.jsx 파일을 만들어 특정 코드 작성 및 babel 추가 설정.
    - [_document.jsx](./pages/_document.jsx)
    - [.babelrc](./.babelrc)
2. 카드 추가폼이 오픈될 경우 모든 Trello의 카드 추가폼이 보여짐.
    * 원인 : Boolean 값으로만 관리됨.
    * 해결 : Trello id값을 확인하여 해당 카드 추가폼만 보이도록 수정.
    <br>
    
    ```javascript
     // Trello.jsx 166
    {isShowCardForm && trelloIdForCard === trello.id ? (
        <>
          <Textarea
            placeholder="Enter a title for this card..."
            ref={cardTextareaRef}
            onKeyUp={onKeyUpCardForm}
          />
          <AddBtn onClick={onAddCard}>Add Card</AddBtn>
          <CancelBtn onClick={onToggleCardForm}>Cancel</CancelBtn>
        </>
      ) : (
        <OpenCardBtn onClick={onToggleCardForm}>+ Add Card</OpenCardBtn>
      )}
    ```
    
3. Card 컴포넌트의 수만큼 CardModal이 렌더링된 이슈.
    * 원인 : isShowModal 상태로 Modal이 보여지는데 전역으로 관리되는 상태에서 Modal이 Card 컴포넌트안에 선언되어 있음.
    * 해결 : isShowModal이외에 모달창이 떠야하는 cardId를 확인함.
    <br>
    
    ```javascript
      // TrelloCard.jsx 51
      {isShowModal && editedId.cardId === id && <TrelloCardModal />}
    ```
<!-- 4. next-dev.js?3515:20 Warning: `value` prop on `input` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components. 이슈 해결하기-->
<br>

## 4. 배운점
1. Next.js에서 기본적으로 지켜야할 규칙
    - pages 폴더 안에 구현될 page들이 있어야 한다. 
    - 페이지 이동시 Link태그로 감싸고 href 속성을 적용해야 한다.
    - _app.js는 모든 페이지의 공통적인 부분 담당.
2. \_app, \_document의 역할
    - 둘 다 공통적으로 적용될 내용을 작성한다. <br>
    
    |_app|_document|
    |----|---------|
    |서버로 요청이 들어오면 가장 먼저 실행되는 컴포넌트|_app 다음에 실행되는 컴포넌트|
    |컴포넌트에 공통으로 적용할 속성 관리|공통적으로 사용할 head, body 태그 안에 들어갈 내용 작성|

<!-- 3.  recoil의 state를 사용하는 방법 -->
