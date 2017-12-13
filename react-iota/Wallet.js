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
      balanceInputs:[],
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

  login = (seed) => {
    this.setState({seed}, () => {
      this.getBalance()
    })
  }

  createRandom = () => {
    if(!this.state.creatingRandom){
      this.setState({creatingRandom:true})
      const seed = utils.seedGen(81)
      this.setState({seed}, async () => {
        const a = await this.getAddresses(10)
        this.setState({addresses:a})
        await this.fundFromTestnet(a[0], 420)
        this.setState({creatingRandom:false})
      })
    }
  }

  fundFromTestnet = async (address, amount) => {
    if(!this.state.fundingAddressFromTestnet){
      this.setState({fundingAddressFromTestnet: address})
      try {
        const r = await Iota.fundFromTestnet(address, amount)
        const addy = r[0].address
        const balanceInputs = [...this.state.balanceInputs]
        const input = balanceInputs && balanceInputs.find(bi=>addy.includes(bi.address))
        if(input && input.balance){
          input.balance += amount
        } else {
          balanceInputs[r[0].currentIndex] = {
            address:addy, balance:r[0].value, keyIndex:r[0].currentIndex
          }
        }
        let balance = this.state.balance || 0
        balance += amount
        this.setState({fundingAddressFromTestnet:null, balance, balanceInputs})
        return r
      } catch (error) {
        console.error(error)
        this.setState({fundingAddressFromTestnet:null})
        return error
      }
    }
  }

  getBalance = async () => {
    if(!this.state.gettingBalance){
      this.setState({balance:null, gettingBalance:true})
      console.log('GET BALANCE')
      try {
        const r = await Iota.getBalance(this.state.seed)
        this.setState({balance:r.totalBalance, gettingBalance:false, balanceInputs:r.inputs})
        return r
      } catch (error) {
        console.error(error)
        this.setState({gettingBalance:false})
        return error
      }
    }
  }

  getAddresses = async (num, startingIndex) => {
    if(!this.state.gettingAddresses){
      this.setState({gettingAddresses:true})
      console.log('GET ADDRESSES')
      try {
        const a = await Iota.createAddresses(this.state.seed, num, startingIndex)
        const addys = this.state.addresses || []
        this.setState({addresses:addys.concat(a), gettingAddresses:false})
        return a
      } catch (error) {
        console.error(error)
        this.setState({gettingAddresses:false})
        return error
      }
    }
  }

  sendTransfer = async (transfer) => {
    console.log(transfer)
    if(!this.state.sendingTransfer){
      this.setState({sendingTransfer:true})
      console.log('SEND TRANSFER')
      try {
        const t = await Iota.sendTransfer(this.state.seed, transfer)
        this.setState({sendingTransfer:false})
        return t
      } catch (error) {
        console.error(error)
        this.setState({sendingTransfer:false})
        return error
      }
    }
  }

  /*sendIota = (amount, address, message, tag) => {
    this.setState({sendingIota:true})
    this.iota.createBundle(this.props.seed, amount, address, message, tag)
    .then((b)=>this.iota.isCorrectBundle(b))
    .then((b)=>this.iota.attachBundle(b))
    .then((r)=>{
      console.log(r)
      this.setState({sendingIota:false})
    })
  }*/

  render() {
    const {children} = this.props
    const childProps = {
      ...this.state,
      utils: utils,
      login: this.login,
      createRandom: this.createRandom,
      getBalance: this.getBalance,
      getAddresses: this.getAddresses,
      sendTransfer: this.sendTransfer,
      fundFromTestnet: this.fundFromTestnet,
    }
    return (React.isValidElement(children) ?
      React.cloneElement(children,
      { ...childProps }
    ) : null)
  }

}

export default Wallet
