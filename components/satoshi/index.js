import React from "react";
import styled from "styled-components";
import Link from "next/link";

import Button from "./button";
import Paywall from "./paywall";

export default class extends React.Component {
  state = {
    data: false,
    price: this.props.price,
    type: this.props.type
  };

  purchase = () => {
    this.setState({ data: `<h2>Hello</h2>` });
  };

  render() {
    var { data } = this.state;
    if (!data) {
      return (
        <Paywall {...this.props}>
          <Button {...this.props} click={this.purchase} />
        </Paywall>
      );
    } else {
      return (
        <Content {...this.props} dangerouslySetInnerHTML={{ __html: data }} />
      );
    }
  }
}

const Content = styled.div`
  position: relative;
  flex: 1;
  height: ${props => props.height + "px" || "100%"};
  width: ${props => props.width + "px" || "100%"};
`;
