import styled from "styled-components";
import Link from "next/link";

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

const Satoshi = styled.img`height: 24px;`;

export default props =>
  <Header>
    <Link href="/">
      <Satoshi src="/static/satoshipay.png" />
    </Link>
    <nav>
      <Link href="/">
        <Anchor>Home</Anchor>
      </Link>
      <Link href="/case-study">
        <Anchor>Case Study</Anchor>
      </Link>
      <Link href="/media">
        <Anchor>Media Galley</Anchor>
      </Link>
    </nav>
  </Header>;
