import React from "react"
import styled from "styled-components"
import Fab from "./fab"
import Wallet from "./wallet"
import Channel, { isWindow } from "../../libs/channel"

export default class extends React.Component {
  state = {
    balance: 0,
    drawerOpen: false
  }

  async componentWillReceiveProps() {
    var state = await store.get("state")
    var purchases = await store.get("purchases")

    this.setState({
      balance: state ? state.flash.deposit.reduce((a,b) => a+b, 0) : 0,
      state,
      purchases
    })
  }

  async componentDidMount() {
    var state = await store.get("state")
    var purchases = await store.get("purchases")

    this.setState({
      balance: state ? state.flash.deposit.reduce((a,b) => a+b, 0) : 0,
      state,
      purchases
    })
  }

  toggle = () => {
    this.setState({
      drawerOpen: !this.state.drawerOpen
    })
  }

  updateState = (state) => {
    this.setState({
      balance: state ? state.flash.deposit.reduce((a,b) => a+b, 0) : 0,
      state
    })
  }
  render() {
    isWindow()
    //Channel.initialize()
    var { drawerOpen, balance } = this.state
    return (
      <div>
        <Wallet {...this.state} toggle={this.toggle} updateState={this.updateState}/>
        <Fab balance={balance} toggle={this.toggle} />
      </div>
    )
  }
}
