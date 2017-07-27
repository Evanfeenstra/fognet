import React from "react";
import styled from "styled-components";

import Layout from "../components/layout";
import { Row, Col } from "../components/scaffold";
import Satoshi from "../components/satoshi";

export default () =>
  <Layout dark>
    <Spacer />
    <Content>
      <div>
        <Header>What is Satoshi Pay</Header>
        <Body>
          {" "}Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Vestibulum varius aliquet convallis. Phasellus eu vulputate nulla, at
          blandit mi. Sed eget turpis ipsum. Nulla blandit, nisi dapibus
          fermentum fermentum, neque justo placerat nibh, ut ultrices ligula
          neque imperdiet nisi.
        </Body>
      </div>
      <div>
        <Header>What is Satoshi Pay</Header>
        <Body>
          {" "}Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Vestibulum varius aliquet convallis. Phasellus eu vulputate nulla, at
          blandit mi. Sed eget turpis ipsum. Nulla blandit, nisi dapibus
          fermentum fermentum, neque justo placerat nibh, ut ultrices ligula
          neque imperdiet nisi.
        </Body>
      </div>
      <div>
        <Header>What is Satoshi Pay</Header>
        <Body>
          {" "}Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Vestibulum varius aliquet convallis. Phasellus eu vulputate nulla, at
          blandit mi. Sed eget turpis ipsum. Nulla blandit, nisi dapibus
          fermentum fermentum, neque justo placerat nibh, ut ultrices ligula
          neque imperdiet nisi.
        </Body>
      </div>
      <div>
        <Header>What is Satoshi Pay</Header>
        <Body>
          {" "}Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Vestibulum varius aliquet convallis. Phasellus eu vulputate nulla, at
          blandit mi. Sed eget turpis ipsum. Nulla blandit, nisi dapibus
          fermentum fermentum, neque justo placerat nibh, ut ultrices ligula
          neque imperdiet nisi.
        </Body>
      </div>
    </Content>
  </Layout>;
const Spacer = styled.div`height: 100px;`;
const Content = styled.div`width: 80%;`;
const Header = styled.h2``;
const Body = styled.p`font-size: 1rem;`;
