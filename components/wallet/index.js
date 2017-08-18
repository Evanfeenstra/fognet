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

  componentDidMount() {
    var state = store.get("state")
    var purchases = store.get("purchases")

    console.log(state)
    this.setState({
      balance: state.flash.balance,
      state,
      purchases
    })
  }
  // componentWillUnmount() {
  //   this.stopListenting()
  // }

  // listen = () => {
  //   window.addEventListener("storage", this.updateState, false)
  // }

  // stopListenting = () => {
  //   window.removeEventListener("storage", this.updateState, false)
  // }
  // updateState = event => {
  //   console.log(event)
  // }

  toggle = () => {
    var state = store.get("state")
    var purchases = store.get("purchases")

    console.log(state)
    this.setState({
      drawerOpen: !this.state.drawerOpen,
      balance: state.flash.balance,
      state,
      purchases
    })
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
