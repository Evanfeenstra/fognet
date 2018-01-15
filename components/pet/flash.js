import React, { Component } from 'react';
import styled from 'styled-components'
import Input from './comps/input'
import Button from './comps/button'

export default class F extends Component {

  constructor(){
    super()
    this.state={
      fundAmount:'',
      userId:null,
    }
  }

  /*
    NEED TO INITIALIZE AND FUND AT THE SAME TIME?
    Right now the server automatically creates a record of 400 iota
    in the flash channel. Need to pass that data in
  */

  componentWillMount(){
    //this.props.initializeFlashChannel()
    //localStorage.clear()
    if(localStorage.getItem('flash-state')){
      this.props.actions.initializeFlashChannel()
    }
  }

  // connectToFlashChannel = async () => {
  //   const state = await 
  // }

  fundFlashChannel = async () => {
    const {fundAmount} = this.state
    const {actions, iota} = this.props
    const {flash} = iota
    const transactions = await actions.fundFlashChannel(
      flash.channel.root.address, parseInt(fundAmount)
    )
    this.setState({fundAmount:''})
    // const stake = transactions[0].value
    // console.log('stake', stake)
    // flash.deposit = [stake, 0]
    // flash.balance = stake
    // this.setState({flash})
  }

  // SEND A TRANSFER TO THE FLASH CHANNEL TO FUND
  // set "fundingFlash to true on Wallet"

  /*fund = async () => {
    this.setState(
      { page: "loading", message: "Funding the channel!" },
      async () => {
        console.log("NOW FUND ADDY", state.flash.root.address)
        console.log(state.flash.root.address)
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
  }*/

  render(){
    const {iota, show, actions, utils} = this.props
    const {userId, fundAmount} = this.state
    const {flash, initializingFlash, fundingFlash} = iota
    return <Flash show={show} flash={flash}>
      <Content>
        {!flash && <Button title="Connect to Flash Channel" 
          active={initializingFlash}
          onClick={actions.initializeFlashChannel}
        />}
        {flash && <Wrap>
          <Input type="text" label="Fund Channel"
            onChange={(e)=>this.setState({fundAmount: utils.validAmount(e.target.value)})}
            value={fundAmount}
            width="50%" />
          <Button title="Commit" active={fundingFlash}
            onClick={this.fundFlashChannel} margin="7px 0 7px 14px"
            disabled={!this.state.fundAmount} />
        </Wrap>}
      </Content>
    </Flash>
  }
}

const Flash = styled.div`
  position:absolute;
  height:128px;
  width:100%;
  top:42px;
  left:0;
  border-bottom:1px solid white;
  border-top:1px solid ${p=> p.flash ? 'white' : 'transparent'};
  background:#140061;
  z-index:99;
  background:##140061;
  transition: all .12s ease-in-out;
  transform: translateY(${p=> p.show ? '0px' : '-130px'});
  display:flex;
  flex-direction:column;
  justify-content:flex-end;
`
const Content = styled.div`
  padding:8px 16px;
`
const Wrap = styled.div`
  display:flex;
  flex:1;
`

