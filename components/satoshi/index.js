import React from "react"
import styled from "styled-components"
import Link from "next/link"

import Button from "./button"
import Paywall from "./paywall"
import Content from "./content"

import Channel from "../../libs/channel"

export default class extends React.Component {
  state = {
    itemKey: false,
    loading: false,
    price: this.props.price,
    type: this.props.type
  }

  // Check for the purchase and attach the key
  async componentDidMount() {
    var purchases = await store.get("purchases")
    var item = purchases.find(item => item.id === this.props.content)
    if (item) {
      this.setState({ itemKey: item.key })
    }
  }

  purchase = async () => {
    this.setState({ loading: true })

    var item = await Channel.composeTransfer(
      10,
      `TRPSU9DSNROHLCPIXBXGDXPOLKPUOYZZBZJCEILRJNSIFZASLPKHCIDIDBRCJHASMENZMTICJMBZRANKM`,
      this.props.content
    )
    this.setState({ itemKey: item.key })
  }

  render() {
    var { itemKey } = this.state
    console.log(itemKey)
    if (!itemKey) {
      return (
        <Paywall {...this.props}>
          <Button {...this.props} click={this.purchase} />
          <Title>
            {this.props.description}
          </Title>
        </Paywall>
      )
    } else {
      return <Content {...this.props} itemKey={itemKey} />
    }
  }
}

const Title = styled.h4`
  position: absolute;
  top: .3rem;
  left: 8rem;
`
