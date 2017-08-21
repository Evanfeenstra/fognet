import styled from "styled-components"
import { Link } from "../../routes"

export default props =>
  <Footer>
    <Col>
      {/* <Title>Articles</Title>
      <Link>
        <Anchor>IOTA & St. Petersburg Polytechnic University</Anchor>
      </Link>
      <Link>
        <Anchor>Ether Review - IOTA with David Sønstebø</Anchor>
      </Link>
      <Link>
        <Anchor>The Tangle: an elegant topology</Anchor>
      </Link> */}
    </Col>
    <Row>
      <Satoshi src={"/static/icons/satoshipay.png"} />
      <Satoshi src={"/static/icons/iota.png"} />
    </Row>
  </Footer>

const Footer = styled.footer`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 3rem 5rem 2rem;
  color: white;
  box-sizing: border-box;
  background: linear-gradient(120deg, #d37290 20%, #73367c);
  -webkit-clip-path: polygon(0 0, 100% 30%, 100% 100%, 0 100%);
  clip-path: polygon(0 0, 100% 30%, 100% 100%, 0 100%);
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

const Row = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0rem 0rem;
  @media screen and (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 0rem 0rem 0 3rem;
  }
`

const Title = styled.h3`
  padding: .1rem 0;
  font-size: 100%;
`

const Satoshi = styled.img`
  height: 2.5rem;
  width: auto;
  padding: 1rem 1rem 0rem;
  @media screen and (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem 0rem 0 0rem;
  }
`
