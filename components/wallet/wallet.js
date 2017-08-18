import React from "react"
import styled, { css } from "styled-components"
import { Reducer } from "../../libs/utils"
import Iota from "../../libs/iota"

const Show = props => {}

const Wallet = styled.div`
  position: fixed;
  top: 0px;
  bottom: 0px;
  right: 0px;
  width: 20rem;
  background: whitesmoke;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  z-index: 30;
  transform: translateX(${props => (props.drawerOpen ? "0%" : "100%")});
  transition: all .4s ease;
  @media screen and (max-width: 640px) {
    width: 100vw;
  }
`

const Closed = styled.img`
  height: 40px;
  width: 40px;
  position: absolute;
  left: 5%;
  cursor: pointer;
`

const Header = styled.div`
  height: 3.5rem;
  width: 100%;
  color: white;
  font-size: 120%;
  background: rgba(255, 130, 0, 1);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const Button = styled.button`
  border: none;
  width: 100%;
  color: white;
  font-size: 120%;
  background: dimgray;
  padding: .5rem 1.3rem;
  margin-bottom: 1rem;
  &:active {
    outline: none;
  }
  &:focus {
    outline: none;
  }
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  box-sizing: border-box;
  width: 100%;
  padding: 2vw;
  word-wrap: break-word;
`

const Seed = styled.p`
  word-wrap: break-word;
  width: 15rem;
  text-align: center;
`

export default class extends React.Component {
  state = { page: "home" }

  componentDidMount() {
    this.setState({
      channel: store.get("state"),
      purchases: store.get("purchases")
    })
  }

  render() {
    var { page, purchases, channel } = this.state
    return (
      <Wallet {...this.props}>
        <Header>
          <div>You have {Reducer(this.props.balance)} IOTA</div>{" "}
          {page !== "home"
            ? <Closed
                style={{ height: 30, width: 30 }}
                onClick={() => this.setState({ page: "home" })}
                src={"/static/icons/back.svg"}
              />
            : <Closed
                onClick={() => this.props.toggle()}
                src={"/static/icons/multiply.svg"}
              />}
        </Header>
        {page === "home" &&
          <Content>
            <h3>Welcome to the Satoshipay IOTA Demo</h3>
            <p>
              This is a Proof-of-Concept of the SatoshiPay system based on the
              IOTA token. The IOTA wallet used in this demo is live and utlising
              The Tangle to pay for content in realtime.
            </p>
            <Button onClick={() => Iota.info()}> Get 1 MIOTA</Button>
            <Button onClick={() => this.setState({ page: "transactions" })}>
              {" "}See Purchases
            </Button>
            <Button onClick={() => this.setState({ page: "backup" })}>
              {" "}Backup wallet
            </Button>
          </Content>}
        {page === "transactions" &&
          <Content>
            <h3>Your purchases:</h3>
            {purchases.map((item, i) =>
              <Item>
                <span>
                  {item.value}i purchase{" "}
                </span>
                <span>
                  {" "}{item.id}
                </span>
              </Item>
            )}
          </Content>}
        {page === "backup" &&
          <Content>
            <h3>This is your private key. Know as your SEED.</h3>
            <h3>
              This is used to sign a multi-signature wallet between you and
              SatoshiPay
            </h3>
            <Seed>
              {channel.userSeed}
            </Seed>
          </Content>}
      </Wallet>
    )
  }
}
const Item = styled.div`
  width: 90%;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, .4);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
