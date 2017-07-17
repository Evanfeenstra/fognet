import React from "react";
import styled from "styled-components";
import Link from "next/link";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-height: 100vh;
`;

const Header = styled.header`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 20px 0;
`;

const Anchor = styled.a`
  text-decoration: none;
  margin: 0 10px;
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

const Satoshi = styled.img`height: 24px;`;

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
    <Header>
      <Satoshi src="/static/satoshipay.png" />
      <nav>
        <Link href="/about">
          <Anchor>Home</Anchor>
        </Link>
        <Link href="/about">
          <Anchor>Case Study</Anchor>
        </Link>
        <Link href="/about">
          <Anchor>Gallery</Anchor>
        </Link>
      </nav>
    </Header>
    <Content>
      {props.children}
    </Content>
    <Footer>
      <div>demo things and stuff</div>
    </Footer>
  </Wrapper>;
