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

  fundFlashChannel = async () => {
    const {fundAmount} = this.state
    const {actions, iota} = this.props
    if(iota.balance >= fundAmount){
      const flash = await actions.initializeFlashChannel(fundAmount)
      console.log("returned",flash)
      const t = await actions.fundFlashChannel(
        flash.channel.root.address, parseInt(fundAmount)
      )
      this.setState({fundAmount:''})
    }
  }

  render(){
    const {iota, show, actions, utils} = this.props
    const {userId, fundAmount} = this.state
    const {flash, initializingFlash, fundingFlash, flashSpent, closingFlash} = iota
    const spent = flashSpent || 0
    const isBalance = flash && flash.channel && flash.channel.balance

    return <Flash show={show} isBalance={isBalance}>
      {isBalance ? <WrapInfo>
        <Info>Stake in Flash Channel: {utils.reducer(flash.channel.balance - spent)}</Info>
        {/*<Button title="Close" size="tiny" margin="7px 13px" width="42px" 
          onClick={actions.closeFlashChannel} active={closingFlash} />*/}
      </WrapInfo> : <Info>
        Stake iota in a Flash channel to make instant payments.
      </Info>}
      <Content>
        <Wrap>
          <Input type="text" label="Fund Channel"
            onChange={(e)=>this.setState({fundAmount: utils.validAmount(e.target.value)})}
            value={fundAmount}
            width="50%" />
          <Button title="Commit" active={initializingFlash || fundingFlash}
            onClick={this.fundFlashChannel} margin="7px 0 7px 14px"
            disabled={!this.state.fundAmount ||
              parseInt(this.state.fundAmount)>iota.balance} />
        </Wrap>
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
  border-top:1px solid ${p=> p.isBalance ? 'white' : 'transparent'};
  background:#140061;
  z-index:99;
  background:##140061;
  transition: all .12s ease-in-out;
  transform: translateY(${p=> p.show ? '0px' : '-131px'});
  display:flex;
  flex-direction:column;
  justify-content:space-between;
`
const Info = styled.div`
  margin:15px;
  font-size:11px;
`
const Content = styled.div`
  padding:8px 16px;
`
const Wrap = styled.div`
  display:flex;
`
const WrapInfo = styled.div`
  display:flex;
  align-items:center;
`

