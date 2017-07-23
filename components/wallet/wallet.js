import React from "react";
import styled, { css } from "styled-components";
import { Reducer } from "../../libs/utils";
import Iota from "../../libs/iota";

const Show = props => {};

const Wallet = styled.div`
  position: fixed;
  top: 0px;
  bottom: 0px;
  right: 0px;
  width: 40vw;
  background: whitesmoke;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  z-index: 30;
  transform: translateX(${props => (props.drawerOpen ? "0%" : "100%")});
  transition: all .4s ease;
  @media screen and (max-width: 640px) {
    width: 100vw;
  }
`;

const Closed = styled.img`
  height: 40px;
  width: 40px;
  position: absolute;
  left: 5%;
  cursor: pointer;
`;

const Header = styled.div`
  height: 3.5rem;
  width: 100%;
  color: white;
  font-size: 120%;
  background: #ff9800;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  border: none;
  width: 100%;
  color: white;
  font-size: 120%;
  background: #ff9800;
  padding: .5rem 1.3rem;
  margin-bottom: 1rem;
  &:active {
    outline: none;
  }
  &:focus {
    outline: none;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 2vw;
`;

export default props =>
  <Wallet {...props}>
    <Header>
      <div>You have {Reducer(props.balance)} IOTA</div>{" "}
      <Closed onClick={() => props.toggle()} src={"/static/multiply.svg"} />
    </Header>
    <Content>
      <Button> Get 1 MIOTA</Button>
      <Button onClick={() => Iota.info()}> See Purchases</Button>
      <Button> Backup wallet</Button>
    </Content>
  </Wallet>;
