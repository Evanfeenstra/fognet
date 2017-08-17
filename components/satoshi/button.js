import styled from "styled-components"
import { Reducer } from "../../libs/utils"

export default props =>
  <Button onClick={() => props.click()}>
    <SvgBox>
      <svg
        fill={"hsla(0, 0%, 100%, .8)"}
        id="icon-satoshipay-eye"
        viewBox="0 0 512 512"
        width="15px"
        height="100%"
      >
        <path d="M475.428 310.856q-43.428-67.428-108.857-100.857 17.428 29.715 17.428 64.285 0 52.857-37.572 90.428t-90.428 37.572-90.428-37.572-37.572-90.428q0-34.572 17.428-64.286-65.428 33.428-108.857 100.857 38 58.572 95.285 93.286t124.143 34.714 124.143-34.714 95.286-93.286zM269.714 201.143q0-5.714-4-9.714t-9.714-4q-35.714 0-61.286 25.571t-25.572 61.286q0 5.714 4 9.714t9.714 4 9.714-4 4-9.714q0-24.572 17.428-42t42-17.428q5.714 0 9.714-4t4-9.714zM512 310.856q0 9.714-5.714 19.714-40 65.714-107.572 105.286t-142.714 39.572-142.714-39.714-107.572-105.143q-5.715-10-5.715-19.714t5.715-19.714q40-65.428 107.572-105.143t142.714-39.715 142.714 39.714 107.572 105.143q5.714 10 5.714 19.714z" />
      </svg>
    </SvgBox>
    PAY {Reducer(props.price)}
  </Button>

const Button = styled.button`
  position: absolute;
  top: 16px;
  left: 16px;
  display: flex;
  background: #ff9800;
  border-radius: 2px;
  cursor: pointer;
  padding: 8px;
  border: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, .12), 0 1px 2px rgba(0, 0, 0, .18);
  font-size: 14px;
  font-family: -apple-system, \.SFNSText-Regular, San Francisco, Roboto,
    Segoe UI, Helvetica Neue, Lucida Grande, sans-serif;
  text-transform: uppercase;
  color: hsla(0, 0%, 100%, .8);
  &:focus {
    outline: none;
  }
`

const SvgBox = styled.div`padding-right: 5px;`
