import React from "react";
import styled from "styled-components";

import Layout from "../components/layout";
import { Row, Col } from "../components/scaffold";
import Satoshi from "../components/satoshi";

export default () =>
  <Layout>
    <Header>
      <Row>
        {/* <Img src={"/static/icons/iota.png"} /> */}
        <Title>Empowering creators with seamless payments</Title>
      </Row>
    </Header>
    <Col width={`60vw`} margin={"0rem 0 6rem"}>
      <h2 style={{ textAlign: "center" }}>Next Generation Crypto</h2>
      <Row width={`40rem`}>
        <span style={{ textAlign: "center" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          varius aliquet convallis. Phasellus eu vulputate nulla, at blandit mi.
          Sed eget turpis ipsum. Nulla blandit, nisi dapibus fermentum
          fermentum, neque justo placerat nibh, ut ultrices ligula neque
          imperdiet nisi.
        </span>
      </Row>
    </Col>
    <Row>
      <Col margin={"2rem 0 10rem"} justify={"space-between"}>
        <h2>Try it out</h2>
        <span style={{ textAlign: "center" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          varius aliquet convallis. Phasellus eu vulputate nulla, at blandit mi.
          Sed egenisi.
        </span>
      </Col>
      <Col margin={"2rem 0 10rem"} justify={"space-between"}>
        <h2>Try it out</h2>
        <span style={{ textAlign: "center" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          varius aliquet convallis. Phasellus eu vulputate nulla, at blandit mi.
          Sed egenisi.
        </span>{" "}
      </Col>
      <Col margin={"2rem 0 10rem"} justify={"space-between"}>
        <h2>Try it out</h2>
        <span style={{ textAlign: "center" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          varius aliquet convallis. Phasellus eu vulputate nulla, at blandit mi.
          Sed egenisi.
        </span>
      </Col>
    </Row>

    <Col margin={"2rem 0 10rem"} justify={"space-between"}>
      <h2>Try it out</h2>
      <Row margin={"2rem 0 0"} width={`40rem`}>
        <Satoshi
          type={`audio`}
          price={50000}
          content={`http://feeds.soundcloud.com/stream/333680258-arthurfalls-ether-review-69-iota-the-post-blockchain-era.mp3`}
          description={`Interview with Davo Sønstebø`}
        />
      </Row>
    </Col>
  </Layout>;

const Spacer = styled.div`height: 100px;`;

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
`;

const Title = styled.h1`
  color: white;
  font-size: calc(1.5rem + 2vw);
  font-weight: 400;
  text-align: center;
  max-width: 50rem;
`;

const Img = styled.img`width: 10rem;`;
