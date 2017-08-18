import React from "react"
import styled from "styled-components"
import Fab from "./fab"
import Wallet from "./wallet"
import Channel, { isWindow } from "../../libs/channel"

export default class extends React.Component {
  state = {
    balance: 1000000000,
    drawerOpen: false
  }

  toggle = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen })
  }

  render() {
    isWindow()
    Channel.initialize()
    var { drawerOpen, balance } = this.state
    return (
      <div>
        <Wallet {...this.state} toggle={this.toggle} />
        <Fab balance={balance} toggle={this.toggle} />
      </div>
    )
  }
}
