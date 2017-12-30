import React, { Component } from 'react';
import styled from 'styled-components'

class G extends Component {
  render() {
    const {onClick, checked} = this.props
    const timings = [160, 240, 320, 400, 480]
    const translateX = [59.70025, 40.27066, 0.04778, -40.19977, -59.69063]
    const translateY = [5.99, 44.47779, 59.99998, 44.54187, 6.08508]
    return (
      <Gooey>

        <Nav>
          <Open onClick={onClick} />
          {timings.map((t,i)=>
            <Item checked={checked} timing={t} x={translateX[i]} y={translateY[i]} key={i}/>
          )}     
        </Nav>

        <svg version="1.1">
          <defs>
            <filter id="shadowed-goo">
                
                <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                <feGaussianBlur in="goo" stdDeviation="3" result="shadow" />
                <feColorMatrix in="shadow" mode="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 -0.2" result="shadow" />
                <feOffset in="shadow" dx="1" dy="1" result="shadow" />
                <feBlend in2="shadow" in="goo" result="goo" />
                <feBlend in2="goo" in="SourceGraphic" result="mix" />
            </filter>
            <filter id="goo">
                <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                <feBlend in2="goo" in="SourceGraphic" result="mix" />
            </filter>
          </defs>
      </svg>

      </Gooey>
    );
  }
}

const Gooey = styled.div`
  position: absolute;
  right:-150px;
  top:-27px;
  transform: scale(0.5,0.5);
`
const Nav = styled.nav`
  filter: url("#shadowed-goo");
  position: absolute;
  top:0;
  width:300px;
  height:300px;
`
const Open = styled.div`
  z-index: 2;
  background: #38f9d7;
  border-radius: 100%;
  width: 42px;
  height: 42px;
  margin-left:40px;
  position: absolute;
  top: 20px;
  color: white;
  transform: translate3d(0, 0, 0);
  transition: transform ease-out 200ms;
  transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transition-duration: 400ms;
  transform: scale(1.1, 1.1) translate3d(0, 0, 0);
  cursor: pointer;
  &:hover{
    transform: scale(1.2, 1.2) translate3d(0, 0, 0);
  }
`
const Item = styled.a`
  background: #38f9d7;
  border-radius: 100%;
  margin-left:40px;
  width: 34px;
  height: 34px;
  position: absolute;
  top: 20px;
  color: white;
  transform: translate3d(0, 0, 0);
  transition: transform ease-out 200ms;
  transition-duration: ${p=>p.timing}ms;
  transform: translate3d(${p=>p.checked?p.x:'4'}px, ${p=>p.checked?p.y:'4'}px, 0);
`

export default G;
