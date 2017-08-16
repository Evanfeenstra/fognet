import React from "react"
import styled from "styled-components"
import { Link } from "../routes"

import Layout from "../components/layout"
import { Row, Col } from "../components/scaffold"
import Satoshi from "../components/satoshi"

export default () =>
  <Layout>
    <Header>
      <Row>
        <Title>Empowering creators with seamless payments</Title>
      </Row>
    </Header>
    <Row width={`60vw`} margin={"0rem 0 6rem"}>
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
    </Row>
    <h2>Try it out</h2>
    <Row width={`40rem`}>
      <span style={{ textAlign: "center" }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
        varius.
      </span>
    </Row>
    <Row align={`flex-start`}>
      <Link route={`/article/supercomputer`}>
        <Item margin={"2rem 1rem 10rem"} justify={"space-between"}>
          <Img img={`/static/images/servers.jpeg`} />
          <h2>IOTA and St. Petersburg Polytechnic University</h2>
          <span>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            varius aliquet convallis. Phasellus eu vulputate nulla, at blandit
            mi. Sed egenisi.
          </span>
        </Item>
      </Link>
      <Link route={`/article/supercomputer`}>
        <Item margin={"2rem 1rem 10rem"} justify={"space-between"}>
          <Img img={`/static/images/tangle.jpg`} />
          <h2>The Tangle: an elegant topology</h2>
          <span>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            varius aliquet convallis. Phasellus eu vulputate nulla, at blandit
            mi. Sed egenisi.
          </span>
        </Item>
      </Link>
      <Link route={`/article/etherreview`}>
        <Item justify={"space-between"}>
          <Img img={`/static/images/ether-thumb.jpg`} />
          <h2>Ether Review - IOTA with David Sønstebø</h2>
          <span>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            varius aliquet convallis. Phasellus eu vulputate nulla, at blandit
            mi. Sed egenisi.
          </span>
        </Item>
      </Link>
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

const Spacer = styled.div`height: 100px;`

const Header = styled.div`
  width: 100%;
  height: 88vh;
  min-height: 20rem;
  background: linear-gradient(rgba(0, 0, 0, .7), rgba(0, 0, 0, .4)),
    url('/static/images/intro.jpg') no-repeat center center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 5rem;
`

const Title = styled.h1`
  color: white;
  font-size: calc(1.5rem + 2vw);
  font-weight: 400;
  text-align: center;
  max-width: 50rem;
`

const Img = styled.div`
  background: url(${props => props.img}) no-repeat center center;
  background-size: cover;
  width: 100%;
  height: calc(4*4vw);
  @media screen and (max-width: 640px) {
    height: 250px;
  }
`

const Item = styled.a`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 2rem 1rem 10rem;
  @media screen and (max-width: 640px) {
    margin: 2rem 0rem 4rem;
  }
`
