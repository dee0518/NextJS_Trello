import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { a11yHidden } from '../styles/commonStyle';

const Menu = () => {
  return (
    <Nav>
      <H2>Navigation</H2>
      <MenuList>
        <MenuItem>
          <Link href="/">My Trello</Link>
        </MenuItem>
        <MenuItem>
          <Link href="/analysis">Analysis</Link>
        </MenuItem>
      </MenuList>
    </Nav>
  );
};

const Nav = styled.nav`
  flex-grow: 1;
`;

const H2 = styled.h2`
  ${a11yHidden};
`;

const MenuList = styled.ul`
  display: flex;
  justify-content: end;
  gap: 15px;
`;

const MenuItem = styled.li`
  font-size: 14px;
  font-weight: bold;
  color: ${({ theme }) => theme.textColor};
`;

export default Menu;
