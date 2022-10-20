import React from "react";
import styled from "styled-components";

const Header = (props) => {
  return (
    <HeaderWrapper>
      <H1>NextJS_T</H1>
      {props.children}
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.header`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 60px;
  padding: 0 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 15px;
  background-color: ${({ theme }) => theme.bgColor};
  box-shadow: 0 0 15px 3px ${({ theme }) => theme.shadowColor};
`;

const H1 = styled.h1`
  padding: 18px 0;
  font-size: 20px;
  color: ${({ theme }) => theme.textColor};
`;

export default Header;
