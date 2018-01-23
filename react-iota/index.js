import React, { Component } from 'react';
import { Iota } from './iota'
import * as utils from './utils'
import Worker from './iota.worker.js';
import Channel from './channel'
import Presets from './config'

class IotaProvider extends Component {

  constructor(){
    super()
    this.state={
      seed:null,
      gettingBalance:false,
      balanceInputs:[],
      balance:null,
      gettingAddresses:false,
      addresses:null,
      fundingAddressFromTestnet:null,
      initializingFlash:false,
      fundingFlash:false,
      flash:null
    }
  }

  componentWillMount(){
    if(utils.isClient){
      Iota.initWorker()
      this.checkForFlashState()
    }
  }

  componentWillReceiveProps(newProps){
    if(newProps.spend && newProps.spend !== 0 && newProps.spend !== this.props.spend){
      this.purchase(newProps.spend)
    }
  }

  purchase = async (flashSpent) => {
    console.log('purchase')
    var flashTransfer = await Channel.composeTransfer(
      flashSpent - this.props.spend,
      Presets.ADDRESS,
    )
    if(flashTransfer){
      this.setState({flashSpent})
      this.props.onConfirmSpend(flashSpent)
    } else {
      this.props.onConfirmSpend(null)
    }
    
  }

  checkForFlashState = async () => {
    if(localStorage.getItem('flash-state')){
      localStorage.clear()
      /*const flash = await this.initializeFlashChannel()
      if(flash.channel.balance, this.props.onFundFlash){
        this.props.onFundFlash(flash.userID, flash.channel.balance)
      }*/
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
        this.setState({creatingRandom:false, randomTestnetSeed:true})
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
        throw error
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
        throw error
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
        throw error
      }
    }
  }

  sendTransfer = async (address, amount) => {
    if(!this.state.sendingTransfer){
      this.setState({sendingTransfer:true})
      console.log('SEND TRANSFER')
      try {
        const t = await Iota.sendTransfer(this.state.seed, [{
          address, value: amount
        }])
        this.setState({sendingTransfer:false})
        return t
      } catch (error) {
        console.error(error)
        this.setState({sendingTransfer:false})
        throw error
      }
    }
  }

  initializeFlashChannel = async (fundAmount) => {
    if(!this.state.initializingFlash){
      this.setState({initializingFlash:true})
      try {
        const f = await Channel.initialize(this.state.seed, fundAmount)
        this.setState({initializingFlash:false, flash:f})
        return f
      } catch (error) {
        console.error(error)
        this.setState({initializingFlash:false, flash:null})
        throw error
      }
    }
  }

  fundFlashChannel = async (address, amount) => {
    console.log('fund flash channel',amount)
    if(!this.state.fundingFlash){
      this.setState({fundingFlash:true})
      try {
        const {flash, fundAmount, randomTestnetSeed} = this.state
        let transactions
        if(randomTestnetSeed){
          console.log('use seeds.tangle.works to fund flash channel')
          transactions = await Iota.fundFromTestnet(address, amount)
        } else {
          transactions = await this.sendTransfer(address, amount)
        }
        const stake = transactions[0].value
        console.log('stake', stake)
        flash.channel.deposit = [stake, 0]
        flash.channel.balance = stake
        this.setState({fundingFlash:false, flash, balance:this.state.balance-stake})
        Channel.setLocalState(flash)
        if(this.props.onFundFlash){
          this.props.onFundFlash(flash.userID, stake)
        }
        return transactions
      } catch (error) {
        console.error(error)
        this.setState({fundingFlash:false})
        throw error
      }
    }
  }

  closeFlashChannel = async () => {
    console.log('CLOSE')
    if(!this.state.closingFlash){
      this.setState({fundingFlash:true})
      try {
        const c = await Channel.close()
        console.log(c)
        this.setState({closingFlash:false})
        return c
      } catch (error) {
        console.error(error)
        this.setState({closingFlash:false})
        throw error
      }
    }
  }

  prepareTransfers = async (transfers) => {
    try {
      const t = await Iota.prepareTransfers(this.state.seed, transfers)
      console.log(t)
      return t
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  sendTrytes = async (bundle) => {
    try {
      const t = await Iota.sendTrytes(bundle, 5, 14)
      console.log(t)
      return t
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  render() {
    const {children} = this.props
    const childProps = {
      iota: this.state,
      actions: {
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
        closeFlashChannel: this.closeFlashChannel
      },
      utils: utils,
    }
    return (React.isValidElement(children) ?
      React.cloneElement(children,
      { ...childProps }
    ) : null)
  }

}

export default IotaProvider
