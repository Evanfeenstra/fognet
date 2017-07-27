import React from "react";
import styled from "styled-components";

import Layout from "../components/layout";
import { Row, Col } from "../components/scaffold";
import Satoshi from "../components/satoshi";

export default () =>
  <Layout>
    <Header>
      <Title>
        IOTA, Luxoft and St. Petersburg Polytechnic University supercompute the
        Tangle
      </Title>
    </Header>
    <Content>
      <h2>Supercomputing IOTA</h2>
      <p>
        IOTA is working with software titan Luxoft and a great team at the Peter
        the Great St. Petersburg Polytechnic University who possesses a 1.1
        PetaFLOP supercomputer. We are utilizing this talent and these immense
        computational resources to research different scenarios and topologies
        of the IOTA Tangle in order to optimize the protocol and explore the
        full underlying potential of the technology in great depth.
      </p>
      <img
        style={{ height: "auto", width: "100%" }}
        src={
          "https://cdn-images-1.medium.com/max/1600/1*S4WzpEONF0INUlnXcNk61g.jpeg"
        }
      />
      <p>
        Given the nature of the sheer breakthrough in distributed ledger
        technology that the Tangle represents, these tests and their results
        will be very valuable from both an academic, but also practical
        perspective. With confirmation of current results we can move towards
        standardization of the protocol itself.
      </p>
      <p>
        We also intend to collaborate with this great team and their
        supercomputer on future IXI modules on top of IOTA, but that is news for
        another day.
      </p>
      <Wrapper>
        <Author
          src={
            "https://cdn-images-1.medium.com/fit/c/120/120/1*FTolJ7161fIrqxOUq9yyWg.jpeg"
          }
        />
        <div>
          <span>David Sønstebø</span>
          <span>Founder of IOTA</span>
        </div>
      </Wrapper>
    </Content>
  </Layout>;

const Header = styled.section`
  position: relative;
  color: white;
  width: 100%;
  padding: 2rem 10rem;
  height: 70vh;
  min-height: 20rem;
  box-sizing: border-box;
  padding: 10vw;
  background: linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)),
    url('/static/servers.jpeg') no-repeat center center;
  background-size: cover;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  padding: 4rem 2rem;
  max-width: 50rem;
  p {
    font-size: 120%;
  }
  @media screen and (max-width: 640px) {
    width: 90vw;
  }
`;

const Wrapper = styled.div`
  display: flex;
  span {
    margin-top: .3rem;
    margin-left: 1rem;
    display: block;
  }
`;

const Author = styled.img`
  border-radius: 30px;
  width: 60px;
  height: 60px;
`;

const Title = styled.h1`
  position: absolute;
  bottom: 4rem;
  max-width: 60rem;
  font-size: 3vw;
  @media screen and (max-width: 640px) {
    font-size: 1.5rem;
    max-width: 80vw;
  }
`;
