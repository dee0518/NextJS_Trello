import { css } from "styled-components";

export const a11yHidden = css`
  overflow: hidden;
  position: absolute;
  width: 1px;
  height: 1px;
  clip: rect(0, 0, 0, 0);
  clip-path: circle(0);
  margin: -1px;
  border: 0;
  padding: 0;
  white-space: nowrap;
`;
