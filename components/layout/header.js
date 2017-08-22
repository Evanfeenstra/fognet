import React from "react"
import styled from "styled-components"
import { Link } from "../../routes"

const Header = styled.header`
  width: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 3rem 5rem;
  z-index: 10;
  box-sizing: border-box;  
  @media screen and (max-width: 640px) {
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 3rem 0rem;    
    position: ${props => (props.active ? `fixed` : `absolute`)};
  }
`

const Anchor = styled.a`
  text-decoration: none;
  margin: 0 10px;
  cursor: pointer;
  color: ${props => (props.dark ? "black" : "white")};
  @media screen and (max-width: 460px) {
    font-size: calc(2rem + 2vw);
    padding-top: 2rem;
  }
`

const MobileNav = styled.nav`
  display: none;
  pointer-events: ${props => (props.active ? "auto" : "none")};
  flex-direction: row;
  justify-content: space-around;
  width: auto;
  align-items: center;
  @media screen and (max-width: 640px) {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background: rgba(0, 0, 0, .8);
    height: 100vh;
    width: 100vw;
    padding-top: 7rem;
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    transition: all .6s ease;
    opacity: ${props => (props.active ? `1` : `0`)};
  }
`

const Desktop = styled.nav`
  display: flex;
  @media screen and (max-width: 640px) {
    display: none;
  }
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  @media screen and (max-width: 640px) {
    width: 100%;
    justify-content: space-around;
    z-index: 10;
  }
`

const Menu = styled.div`
  display: none;
  @media screen and (max-width: 640px) {
    display: block;
    width: 30px;
    height: 25px;
  }
`

const Line = styled.div`
  padding-top: 5px;
  border-bottom: 2px solid white;
`

const Satoshi = styled.img`
  height: 2.5rem;
  margin: 1rem;
`

export default class extends React.Component {
  state = {
    open: false
  }
  render() {
    return (
      <Header active={this.state.open}>

          <Link href="/">
            <Satoshi
              src={
                this.props.dark
                  ? "/static/icons/satoshipay-dark.png"
                  : "/static/icons/iota.png"
              }
            />
          </Link>
          <Link href="/">
            <Satoshi
              src={
                this.props.dark
                  ? "/static/icons/satoshipay-dark.png"
                  : "/static/icons/satoshipay.png"
              }
            />
          </Link>

      </Header>
    )
  }
}
