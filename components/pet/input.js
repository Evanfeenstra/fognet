import React from 'react';
import styled from "styled-components"

const I = props => {
  return <Content>
    <Input {...props} />
    <Label value={props.value}>
      {props.label}
    </Label>
  </Content>
}

export default I

const Content = styled.div`
  display: block;
  padding-top: 10px;
  margin-bottom: 15px;
  position: relative;
  text-align: left;
`

const Input = styled.input`
  border-bottom: 1px solid white;
  color: white;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  box-sizing: border-box;
  display: block;
  background-color: transparent;
  color: rgba(0,0,0,.87);
  border: none;
  border-bottom: 1px solid white;
  outline: 0;
  width: 100%;
  padding: 0;
  box-shadow: none;
  border-radius: 0;
  font-size: 14px;
  font-family: inherit;
  line-height: inherit;
  background-image: none;
  height: 30px;
  color:white;
  padding-top:4px;
  &:focus{
    border-color: teal;
    border-width: 2px;
    height: 31px;
    margin-bottom: -1px;
  }
  &:focus~label{
    transform: translate(0,0);
    -webkit-transform: translate(0,0);
    -ms-transform: translate(0,0);
    font-size: 9px;
    line-height: 15px;
    color: #00a0a0;
  }
`

const Label = styled.label`
  transform: translate(0,${props => props.value ? '0' : '10px'});
  -webkit-transform: translate(0,${props => props.value ? '0' : '10px'});
  -ms-transform: translate(0,${props => props.value ? '0' : '10px'});
  font-size: ${props => props.value ? '9px' : '14px'};
  line-height: ${props => props.value ? '15px' : '35px'};
  transition: 0.15s ease-out;
  position: absolute;
  top: 0;
  display: block;
  width: 100%;
  color: grey;
  font-weight: 400;
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-overflow: clip;
  cursor: text;
  pointer-events: none;
`


