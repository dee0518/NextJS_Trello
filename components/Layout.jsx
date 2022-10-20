import React from "react";
import styled from "styled-components";

const Layout = (props) => {
  return <Wrapper>{props.children}</Wrapper>;
};

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  padding-top: 60px;
  background: ${({ theme }) => theme.bgColor};
`;

export default Layout;
