import React from "react";
import styled from "styled-components";
import Link from "next/link";

import FAB from "../fab";
import Header from "./header";
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-height: 100vh;
`;

const Content = styled.section`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 80%;
  padding: 20px;
`;

const Footer = styled.footer`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 20px 0;
  color: white;
  background: palevioletred;
`;

export default props =>
  <Wrapper>
    <Header />
    <Content>
      {props.children}
    </Content>
    <FAB />
    <Footer>
      <div>demo things and stuff</div>
    </Footer>
  </Wrapper>;
