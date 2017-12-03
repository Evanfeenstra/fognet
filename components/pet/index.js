import React, { Component } from 'react';
import styled from 'styled-components'
import Receive from './receive'
import Send from './send'
import Input from './comps/input'
import Button from './comps/button'

/*
9XRIFNSYV9LRLKFUGXVVZHNQURAGKL9IJDCZOMLHEHGQKERFGOAAAT9TQELRRIWCUCJMPYAVFFBSDBPER
*/

export default class Pet extends Component {

  constructor(){
    super()
    this.state={
      mode:null,
      seedInput:''
    }
  }

  render() {
    const {utils, createRandom, creatingRandom, login, balance, gettingBalance, getBalance, getAddresses, addresses, gettingAddresses} = this.props
    const isConnected = balance || balance===0
    let {mode} = this.state

    mode = mode === 'receive' && gettingAddresses ? null : mode

    return (<Wallet>
      <Content>

        {!isConnected && <Button title="Random Seed"
          disabled={gettingBalance}
          active={creatingRandom} margin="12px"
          onClick={()=>createRandom()} />}

        {!isConnected && <Seed>
          <Input label="Enter Seed" width="50%"
            value={this.state.seedInput} disabled={creatingRandom}
            onChange={(e)=>this.setState({seedInput:utils.validSeed(e.target.value)})}
             />
          <Button title="Login" margin="7px 0 7px 14px"
            disabled={!this.state.seedInput} active={gettingBalance} 
            onClick={()=>login(this.state.seedInput)} />
        </Seed>}

        {isConnected && <Header>
          <Balance>Balance:&nbsp;&nbsp;{utils.reducer(balance)}&nbsp;</Balance>
          {mode && <HeaderExit onClick={()=>this.setState({mode:null})}>
            <X style={{width:12, height:20, stroke:'white'}} />
          </HeaderExit>}
        </Header>}

        {isConnected && <Tabs mode={mode}>

          {!mode && <Tab onClick={()=>this.setState({mode:'send'})}>
            Send
          </Tab>}
          {!mode && <Tab onClick={()=>{
              this.setState({mode:'receive'})
              if(!addresses) getAddresses(10)
            }} active={gettingAddresses}>
            {!gettingAddresses ? 'Receive' :
            <Spinner src="/static/img/ajax-loader-small.gif" />}
          </Tab>}

          <Send {...this.props} hidden={!(mode==='send')} />

          {mode==='receive' && addresses && <Receive {...this.props} />}
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

const Wallet = styled.div`
  transform: scale(1.3,1.3);
  width: 240px;
  border: 1px solid white;
  margin: 58px;
  height: 170px;
  position: relative;
  display: flex;
  color: white;
`

const Content = styled.div`
  display:flex;
  flex:1;
  width:100%;
  flex-direction:column;
  justify-content:space-between;
`

const Seed = styled.div`
  margin:0 12px;
  display:flex;
`

const Spinner = styled.img`
  height: 7px;
  margin-bottom: 2px;
`

const Header = styled.div`
  display:flex;
  flex-direction:row;
  justify-content:space-between;
  min-height:42px;
`

const Balance = styled.div`
  margin-top: 13px;
  margin-left: 13px;
`

const HeaderExit = styled.div`
  transition: all .15s ease-in-out;
  margin-top:11px;
  margin-right:13px;
  font-size: 9px;
  cursor: pointer;
  height: 20px;
  width: 20px;
  color: white;
  border: 1px solid white;
  border-radius: 50%;
  text-align: center;
  &:hover{
    background: teal;
    color: white;
  }
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



