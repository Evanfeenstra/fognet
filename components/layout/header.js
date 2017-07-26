import styled from "styled-components";
import Link from "next/link";

const Header = styled.header`
  width: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 20px 0;
  z-index: 10;
`;

const Anchor = styled.a`
  text-decoration: none;
  margin: 0 10px;
  cursor: pointer;
  color: ${props => (props.dark ? "black" : "white")};
  @media screen and (max-width: 460px) {
    font-size: calc(.4rem + 2vw);
  }
`;

const Satoshi = styled.img`height: 2.5rem;`;

export default props =>
  <Header>
    <Link href="/">
      <Satoshi
        src={
          props.dark
            ? "/static/icons/satoshipay-dark.png"
            : "/static/icons/satoshipay.png"
        }
      />
    </Link>
    <nav>
      <Link href="/">
        <Anchor {...props}>Home</Anchor>
      </Link>
      <Link href="/case-study">
        <Anchor {...props}>Case Study</Anchor>
      </Link>
      <Link href="/media">
        <Anchor {...props}>Videos</Anchor>
      </Link>
    </nav>
  </Header>;
