import React from "react";
import styled from "styled-components";

import Layout from "../components/layout";
import { Row, Col } from "../components/scaffold";
import Satoshi from "../components/satoshi";

export default () =>
  <Layout dark>
    <Spacer />
    <Row width={`80%`} justify={"space-between"}>
      <Satoshi
        height={130}
        price={5021000}
        content={`<p>Picanha tri-tip shank, chicken ham hock kevin shoulder ham. Shankle rump landjaeger corned beef jerky bacon boudin tri-tip. Boudin chicken short ribs ham salami kielbasa shank biltong frankfurter ball tip. Venison meatloaf burgdoggen, cow filet mignon meatball capicola spare ribs beef ribs ribeye corned beef. Venison pastrami tail landjaeger ball tip doner.</p>`}
      />
    </Row>
    <Row width={`80%`} justify={"space-around"}>
      <Satoshi
        height={100}
        price={42000}
        content={`<h2>Hello</h2><br/><p>Picanha tri-tip shank, chicken ham hock kevin shoulder ham. Shankle rump landjaeger corned beef jerky bacon boudin tri-tip. Boudin chicken short ribs ham salami kielbasa shank biltong frankfurter ball tip. Venison meatloaf burgdoggen, cow filet mignon meatball capicola spare ribs beef ribs ribeye corned beef. Venison pastrami tail landjaeger ball tip doner.</p>`}
      />
      <Satoshi
        height={100}
        content={`<h2>Hello</h2><br/><p>Picanha tri-tip shank, chicken ham hock kevin shoulder ham. Shankle rump landjaeger corned beef jerky bacon boudin tri-tip. Boudin chicken short ribs ham salami kielbasa shank biltong frankfurter ball tip. Venison meatloaf burgdoggen, cow filet mignon meatball capicola spare ribs beef ribs ribeye corned beef. Venison pastrami tail landjaeger ball tip doner.</p>`}
        price={100000000000000}
      />
    </Row>
    <Row width={`80%`} justify={"space-between"}>
      <Satoshi
        type={`image`}
        placeholder={`/static/potatoplace.png`}
        content={`/static/potato.png`}
        price={42000}
      />
      <Satoshi
        type={`image`}
        placeholder={`http://goods.satoshipay.de/placeholder/1.png`}
        content={`/static/image1.png`}
        price={100000000000000}
      />
    </Row>
    <Row width={`80%`} justify={"space-between"}>
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
