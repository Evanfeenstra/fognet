import React from "react"
import styled from "styled-components"
import { Link } from "../routes"

import Layout from "../components/layout"
import { Row, Col } from "../components/scaffold"
import Satoshi from "../components/satoshi"

export default () =>
  <Layout>
    <Header>
      <Col>
        <Title>Instant feeless microtransactions</Title>
        <p>Powered by Flash Channels</p>
      </Col>
    </Header>
    {/* <Row width={`60vw`} margin={"0rem 0 6rem"}>
      <Col width={`30rem`}>
        <h2 style={{ textAlign: "center" }}>Super-small payments</h2>
        <span style={{ textAlign: "center" }}>
          SatoshiPay allows content creators to charge users per download,
          second of video, or for an extra life in your game. There's a whole
          universe of new monetisation possibilities.
        </span>
      </Col>
      <Col width={`30rem`}>
        <h2 style={{ textAlign: "center" }}>Super-small payments</h2>
        <span style={{ textAlign: "center" }}>
          SatoshiPay allows content creators to charge users per download,
          second of video, or for an extra life in your game. There's a whole
          universe of new monetisation possibilities.
        </span>
      </Col>
    </Row> */}
    <Title style={{ color: "#222", fontWeight: 600 }}>Flash, What?</Title>
    <Row width={`43rem`}>
      <span
        style={{ textAlign: "center", padding: "3rem 0 5rem", lineHeight: 2 }}
      >
        Flash channels provide a way to transact for free in high frequency
        without computing PoW constantly. This reduces the transaction overhead
        to a negligible level by creating transactions off network. The
        resulting channels free up users to transact securely with instantly.
      </span>
    </Row>

    <Features>
      <Item margin={"2rem 1rem 10rem"} justify={"space-between"}>
        <HeadWrap>
          <Icon src={`/static/icons/fast.png`} />
          <h2 style={{ marginLeft: "2rem" }}>Fast, Really Fast</h2>
        </HeadWrap>

        <span>
          Flash Channels work by creating transactions off tangle. This frees up
          devices, such as sensors, to transact without the burden of fees or
          continual Proof of Work.
        </span>
      </Item>
      <Item margin={"2rem 1rem 10rem"} justify={"space-between"}>
        <HeadWrap>
          <Icon src={`/static/icons/secure.png`} />
          <h2 style={{ marginLeft: "2rem" }}>No Trust Needed</h2>
        </HeadWrap>

        <span>
          Flash defines trustless relationships with transacting partners. Using
          economic insentives Flash allows for users to safely transact offline.
        </span>
      </Item>
      <Item justify={"space-between"}>
        <HeadWrap>
          <Icon src={`/static/icons/free.png`} />
          <h2 style={{ marginLeft: "2rem" }}>101% Fee Free</h2>
        </HeadWrap>

        <span>
          In IOTA you trade a small amount of computing power for the privilege
          to transact on the network. No fees or third parties required for
          confirmation.
        </span>
      </Item>
    </Features>

    <h2 style={{ paddingTop: 20, marginBottom: 0, fontWeight: 600 }}>
      See it in action
    </h2>
    <Row width={`40rem`}>
      <span
        style={{ textAlign: "center", padding: "2rem 0 5rem", lineHeight: 2 }}
      >
        Below are some articles about IOTA that have content protected by a
        microtransaction paywall. SatoshiPay pioneered this system using
        Bitcoin, but now they can get instant and feeless transactions using
        IOTA.
      </span>
    </Row>

    <Row width={`70rem`} align={`flex-start`}>
      <ArticleSection>
        <Link route={`/article/tangle`}>
          <Article>
            <Img img={`/static/images/tangle.jpg`} />
            <h2>Video: IOTA explained in a nutshell</h2>
            <span>
              An animation by a team of Cambridge University scientists. Since we perceive the off-blockchain solution not only as elegant but also necessary for any further crypto currency adaption, we created this video.
            </span>
          </Article>
        </Link>
        <Link route={`/article/supercomputer`}>
          <Article>
            <Img img={`/static/images/servers.jpeg`} />
            <h2>IOTA and St. Petersburg Polytechnic University</h2>
            <span>
              IOTA is working with software titan Luxoft and a great team at the Peter the Great St. Petersburg Polytechnic University who possesses a 1.1 PetaFLOP supercomputer.
            </span>
          </Article>
        </Link>
        <Link route={`/article/ecosystem`}>
          <Article>
            <Img img={`/static/images/ecosystem-header.jpg`} />
            <h2>IOTA Ecosystem Fund ($10 million USD)</h2>
            <span>
              Every great open source project has a great ecosystem surrounding it, in many ways it is the defining characteristic that separates a mediocre project from a great one.
            </span>
          </Article>
        </Link>
      </ArticleSection>
      <ArticleSection margin>
        <Link route={`/article/innovationnorway`}>
          <Article>
            <Img img={`/static/images/norway-header.jpg`} />
            <h2>IOTA launches DLT Research & Innovation Network from Norway</h2>
            <span>
              Norway has always been world leading in adopting digital technologies across both the public and private sectors and is now awaking to the potential of Distributed Ledger Technologies (DLT).
            </span>
          </Article>
        </Link>
        <Link route={`/article/etherreview`}>
          <Article>
            <Img img={`/static/images/ether-thumb.jpg`} />
            <h2>Ether Review - IOTA with David Sønstebø</h2>
            <span>
              David Sønstebø, co-founder of IOTA, discusses this next-generation post-blockchain platform designed to serve as the backbone for the Internet-of-Things (IoT).
            </span>
          </Article>
        </Link>
      </ArticleSection>
    </Row>

    {/* <Col margin={"2rem 0 10rem"} justify={"space-between"}>
      <Row margin={"2rem 0 0"} width={`40rem`}>
        <Satoshi
          type={`audio`}
          price={50000}
          content={`http://feeds.soundcloud.com/stream/333680258-arthurfalls-ether-review-69-iota-the-post-blockchain-era.mp3`}
          description={`Interview with Davo Sønstebø`}
        />
      </Row>
    </Col> */}
  </Layout>

