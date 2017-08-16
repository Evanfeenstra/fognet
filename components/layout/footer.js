import styled from "styled-components"
import { Link } from "../../routes"

export default props =>
  <Footer>
    <Col>
      <Title>Pages</Title>
      <Link route="/">
        <Anchor>Home</Anchor>
      </Link>
      <Link route="/faqs">
        <Anchor>FAQs</Anchor>
      </Link>
      <Link route="/contact">
        <Anchor>Contact</Anchor>
      </Link>
    </Col>
    <Col>
      <Title>Content</Title>
      <Link>
        <Anchor>IOTA & St. Petersburg Polytechnic University</Anchor>
      </Link>
      <Link>
        <Anchor>Ether Review - IOTA with David Sønstebø</Anchor>
      </Link>
      <Link>
        <Anchor>The Tangle: an elegant topology</Anchor>
      </Link>
    </Col>
    <Satoshi src={"/static/icons/satoshipay.png"} />
  </Footer>

const Footer = styled.footer`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 2rem 0 4rem;
  color: white;
  background: dimgrey;
  @media screen and (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
  }
`

const Anchor = styled.a`
  padding: .3rem 0 0;
  color: rgba(255, 255, 255, .7);
  cursor: pointer;
`

const Col = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0rem 3rem;
`

const Title = styled.h3`
  padding: .1rem 0;
  font-size: 100%;
`

const Satoshi = styled.img`
  height: 2.5rem;
  padding: 2rem 3rem;
`
