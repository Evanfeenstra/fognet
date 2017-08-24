import React from "react"
import styled, { css } from "styled-components"
import { Reducer } from "../../libs/utils"
import Channel from "../../libs/channel"
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
  state = { page: "home", loading: false, channel: {} }

  async componentDidMount() {
    const state = await store.get("state")
    if (state && state.closed) this.setState({ page: "closed" })
    this.setState({
      channel: state,
      purchases: await store.get("purchases")
    })
  }

  fund = async () => {
    const state = await store.get("state")
    var funded = true
    // var funded = await Channel.close(state.flash.root.address)

    state.flash.deposit = [400,0]
    state.flash.balance = 400

    if(funded) {
      store.set("state", { ...state, funded: true })
      this.setState({ channel: {...state, funded: true}})      
    } else {
      alert("There was an error funding your channel.")
    }
  }


  close = async () => {
    this.setState({ page: "loading" }, async () => {
      const state = await store.get("state")
      var item = await Channel.close()
      
      store.set("state", { ...state, closed: true, final: item })
      this.setState({ page: "closed", loading: false, channel: {...state, final: item}})
    })
  }

  reset = async () => {
    store.set("state", null)
    store.set("purchases", null)
    this.setState({
      page: "home",
      loading: false,
      channel: {funded: false}
    })

    Channel.initialize()
  }

  render() {
    var { page, channel, loading, final } = this.state
    var { purchases } = this.props
    return (
      <Wallet {...this.props}>
        <Header>
          <div>You have {Reducer(this.props.balance)} IOTA</div>{" "}
          {page !== "home" && page !== "loading"
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
              This is a Proof-of-Concept of the SatoshiPay micropayment system. The 
              IOTA wallet used in this demo is working on the mainnet and is using
              Flash Channels to pay for confirm payment in realtime.
            </p>
            <p>
              While the tokens are real, you will not be able to withdraw them.
            </p>
            {loading
              ? <Spinner src={"/static/icons/loading-dark.svg"} />
              : <div>
                  {channel && !channel.funded ? <Button onClick={() => this.fund()}>Fund the Channel</Button>: <p>
                    Channel is now funded with 400 IOTA. Enough to demonstrate the Flash Channels.
                  </p>}
                  <Button
                    onClick={() => this.setState({ page: "transactions" })}
                  >
                    {" "}Channel Transactions
                  </Button>
                  <Button onClick={() => this.close()}> Close Channel</Button>
                </div>}
          </Content>}
        {page === "loading" &&
          <Content>
            <h3>Closing and attaching channel</h3>
            <p>
              Please leave the window open until the loading icon disappears. This can take upto 3min.
            </p>
            <Spinner src={"/static/icons/loading-dark.svg"} />
          </Content>}
        {page === "transactions" &&
          <Content>
            <h3>Your purchases:</h3>
            {purchases &&
              purchases.map((item, i) =>
                <Item key={i}>
                  <span>
                    {Reducer(item.value)} purchase
                  </span>
                  <span>
                    {item.id}
                  </span>
                </Item>
              )}
          </Content>}
        {page === "backup" &&
          <Content>
            <h3>This is your private key.</h3>
            <p>
              In IOTA this is known as your seed. This is used to sign a
              multi-signature wallet between you and SatoshiPay. If you loose
              it, you are unable to use the wallet. So keep it safe!
            </p>
            <Seed>
              {channel.userSeed}
            </Seed>
          </Content>}
        {page === "closed" &&
          <Content>
            <h3>The channel has been closed!</h3>
            <p>Thank you for using the SatoshiPay demo of Flash channels.</p>
            <p>
              Your bundle has been attached. You can view it's status here on a
              tangle explorer.
            </p>
            {channel && channel.final ? <Bundle target={`_blank`} href={`https://tanglertestnet.codebuffet.co/search/?kind=transaction&hash=` + channel.final[0][0].hash}>View Transaction</Bundle> : null}
            <Button onClick={() => this.reset()}>Reset the demo</Button>
          </Content>}
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
  border-bottom: 1px solid rgba(0, 0, 0, .4);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
