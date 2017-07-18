import styled from "styled-components";
import Eye from "./eye";

import { Reducer } from "../../libs/utils";

export default props =>
  <Button onClick={() => props.click()}>
    <SvgBox>
      <Eye />
    </SvgBox>
    PAY {Reducer(props.price)}
  </Button>;

const Button = styled.button`
  position: absolute;
  top: 16px;
  left: 16px;
  display: flex;
  background: #ff9800;
  border-radius: 2px;
  cursor: pointer;
  padding: 8px;
  border: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, .12), 0 1px 2px rgba(0, 0, 0, .18);
  font-size: 14px;
  font-family: -apple-system, \.SFNSText-Regular, San Francisco, Roboto,
    Segoe UI, Helvetica Neue, Lucida Grande, sans-serif;
  text-transform: uppercase;
  color: hsla(0, 0%, 100%, .8);
  &:focus {
    outline: none;
  }
`;

const SvgBox = styled.div`padding-right: 5px;`;
