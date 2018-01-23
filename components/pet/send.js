import React, { Component } from 'react';
import styled from 'styled-components'
import Input from './comps/input'
import Button from './comps/button'

export default class Send extends Component {

  constructor(){
    super()
    this.state={
      recipient:'',
      amount:''
    }
  }

  componentDidMount(){
    if(!this.props.recipient){
      setTimeout(()=>{
        //this.addressInputRef.focus()
      },150)
    }
  }

  componentWillReceiveProps(newProps){
    //console.log('newProps',newProps)
  }

  onSubmit = () => {
    console.log('send iota')
    this.props.actions.sendTransfer(this.state.recipient, parseInt(this.state.amount))
  }

  render(){
    const {iota, hidden, utils} = this.props
    const {sendingTransfer} = iota
    if (hidden) return <span />
    return <Content>
        <Input type="text" label="Send to Address"
          innerRef={r=>this.addressInputRef=r}
          onChange={(e)=>this.setState({recipient:utils.validSeed(e.target.value)})}
          value={this.state.recipient}
          width="100%" />
        <Wrap>
          <Input type="text" label="Amount"
            onChange={(e)=>this.setState({amount: utils.validAmount(e.target.value)})}
            value={this.state.amount}
            width="50%" />
          <Button title="Send" active={sendingTransfer}
            onClick={this.onSubmit} margin="7px 0 7px 14px"
            disabled={!this.state.recipient || !this.state.amount || sendingTransfer} />
        </Wrap>
    </Content>
  }
}

const Content = styled.div`
  overflow:hidden;
  padding: 10px;
  display: flex;
  flex-direction: column;
  flex: 1;
`

const Wrap = styled.div`
  display:flex;
  flex:1;
`

