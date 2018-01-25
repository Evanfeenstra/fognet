import React, { Component } from 'react';
import styled from 'styled-components'
import Receive from './receive'
import Send from './send'
import Input from './comps/input'
import Button from './comps/button'
import Flash from './flash'

/*

FUMFHAPNIEHJFPIXMWPIAJJSFSPTBOOBPOJQGCQMJSOLOCZWHTIIFPOWKIAFYTHTFGLNOWMXIPKFNYPPR

*/

export default class Pet extends Component {

  constructor(){
    super()
    this.state={
      mode:null,
      flash:false,
      seedInput:'',
    }
  }

  render() {
    const {iota, actions, utils} = this.props
    const {balance, addresses, creatingRandom, gettingBalance, gettingAddresses} = iota
    const isConnected = balance || balance===0
    let {mode, flash} = this.state

    //mode = mode === 'receive' && !addresses ? null : mode
    return (<Wallet>
      <Content>

        {!isConnected && <Button title="Random Seed"
          disabled={gettingBalance}
          active={creatingRandom} margin="12px"
          onClick={()=>actions.createRandom()} />}

        {!isConnected && <Seed>
          <Input label="Enter Seed" width="50%"
            value={this.state.seedInput}
            onChange={(e)=>this.setState({seedInput:utils.validSeed(e.target.value)})}
             />
          <Button title="Login" margin="7px 0 7px 14px"
            disabled={!this.state.seedInput || creatingRandom} active={gettingBalance} 
            onClick={()=>actions.login(this.state.seedInput)} />
        </Seed>}

        {isConnected && <Header mode={mode}>
          <Balance>Balance:&nbsp;&nbsp;{utils.reducer(balance)}&nbsp;</Balance>
          <div>
            <HeaderFab show={mode||flash} onClick={()=>{
              this.setState({mode:null,flash:null})
            }}>
              <X style={{width:12, height:20, stroke:'white'}} />
            </HeaderFab>
            <HeaderFab show
              lineHeight="33px" hideBorder mode={mode}
              onClick={()=>this.setState({flash:true,mode:null})}>
              <Lightning style={{fill:iota.flash?'#38f9d7':'white',height:18}}/>
            </HeaderFab>
          </div>
        </Header>}

        {isConnected && <Flash {...this.props} show={flash} />}

        {isConnected && <Tabs mode={mode}>

          {!mode && <Tab onClick={()=>this.setState({mode:'send'})}>
            Send
          </Tab>}
          {!mode && <Tab onClick={()=>this.setState({mode:'receive'})}>
            Receive
          </Tab>}

          <Send {...this.props} hidden={!(mode==='send')} />

          {mode==='receive' && <Receive {...this.props} />}
        </Tabs>}

      </Content>
    </Wallet>)
  }

}

const X = ({style}) => {
  return <svg style={style} viewBox="0 0 60 60">
    <path style={{strokeWidth:5, strokeLinecap: 'round'}}
      d="M 15.674663,15.572746 L 44.587629,44.485711 M 45.118838,15.420972 L 15.522889,45.016920"></path>
  </svg>
}

const Lightning = ({style}) => {
  return <svg style={style} viewBox="0 0 512 512">
    <path d="M302.7,64L143,288h95.8l-29.5,160L369,224h-95.8L302.7,64L302.7,64z"/>
  </svg>
}

const Wallet = styled.div`
  transform: scale(1.3,1.3) translateY(20px);
  width: 240px;
  border: 1px solid white;
  height: 170px;
  position: relative;
  display: flex;
  color: white;
  overflow:hidden;
  background: #140061; 
  margin-left:37px;
`//009dad

const Content = styled.div`
  display:flex;
  flex:1;
  width:100%;
  flex-direction:column;
  justify-content:space-between;
  overflow:hidden;
`

const Seed = styled.div`
  margin:0 12px;
  display:flex;
`

const Header = styled.div`
  display:flex;
  flex-direction:row;
  justify-content:space-between;
  min-height:42px;
  overflow:hidden;
  z-index:100;
  position:relative;
  background: #140061;
  &::after{
    content:"";
    background:${p=> p.mode==='flash' ? 'white' : 'transparent'};
    height:1px;
    width:100%;
    position:absolute;
    bottom:-1px;
    left:0px;
  }
`

const Balance = styled.div`
  margin-top: 13px;
  margin-left: 13px;
`

const HeaderFab = styled.div`
  transition: all .12s ease-in-out;
  transform: translateY(${p=> p.show ? '0px' : '-35px'});
  display: inline-block;
  vertical-align: top;
  margin-top:11px;
  margin-right:13px;
  font-size: 9px;
  cursor: ${p=> p.mode==='flash' ? 'default' : 'pointer'};
  pointer-events: ${p=> p.mode==='flash' ? 'none' : 'auto'};
  height: 20px;
  width: 20px;
  color: white;
  background: ${p=> p.mode==='flash' ? 'teal' : 'transparent'};
  border: 1px solid ${p=> p.hideBorder && p.mode!=='flash' ? 'transparent' : 'white'};
  border-radius: 50%;
  text-align: center;
  &:hover{
    background: teal;
    border: 1px solid white;
  }
  line-height: ${p=> p.lineHeight || 'auto'};
`

const Tabs = styled.div`
  display:flex;
  width:100%;
  border-top:1px solid white;
  transition:all 0.2s;
  max-height:${props => props.mode ? '128px' : '32px'};
  min-height:${props => props.mode ? '128px' : '32px'};
`

const Tab = styled.div`
  pointer-events: ${p=> p.active ? 'none' : 'auto'};
  position:relative;
  transition: all .15s ease-in-out;
  width: 50%;
  height: 32px;
  display: inline-block;
  text-align: center;
  line-height: 33px;
  cursor: ${p=> p.active ? 'default' : 'pointer'};
  &:first-child{
    border-right: 1px solid white;
    width: calc(50% - 1px);
  }
  &:hover{
    background: ${p=> p.active ? 'transparent' : 'teal'};
  }
  &::before{
    content:"";
    background:white;
    height:1px;
    width:100%;
    position:absolute;
    bottom:-1px;
    left:0px;
  }
`



