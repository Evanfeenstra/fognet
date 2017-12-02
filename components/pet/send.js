import React, { Component } from 'react';
import styled from "styled-components"
import Input from './input'

export default class Send extends Component {

  componentDidMount(){
    if(!this.props.recipient){
      setTimeout(()=>{
        this.inputRef.focus()
      },150)
    }
  }

  onSubmit = (e) => {
    e.preventDefault()
    console.log('submit')
    this.props.sendIota(1, this.props.recipient, 'sent with react-iota', '')
  }

  render(){
    const {recipient, setRecipient, sendingIota} = this.props
    return <Content>
      <Wrap>
        <Input label="Send to Address"
          innerRef={r=>this.inputRef=r}
          onChange={(e)=>setRecipient(e.target.value)}
          value={recipient || ''} />
        <Button color="teal" variant="raised"
          onClick={this.onSubmit}
          disabled={!recipient || sendingIota}>
          {'Send'}
        </Button>
      </Wrap>
    </Content>
  }
}

const Button = styled.div`
  float:right;
  height:32px;
  color: white;
  border: 1px solid white;
  transition: all .15s ease-in-out;
  display: inline-block;
  padding: 0 26px;
  margin: 8px 0;
  cursor: pointer;
  touch-action: manipulation;
  text-align: center;
  line-height: 33px;
  vertical-align: middle;
  white-space: nowrap;
  user-select: none;
  -webkit-user-select: none;
  font-size: 14px;
  letter-spacing: .03em;
  position: relative;
  overflow: hidden;
  &:hover{
    background:teal;
  }
`

const Content = styled.div`
  height: 100%;
  position: absolute;
  width: 100%;
  overflow: hidden;
`

const Wrap = styled.div`
  padding: 10px;
`