import React from "react"
import styled, { css } from "styled-components"
import { Reducer } from "../../libs/utils"
import Channel from "../../libs/channel"
import Presets from "../../libs/presets"
import { fund } from "../../libs/iota"

const Show = props => {}

const Wallet = styled.div`
  position: fixed;
  top: 0px;
  bottom: 0px;
  right: 0px;
  width: 100%;
  max-width: 27rem;
  background: whitesmoke;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  z-index: 30;
  transform: translateX(${props => (props.drawerOpen ? "0%" : "100%")});
  transition: all 0.4s ease;
  box-sizing: border-box;
  @media screen and (max-width: 640px) {
    width: 100%;
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
  padding: 0.5rem 1.3rem;
  margin-bottom: 1rem;
  &:active {
    outline: none;
  }
  &:focus {
    outline: none;
  }
`
const Reset = Button.extend`
  position: fixed;
  bottom: 10px;
  width: 90%;
  left: 5%;
  background: none;
  color: rgba(255, 130, 0, 1);
`
const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  text-align: left;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 2vw;
  word-wrap: break-word;
`

const Seed = styled.h3`
  word-wrap: break-word;
  width: 15rem;
  text-align: left;
`

export default class extends React.Component {
  state = {
    page: "home",
    loading: false,
    channel: { funded: false },
    message: `Closing and attaching channel`
  }

  async componentDidMount() {
    console.log('WALLET MOUNT')
    console.log(store.get('purchases'))
    const state = await store.get("state")
    if (state && state.closed) this.setState({ page: "closed" })
    this.setState({
      channel: state,
      purchases: await store.get("purchases")
    })
  }

  fund = async () => {
    const state = await store.get("state")
    if (!state.flash.root)
      return alert(
        `Please wait a few more seconds for the wallet to initialise`
      )

    this.setState(
      { page: "loading", message: "Funding the channel!" },
      async () => {
        console.log("NOW FUND ADDY", state.flash.root.address)
        var funded = await fund(state.flash.root.address)

        console.log("Funded!", funded)
        state.flash.deposit = [400, 0]
        state.flash.balance = 400

        if (funded) {
          this.props.updateState({ ...state, funded: true })
          store.set("state", { ...state, funded: true })
          this.setState({ channel: { ...state, funded: true }, page: "home" })
        } else {
          alert("There was an error funding your channel.")
        }
      }
    )
  }

  close = async () => {
    this.setState({ page: "loading" }, async () => {
      const state = await store.get("state")
      var item = await Channel.close()

      store.set("state", { ...state, closed: true, final: item, funded: false })
      this.setState({
        page: "closed",
        loading: false,
        channel: { ...state, funded: false, final: item }
      })
    })
  }

  clear = async () => {
    store.set("state", null)
    store.set("purchases", null)
    this.setState({
      page: "home",
      loading: false,
      channel: { funded: false }
    })
    this.props.updateState(null)
    this.props.toggle()

    Channel.initialize()
  }

  reset = () => {
    this.setState({ page: "loading" }, async () => {
      this.clear()
    })
  }

  render() {
    var { page, channel, loading, final, message } = this.state
    if (!channel) var channel = { funded: false }
    var { purchases } = this.props
    return (
      <Wallet {...this.props}>
        <Header>
          <div>You have {Reducer(this.props.balance)} IOTA</div>{" "}
          {page !== "home" && (page !== "closed" && page !== "loading") ? (
            <Closed
              style={{ height: 30, width: 30 }}
              onClick={() => this.setState({ page: "home" })}
              src={"/static/icons/back.svg"}
            />
          ) : (
            <Closed
              onClick={() => this.props.toggle()}
              src={"/static/icons/multiply.svg"}
            />
          )}
        </Header>
        {page === "home" && (
          <Content>
            <h3>Welcome to the Satoshipay IOTA Demo</h3>
            <p>
              This is a Proof-of-Concept of the SatoshiPay micropayment system.
              The IOTA wallet used in this demo is working on the testnet and is
              using Flash Channels to pay for confirm payment in realtime.
            </p>
            {loading ? (
              <Spinner src={"/static/icons/loading-dark.svg"} />
            ) : (
              <div>
                {!channel.funded ? (
                  <Button onClick={() => this.fund()}>Fund the Channel</Button>
                ) : (
                  <p>
                    <strong>
                      Channel is now funded with 400 IOTA. Enough to demonstrate
                      the Flash Channels.
                    </strong>
                  </p>
                )}
                <Button onClick={() => this.setState({ page: "transactions" })}>
                  {" "}
                  Channel Transactions
                </Button>
                {channel.funded && (
                  <Button onClick={() => this.close()}> Close Channel</Button>
                )}
                <Reset onClick={() => this.reset()}>Reset the demo</Reset>
              </div>
            )}
          </Content>
        )}
        {page === "loading" && (
          <Content>
            <h3>{message}</h3>
            <p>
              You are now computing Proof of Work. This shouldn't take more than
              15 seconds.
            </p>
            <Spinner src={"/static/icons/loading-dark.svg"} />
          </Content>
        )}
        {page === "transactions" && (
          <Content>
            <h3>Your purchases:</h3>
            {purchases &&
              purchases.map((item, i) => (
                <Item key={i}>
                  {console.log(item)}
                  <Row>
                    <span>{Reducer(item.value)} purchase</span>
                    <span>{item.id}</span>
                  </Row>
                  <Row>
                    <span>
                      Tx Hash: {item.bundles[0][0].bundle.substring(0, 8)}...
                    </span>
                    <span>Timestamp: {item.bundles[0][0].timestamp}</span>
                  </Row>
                </Item>
              ))}
          </Content>
        )}
        {page === "backup" && (
          <Content>
            <h3>This is your private key.</h3>
            <p>
              In IOTA this is known as your seed. This is used to sign a
              multi-signature wallet between you and SatoshiPay. If you loose
              it, you are unable to use the wallet. So keep it safe!
            </p>
            <Seed>{channel.userSeed}</Seed>
          </Content>
        )}
        {page === "closed" && (
          <Content>
            <h3>The channel has been closed!</h3>
            <p>Thank you for using the SatoshiPay demo of Flash channels.</p>
            <p>
              Your bundle has been attached. You can view it's status here on a
              tangle explorer.
            </p>
            {channel && channel.final ? (
              <Bundle
                target={`_blank`}
                href={
                  (Presets.PROD
                    ? `https://thetangle.org/bundle/`
                    : `https://explorer.tangle.works/#/addr/`) +
                  channel.final[0][0].address
                }
              >
                View Transaction
              </Bundle>
            ) : null}
            <Button onClick={() => this.reset()}>Reset the demo</Button>
          </Content>
        )}
      </Wallet>
    )
  }
}

const Spinner = styled.img`
  height: 4rem;
  width: 4rem;
  margin: 0 auto;
`

const Bundle = styled.a`
  text-decoration: none;
  font-weight: 600;
  margin: 1rem 0;
`

const Item = styled.div`
  width: 90%;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const Row = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 5px;
`
