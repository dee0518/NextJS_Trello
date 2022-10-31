import React from 'react';
import styled from 'styled-components';

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px 15px;
  border: 0;
  border-radius: 4px;
  font-size: 14px;
  line-height: 1.25;
  background: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.inputTextColor};

  &::placeholder {
    color: #ccc;
  }
`;

export default Textarea;
