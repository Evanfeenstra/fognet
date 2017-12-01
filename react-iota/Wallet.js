import React, { Component } from 'react';
import { Iota, isClient } from './iota'
import { seedGen } from './utils'
import Worker from './iota.worker.js';


class Wallet extends Component {

  constructor(){
    super()
    this.state={
      seed:null,
      gettingBalance:false,
      balanceInputs:null,
      balance:null,
      gettingAddresses:false,
      addresses:null,
    }
  }

  componentWillMount(){
    if(isClient){
      Iota.initWorker()
    }
  }

  createRandom = () => {
    const seed = seedGen(81)
    console.log(seed)
    this.setState({seed}, ()=>{
      this.getBalance(seed)
    })
  }

  getBalance = async () => {
    this.setState({balance:null, gettingBalance:true})
    Iota.getBalance(this.state.seed)
    .then(r=>{
      this.setState({balance:r.totalBalance, gettingBalance:false, balanceInputs:r.inputs})
    })
  }

  getAddresses = () => {
    this.setState({gettingAddresses:true})
    Iota.createAddresses(this.state.seed, 10)
    .then(a=>{
      console.log(a)
      this.setState({addresses:a, gettingAddresses:false})
    })
  }

  sendIota = (amount, address, message, tag) => {
    this.setState({sendingIota:true})
    this.iota.createBundle(this.props.seed, amount, address, message, tag)
    .then((b)=>this.iota.isCorrectBundle(b))
    .then((b)=>this.iota.attachBundle(b))
    .then((r)=>{
      console.log(r)
      this.setState({sendingIota:false})
    })
  }

  render() {
    const {children} = this.props
    const childProps = {
      ...this.state,
      createRandom: this.createRandom,
      getBalance: this.getBalance,
      getAddresses: this.getAddresses,
      sendIota: this.sendIota,
    }
    return (React.isValidElement(children) ?
      React.cloneElement(children,
      { ...childProps }
    ) : null)
  }

}

export default Wallet
