import React, { Component } from 'react';
import { Iota } from './iota'
import * as utils from './utils'
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
      fundingAddressFromTestnet:null
    }
  }

  componentWillMount(){
    if(utils.isClient){
      Iota.initWorker()
    }
  }

  createRandom = () => {
    const seed = '9XRIFNSYV9LRLKFUGXVVZHNQURAGKL9IJDCZOMLHEHGQKERFGOAAAT9TQELRRIWCUCJMPYAVFFBSDBPER'
    //const seed = seedGen(81)
    this.setState({seed}, ()=>{
      this.getBalance(seed)
    })
  }

  fundFromTestnet = (address) => {
    if(!this.state.fundingAddressFromTestnet){
      this.setState({fundingAddressFromTestnet: address})
      Iota.fundFromTestnet(address)
      .then(r=>{
        console.log('SENT FROM TESTNET!!!!', r)
        this.setState({fundingAddressFromTestnet:null})
      })
      .catch(e=>{
        this.setState({fundingAddressFromTestnet:null})
        console.error(e)
      })
    }
  }

  getBalance = () => {
    if(!this.state.gettingBalance){
      this.setState({balance:null, gettingBalance:true})
      console.log('GET BALANCE', this.state.seed)
      Iota.getBalance(this.state.seed)
      .then(r=>{
        this.setState({balance:r.totalBalance, gettingBalance:false, balanceInputs:r.inputs})
      })
      .catch(e=>{
        this.setState({gettingBalance:false})
        console.error(e)
      })
    }
  }

  getAddresses = () => {
    if(!this.state.gettingAddresses){
      this.setState({gettingAddresses:true})
      console.log('GET ADDRESSES')
      Iota.createAddresses(this.state.seed, 10)
      .then(a=>{
        console.log(a)
        this.setState({addresses:a, gettingAddresses:false})
      })
      .catch(e=>{
        this.setState({gettingAddresses:false})
        console.error(e)
      })
    }
    
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
      utils: utils,
      createRandom: this.createRandom,
      getBalance: this.getBalance,
      getAddresses: this.getAddresses,
      sendIota: this.sendIota,
      fundFromTestnet: this.fundFromTestnet,
    }
    return (React.isValidElement(children) ?
      React.cloneElement(children,
      { ...childProps }
    ) : null)
  }

}

export default Wallet
