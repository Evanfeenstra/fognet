import React, { Component } from 'react';
import styled from 'styled-components'
import Input from './comps/input'
import Button from './comps/button'


export default class F extends Component {

  constructor(){
    super()
    this.state={
      hi:'hi'
    }
  }

  componentWillMount(){
    this.props.initializeFlashChannel()
  }

  render(){
    const {show, fundFlashChannel} = this.props
    return <Flash show={show}>
      <Content>
        <Button title="Connect to Flash Channel" onClick={fundFlashChannel}/>
      </Content>
    </Flash>
  }
}

const Flash = styled.div`
  position:absolute;
  height:129px;
  width:100%;
  top:41px;
  left:0;
  border-bottom:1px solid white;
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

