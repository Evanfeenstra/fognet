import React from "react";
import styled from "styled-components";
import Link from "next/link";

import Eye from "./eye";

export default class extends React.Component {
  state = {
    data: false
  };

  purchase = () => {
    this.setState({ data: `<h2>Hello</h2>` });
  };

  render() {
    var { data } = this.state;
    return (
      <Container>
        {!data
          ? <Paywall height={200}>
              <Button onClick={() => this.purchase()}>
                <SvgBox>
                  <Eye />
                </SvgBox>
                PAY 5K
              </Button>
            </Paywall>
          : <div dangerouslySetInnerHTML={{ __html: data }} />}
      </Container>
    );
  }
}

const Container = styled.div`width: 100%;`;

const SvgBox = styled.div`padding-right: 5px;`;

const Paywall = styled.div`
  position: relative;
  flex: 1;
  height: ${props => props.height + "px" || "100%"};
  width: ${props => props.width + "px" || "100%"};
  background: linear-gradient(#ffeacc 90%, white 0);
  background-size: 100% 20px;
`;

const Button = styled.button`
  position: absolute;
  top: 16px;
  left: 16px;
  display: flex;
  background: #ff9800;
  border-radius: 2px;
  cursor: pointer;
  padding: 8px;
  border: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, .12), 0 1px 2px rgba(0, 0, 0, .18);
  font-size: 14px;
  font-family: -apple-system, \.SFNSText-Regular, San Francisco, Roboto,
    Segoe UI, Helvetica Neue, Lucida Grande, sans-serif;
  text-transform: uppercase;
  color: hsla(0, 0%, 100%, .8);
  &:focus {
    outline: none;
  }
`;
