import React from "react"
import styled from "styled-components"
import FAB from "../components/wallet"
import Pet from '../components/pet'

import Wallet from '../react-iota/Wallet'

export default () => (
  <App>
    <FAB />
    <Wallet>
      <Pet />
    </Wallet>
  </App>
)

const App = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(315deg, #009dad 4%, #140061);
  background-size: cover;
`
