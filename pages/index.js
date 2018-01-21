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
    return (<App>
      <FAB />
      <Wallet onFundFlash={this.onFundFlash} spend={this.state.spend} 
        amount={this.state.amount} onConfirmSpend={this.onConfirmSpend}>
        <Pet />
      </Wallet>
      <Browser flashFund={this.state.flashFund} 
        onSpend={this.onSpend} spend={this.state.spend}
        spendConfirmed={this.state.spendConfirmed}
        totalSpent={this.state.totalSpent} />
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
