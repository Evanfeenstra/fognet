import React from "react";
import styled from "styled-components";
import Fab from "./fab";
import Wallet from "./wallet";

export default class extends React.Component {
  state = {
    balance: 1000000000,
    drawerOpen: false
  };

  toggle = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  };

  render() {
    var { drawerOpen, balance } = this.state;
    return (
      <div>
        <Wallet {...this.state} toggle={this.toggle} />
        <Fab balance={balance} toggle={this.toggle} />
      </div>
    );
  }
}