const ArticleSection = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-top: ${props => (props.margin ? `18rem` : null)};
  @media screen and (max-width: 640px) {
    flex-direction: column;
    margin-top: 0;
  }
`

const Article = styled.a`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  margin: 0 5%;
  padding: 2rem 4vw 6rem;
  cursor: pointer;
  @media screen and (max-width: 640px) {
    width: 90%;
    padding: 2rem 0rem 4rem;
  }
`
const Img = styled.div`
  background: url(${props => props.img}) no-repeat center center;
  background-size: cover;
  width: 100%;
  height: calc(4*4vw);
  min-height: 10rem;
  max-height: 15rem;
  @media screen and (max-width: 640px) {
    height: 250px;
  }
`

const HeadWrap = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
`

const Spacer = styled.div`height: 100px;`

const Features = styled.section`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  background: #ededed;
  padding: 5rem;
  -webkit-clip-path: polygon(0 0, 100% 0, 100% 100%, 0 90%);
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 90%);
  @media screen and (max-width: 40rem) {
    flex-direction: column;
  }
`

const Header = styled.div`
  width: 100%;
  height: 70vh;
  min-height: 20rem;
  background: linear-gradient(120deg, #d37290 20%, #73367c);
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 5rem;
  color: white;
  -webkit-clip-path: polygon(0 0, 100% 0, 100% 100%, 0 93%);
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 93%);
`

const Title = styled.h1`
  color: white;
  font-size: calc(1.5rem + 2vw);
  font-weight: 400;
  text-align: center;
  max-width: 55rem;
  margin: 0;
`
const Icon = styled.img`
  height: 3rem;
  width: 3rem;
`

const Item = styled.a`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  max-width: 20rem;
  padding: 2rem 1rem 6rem;
  @media screen and (max-width: 640px) {
    padding: 2rem 0rem 4rem;
  }
`
