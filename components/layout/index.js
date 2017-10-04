import React from "react"
import styled from "styled-components"
import Link from "next/link"

import FAB from "../wallet"
import Header from "./header"
import Footer from "./footer"
import Password from "./password"

import Channel from "../../libs/channel"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-height: 100vh;
`

const Content = styled.section`
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`

export default class extends React.Component {
  state = { password: "" }

  componentDidMount() {
    // "auth"
    var auth = localStorage.getItem("password")
    console.log(auth)
    if (auth) this.setState({ active: true })
  }

  update = password => {
    var active = false
    if (password === "micropayments") {
      localStorage.setItem("password", 1)
      active = true
    }
    this.setState({ password, active })
  }
  render() {
    var { active } = this.state

    if (active) {
      return (
        <Wrapper>
          <Header {...this.props} />
          <Content spacer={this.props.spacer}>{this.props.children}</Content>
          <FAB />
          <Footer {...this.props} />
        </Wrapper>
      )
    } else {
      return <Password {...this.state} update={this.update} />
    }
  }
}
