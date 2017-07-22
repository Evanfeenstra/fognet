import React from "react";
import styled from "styled-components";

import Layout from "../components/layout";
import { Row, Col } from "../components/scaffold";
import Satoshi from "../components/satoshi";

export default () =>
  <Layout dark>
    <Spacer />
    <h2>Video Example</h2>
    <Row justify={"space-between"}>
      <Satoshi
        type={`video`}
        height={480}
        placeholder={`https://cheproximity.com.au/assets/Capabilities/capabilities-mobile2.jpg`}
        content={`https://cheproximity.com.au/assets/Capabilities/CHEP-capabilities-main.webm`}
        price={42000}
      />
    </Row>
  </Layout>;
const Spacer = styled.div`height: 100px;`;
