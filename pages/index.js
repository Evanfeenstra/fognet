import React, {Component} from "react"
import styled from "styled-components"
import Wallet from '../react-iota/Wallet'
import FAB from "../components/wallet"
import Pet from '../components/pet'
import Browser from '../components/browser'

class A extends Component {

  constructor(){
    super()
    this.state={
      initialized:null, // demo or BLE
      flashFund:0,
      spend:0,
      spendConfirmed:true,
      totalSpent:0
    }
  }

  onFundFlash = (userId, stake) => {
    this.setState({flashFund: this.state.flashFund + stake})
  }

  onSpend = (spend) => {
    console.log("SPEND", spend)
    this.setState({spendConfirmed:false})
    if(this.state.flashFund > spend){
      this.setState({spend})
    }
  }

  onConfirmSpend = (spend) => {
    console.log("CONFIRM",spend)
    this.setState({spend:0})
    if(spend){
      this.setState({spendConfirmed:true,totalSpent:this.state.totalSpent+spend})
    }
  }

  render(){
    const {initialized} = this.state
    return (<App>
      {!initialized && <Intro>
        <Buttonz>
          <Button onClick={()=>this.setState({initialized:'demo'})}>Start Web Demo</Button>
          <Button onClick={()=>this.setState({initialized:'BLE'})}>Start Bluetooth</Button>
        </Buttonz>
        <Wordz>
          Please enable <strong>Experimental Canvas Features</strong> in <strong>chrome://flags</strong> in order to perform Proof of Work in a background thread for a smoother experience.
        </Wordz>
      </Intro>}
      {initialized && <Wallet onFundFlash={this.onFundFlash} spend={this.state.spend} 
        amount={this.state.amount} onConfirmSpend={this.onConfirmSpend}>
        <Pet />
      </Wallet>}
      {initialized && <Browser flashFund={this.state.flashFund} 
        onSpend={this.onSpend} spend={this.state.spend}
        spendConfirmed={this.state.spendConfirmed}
        totalSpent={this.state.totalSpent} 
        initialized={initialized} />}
    </App>)
  }
  
}

export default A

const App = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  min-height: 100vh;
  background: linear-gradient(135deg, #00646d 4%, #411cce);
  background-size: cover;
  padding-top:50px;
`
const Button = styled.div`
  color: white;
  border: 2px solid white;
  width:200px;
  height:50px;
  margin:20px;
  display:flex;
  align-items:center;
  justify-content:center;
  transition: all .15s ease-in-out;
  cursor: pointer;
  touch-action: manipulation;
  white-space: nowrap;
  user-select: none;
  -webkit-user-select: none;
  font-size: 18px;
  letter-spacing: .03em;
  overflow: hidden;
  &:hover{
    background:teal;
  }
  font-weight:bold;
`
const Intro = styled.div`
  width:100%;
  display:flex;
  align-items:center;
  justify-content: space-between;
  flex-direction: column;
`
const Buttonz = styled.div`
  display:flex;
  align-items:center;
`
const Wordz = styled.div`
  color:white;
  width:530px;
  margin-bottom:100px;
`
