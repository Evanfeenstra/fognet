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

  render(){
    const {show} = this.props
    return <Flash show={show} />
  }
}

const Flash = styled.div`
  position:absolute;
  height:128px;
  width:100%;
  top:42px;
  left:0;
  border-bottom:1px solid white;
  background:inherit;
  z-index:99;
  background:##140061;
  transition: all .12s ease-in-out;
  transform: translateY(${p=> p.show ? '0px' : '-129px'});
`