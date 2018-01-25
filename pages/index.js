import React, {Component} from "react"
import styled from "styled-components"
import IotaProvider from '../react-iota'
import Wallet from '../components/wallet'
import Browser from '../components/browser'

class A extends Component {

  constructor(){
    super()
    this.state={
      initialized:null, // 'demo' or 'BLE'
      flashFund:0,
      spend:0,
      spendConfirmed:true,
      totalSpent:0,
      spendError:null
    }
  }

  onFundFlash = (userId, stake) => {
    this.setState({flashFund: this.state.flashFund + stake})
  }

  onSpend = (spend) => {
    console.log("SPEND", spend)
    this.setState({spendConfirmed:false,spendError:null})
    if(this.state.flashFund > spend){
      this.setState({spend})
    } else {
      this.onError('Not enough flash funds.')
    }
  }

  onConfirmSpend = (spend) => {
    console.log("CONFIRM",spend)
    this.setState({spend:0})
    if(spend){
      this.setState({spendConfirmed:true,totalSpent:this.state.totalSpent+spend})
    } else {
      this.onError('Flash channel error.')
    }
  }

  onError = (spendError) => {
    this.setState({spendError})
    setTimeout(()=>{
      this.setState({spendError:null})
    },3000)
  }

  render(){
    const {spend, amount, flashFund, initialized, spendConfirmed, totalSpent, spendError} = this.state
    return (<App>
      {!initialized && <Intro>
        <Buttonz>
          <Button onClick={()=>this.setState({initialized:'demo'})}>Start Web Demo</Button>
          <Button onClick={()=>this.setState({initialized:'BLE'})}>Start Bluetooth</Button>
        </Buttonz>
        <iframe src="https://player.vimeo.com/video/252654479" width="480" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
        <Wordz>
          To run IOTA and Proof of Work in a background thread, please enable <strong>Experimental Canvas Features</strong> in <strong>chrome://flags</strong> and restart Chrome.
        </Wordz>
      </Intro>}
      {initialized && <IotaProvider onFundFlash={this.onFundFlash} spend={spend} 
        onConfirmSpend={this.onConfirmSpend}>
        <Wallet />
      </IotaProvider>}
      {initialized && <Browser flashFund={flashFund} spend={spend}
        spendConfirmed={spendConfirmed} totalSpent={totalSpent}
        initialized={initialized} spendError={spendError} 
        onSpend={this.onSpend} />}
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
  margin-left:37px;
`
