import React from "react"
import styled from "styled-components"
import { Link } from "../routes"
import FAB from "../components/wallet"

export default () => (
  <App>
    <FAB />
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
