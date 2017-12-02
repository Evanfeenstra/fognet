import React, { Component } from 'react';
import styled from 'styled-components'
import Receive from './receive'
import Send from './send'
import Input from './input'

export default class Pet extends Component {

  constructor(){
    super()
    this.state={
      mode:null,
      recipient:null
    }
  }

  render() {
    const {utils, createRandom, balance, gettingBalance, getBalance, getAddresses, addresses, gettingAddresses} = this.props
    const isConnected = balance || balance===0
    let {mode} = this.state

    mode = mode === 'receive' && gettingAddresses ? null : mode

    return (<Wallet>
      <Content>

        {!isConnected && <Connect onClick={()=>createRandom()}>
          {!gettingBalance ? 'Connect' :
          <Spinner src="/static/img/ajax-loader-small.gif" />}
        </Connect>}

        {isConnected && <Header>
          <span>Balance:&nbsp;&nbsp;{utils.reducer(balance)}&nbsp;</span>
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
              if(!addresses) getAddresses()
            }}>
            {!gettingAddresses ? 'Receive' :
            <Spinner src="/static/img/ajax-loader-small.gif" />}
          </Tab>}

          {mode==='send' && <Send {...this.props}
            setRecipient={(a)=>this.setState({recipient:a})}
            recipient={this.state.recipient}
          />}

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
  display: inline-block;
  color: white;
`

const Content = styled.div`
  padding: 12px;
`

const Spinner = styled.img`
  height: 8px;
`

const Connect = styled.div`
  cursor: pointer;
  transition: all .15s ease-in-out;
  text-align: center;
  border: 1px solid white;
  line-height: 33px;
  height: 32px;
  &:hover{
    background: teal;
    color: white;
  }
`

const Header = styled.div``

const HeaderExit = styled.div`
  transition: all .15s ease-in-out;
  font-size: 9px;
  cursor: pointer;
  height: 20px;
  width: 20px;
  color: white;
  border: 1px solid white;
  border-radius: 50%;
  text-align: center;
  position: absolute;
  right: 10px;
  top: 10px;
  &:hover{
    background: teal;
    color: white;
  }
`

const Tabs = styled.div`
  position: absolute;
  bottom:0;
  left:0;right:0;
  border-top:1px solid white;
  transition:all 0.2s;
  height:${props => props.mode ? '128px' : '32px'};
`

const Tab = styled.div`
  transition: all .15s ease-in-out;
  width: 50%;
  height: 32px;
  display: inline-block;
  text-align: center;
  line-height: 33px;
  cursor: pointer;
  border-bottom: 1px solid white;
  &:first-child{
    border-right: 1px solid white;
    width: calc(50% - 1px);
  }
  &:hover{
    background: teal;
    color:white;
  }
`



