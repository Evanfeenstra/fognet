import React from "react";
import styled from "styled-components";
import Link from "next/link";

import FAB from "../wallet";
import Header from "./header";
import Footer from "./footer";
import Iota from "../../libs/iota";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-height: 100vh;
`;

const Content = styled.section`
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

export default props =>
  <Wrapper>
    {Iota.initialise()}
    <Header {...props} />
    <Content spacer={props.spacer}>
      {props.children}
    </Content>
    <FAB />
    <Footer {...props} />
  </Wrapper>;
