import React from "react";
import styled from "styled-components";

import Layout from "../components/layout";
import { Row, Col } from "../components/scaffold";
import Satoshi from "../components/satoshi";

export default () =>
  <Layout>
    <h2>Home Page</h2>
    <Row justify={"space-between"}>
      <Satoshi price={5021000} height={200} />
    </Row>
    <Row justify={"space-around"}>
      <Satoshi price={42000} />
      <Satoshi price={100000000000000} />
    </Row>
    <Row justify={"space-between"}>
      <Satoshi
        type={`image`}
        image={`http://goods.satoshipay.de/placeholder/2.png`}
        price={42000}
      />
      <Satoshi
        type={`image`}
        image={`http://goods.satoshipay.de/placeholder/1.png`}
        price={100000000000000}
      />
    </Row>
    <Row justify={"space-between"}>
      <Satoshi
        type={`video`}
        height={400}
        image={`http://goods.satoshipay.de/placeholder/The-nature-of-Montenegro-SD.png`}
        price={42000}
      />
    </Row>
  </Layout>;
