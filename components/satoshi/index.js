import React from "react"
import styled from "styled-components"
import Link from "next/link"

import Button from "./button"
import Paywall from "./paywall"
import Content from "./content"
import Presets from '../../libs/presets'
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
    if (purchases) {
      var item = purchases.find(item => item.id === this.props.content)
      if (item) this.setState({ itemKey: item.key })
    }
  }

  purchase = async () => {
    this.setState({ loading: true }, async () => {
      var item = await Channel.composeTransfer(
        this.props.price,
        Presets.ADDRESS,
        this.props.content
      )
      if (!item) return   this.setState({ loading: false })        
      this.setState({ itemKey: item.key })
    })
  }

  render() {
    var { itemKey, loading } = this.state
    console.log(itemKey)
    if (!itemKey) {
      return (
        <Paywall {...this.props}>
          <Button {...this.props} click={this.purchase} />
          <Title>
            {this.props.description}
          </Title>
          {loading &&
            <Spinner {...this.props} src={"/static/icons/loading.svg"} />}
        </Paywall>
      )
    } else {
      return <Content {...this.props} itemKey={itemKey} />
    }
  }
}

const Spinner = styled.img`
  height: 5rem !important;
  width: 5rem;
  position: absolute;
  left: 50%;
  bottom: 50%;
  margin-bottom: -2.5rem;
  margin-left: -2.5rem;
`

const Title = styled.h4`
  position: absolute;
  top: .3rem;
  left: 8rem;
`
