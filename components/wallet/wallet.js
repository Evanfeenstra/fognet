import React from "react"
import styled, { css } from "styled-components"
import { Reducer } from "../../libs/utils"

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
  align-items: flex-start;
  text-align: left;
  box-sizing: border-box;
  width: 100%;
  padding: 2vw;
  word-wrap: break-word;
`

const Seed = styled.h3`
  word-wrap: break-word;
  width: 15rem;
  text-align: left;
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
              This is a Proof-of-Concept of the SatoshiPay system based. It's on the
              IOTA token. The IOTA wallet used in this demo is working on the mainnet 
              and is using Flash Channels to pay for confirm payment in realtime.
            </p>
            <p>
              While the tokens are real, you will not be able to withdraw them.
            </p>
            <Button onClick={() => Iota.info()}>Fund the Channel</Button>
            <Button onClick={() => this.setState({ page: "transactions" })}>
              {" "}Channel Transactions
            </Button>
            <Button onClick={() => this.setState({ page: "closwe" })}>
              {" "}Close Channel
            </Button>
          </Content>}
        {page === "transactions" &&
          <Content>
            <h3>Your purchases:</h3>
            {purchases && purchases.map((item, i) =>
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
            <h3>This is your private key.</h3>
            <p>
              In IOTA this is known as your seed. This is used to sign a multi-signature wallet between you and
              SatoshiPay. If you loose it, you are unable to use the wallet. So keep it safe! 
            </p>
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
