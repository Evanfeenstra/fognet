import React, { Component } from 'react';
import { Iota } from './iota'
import * as utils from './utils'
import Worker from './iota.worker.js';
import Channel from './channel'

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
      .then(()=>{
        this.getAddresses(10)
      })
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

  webRequest = async (url) => {
    console.log(transfer)
    if(!this.state.requestingWeb){
      this.setState({requestingWeb:true})
      console.log('WEB REQ')
      try {
        const opts = {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify({
            id: userID,
            url: url
          })
        }
        const t = await utils.API('fognet', url)
        this.setState({requestingWeb:false})
        return t
      } catch (error) {
        console.error(error)
        this.setState({requestingWeb:false})
        return error
      }
    }
  }

  initializeFlashChannel = async () => {
    console.log('init flahs')
    Channel.initialize(this.state.seed)
  }

  fundFlashChannel = async () => {
    console.log('fund flahs channel')
  }

  prepareTransfers = async (transfers) => {
    try {
      const t = await Iota.prepareTransfers(this.state.seed, transfers)
      console.log(t)
      return t
    } catch (error) {
      console.error(error)
      return error
    }
    /*async function createBundle (amount, address, message, tag) {
      return new Promise(
        function (resolve, reject) {
          if (!message || message === '') {
            // take from config if empty
            message = iota.utils.toTrytes(config.message)
          }
          else {
            if (!iota.valid.isTrytes(message)) {
              message = iota.utils.toTrytes(message)
            }
          }
          if (!tag || tag === '' || !iota.valid.isTrytes(tag, 27)) {
            tag = config.tag
          }
          var transfersArray = [{ 'address': address, 'value': amount, message: message, tag: tag}]
          console.log(transfersArray)
          iota.api.prepareTransfers(seed, transfersArray, function (error, success) {
            if (error) {
              reject(error)
            }
            else {
              resolve(success)
            }
          })
        }
      )
      }*/

  }

  sendTrytes = async (bundle) => {
    try {
      const t = await Iota.sendTrytes(bundle, 5, 14)
      console.log(t)
      return t
    } catch (error) {
      console.error(error)
      return error
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
      prepareTransfers: this.prepareTransfers,
      sendTrytes: this.sendTrytes,
      initializeFlashChannel: this.initializeFlashChannel,
      fundFlashChannel: this.fundFlashChannel,
      webRequest: this.webRequest
    }
    return (React.isValidElement(children) ?
      React.cloneElement(children,
      { ...childProps }
    ) : null)
  }

}

export default Wallet
