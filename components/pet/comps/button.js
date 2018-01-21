import React from 'react';
import styled from 'styled-components'

const B = (props) => <Button {...props}>
  {!props.active ? props.title :
  <Spinner src="/static/img/ajax-loader-small.gif" size={props.size} />}
</Button>

const Spinner = styled.img`
  height: ${p=> p.size==='tiny' ? '4px' : '7px'};
`

const Button = styled.div`
  pointer-events: ${p=> p.disabled || p.active ? 'none' : 'auto'};
  color: ${p=> p.disabled ? 'grey' : 'white'};
  border: 1px solid ${p=> p.disabled && !p.active ? 'grey' : 'white'};
  width:${p=> p.width || 'auto'};
  margin: ${p=> p.margin || '7px 0'};
  display:flex;
  align-items:center;
  flex:1;
  justify-content:center;
  max-height: ${p=> p.size==='tiny' ? '16' : '32'}px;
  min-height: ${p=> p.size==='tiny' ? '16' : '32'}px;
  transition: all .15s ease-in-out;
  cursor: ${p=> p.active ? 'default' : 'pointer'};
  touch-action: manipulation;
  white-space: nowrap;
  user-select: none;
  -webkit-user-select: none;
  font-size: ${p=> p.size==='tiny' ? '9' : '14'}px;
  letter-spacing: .03em;
  overflow: hidden;
  &:hover{
    background:${p=> p.active ? 'transparent' : 'teal'};
  }
`
export default B