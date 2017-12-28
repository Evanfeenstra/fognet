import React from "react"
import styled from "styled-components"
import Wallet from '../react-iota/Wallet'
import FAB from "../components/wallet"
import Pet from '../components/pet'
import Browser from '../components/browser'


export default () => (
  <App>
    <FAB />
    {/*<Wallet>  
      <Pet />
    </Wallet>*/}
    <Browser />
  </App>
)

const App = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  min-height: 100vh;
  background: linear-gradient(135deg, #00646d 4%, #411cce);
  background-size: cover;
  padding-top:50px;
`
