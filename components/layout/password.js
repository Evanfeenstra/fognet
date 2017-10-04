import styled, { css } from "styled-components"

const Main = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 200;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(120deg, #d37290 20%, #73367c);
  transition: all 1s ease;
  opacity: ${props => (props.active ? 0 : 1)};
  visibility: ${props => (props.active ? "hidden" : "visible")};
`

const Input = styled.input`
  outline: none;
  border: none;
  background: none;
  border-bottom: 2px solid rgba(255, 255, 255, 0.4);
  padding: 5px 10px;
  font-size: 16px;
  color: #fff;
  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
`

export default props => (
  <Main {...props}>
    <Input
      value={props.password}
      placeholder={"Enter password"}
      onChange={event => props.update(event.target.value)}
    />
  </Main>
)
