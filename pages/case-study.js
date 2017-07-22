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
  </Layout>;

const Header = styled.section`
  position: relative;
  color: white;
  width: 100%;
  padding: 2rem 10rem;
  min-height: 60vh;
  box-sizing: border-box;
  padding: 4rem;
  background: linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)),
    url('/static/header.jpg') no-repeat center center;
  background-size: cover;
`;

const Title = styled.h1`
  position: absolute;
  bottom: 4rem;
  max-width: 60rem;
  font-size: 3vw;
`;
