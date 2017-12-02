import React, {Component} from 'react';
import clipboard from 'clipboard-polyfill'
import styled from "styled-components"

const Receive = (props) => {
  const {addresses, balanceInputs} = props
  console.log('balanceInputs',balanceInputs)
  return <Content>
    <Title>Addresses</Title>
    <Addresses>
      {addresses && addresses.map((a,i)=>{
        const input = balanceInputs && balanceInputs.find(bi=>a.includes(bi.address))
        return <Addy {...props} address={a} input={input} key={a} />
      })}
    </Addresses>
  </Content>
}

export default Receive

class Addy extends Component {

  constructor(){
    super()
    this.state={
      clicked: false
    }
  }

  render() {
    const {address, input, fundFromTestnet, fundingAddressFromTestnet} = this.props
    return <Address key={address}>
      {fundingAddressFromTestnet === address ?
        <Spinner>
          <Spin src="/static/img/ajax-loader-small.gif" /> 
        </Spinner> :
        <Link viewBox="0 0 512 512" onClick={()=>fundFromTestnet(address)}>
          <G />
        </Link>
      }
      <Text onMouseDown={()=>{
        clipboard.writeText(address)
        this.setState({clicked:true})
        setTimeout(()=>{
          this.setState({clicked:false})
        },150)
      }} clicked={this.state.clicked}>
        {address}
      </Text>
      {input && <Amount>
        {input.balance}
      </Amount>}
    </Address>
  }

}

const G = () => {
  return <g><path d="M256.5,208H256v0C256.2,208,256.3,208,256.5,208z"/><path d="M368.5,160H320c0,0,26,17,31.6,48H368h0.5c17.6,0,31.5,13.9,31.5,31.5v32c0,17.6-13.9,32.5-31.5,32.5h-112   c-17.6,0-32.5-14.9-32.5-32.5V240h-48v31.5c0,11.5,2.5,22.5,6.9,32.5c12.6,28.2,40.9,48,73.6,48h112c44.2,0,79.5-36.3,79.5-80.5   v-32C448,195.3,412.7,160,368.5,160z"/><path d="M329.6,208c-12.1-28.3-40.1-48-73.1-48h-112c-44.2,0-80.5,35.3-80.5,79.5v32c0,44.2,36.3,80.5,80.5,80.5H192   c0,0-25.8-17-32.1-48h-15.4c-17.6,0-32.5-14.9-32.5-32.5v-32c0-17.6,14.9-31.5,32.5-31.5H256h0.5c17.6,0,31.5,13.9,31.5,31.5v32   c0,0.2,0,0.3,0,0.5h48c0-0.2,0-0.3,0-0.5v-32C336,228.3,333.7,217.6,329.6,208z"/></g>
}

const Link = styled.svg`
  height:10px;
  vertical-align:top;
  fill:white;
  cursor:pointer;
  &:hover{
    fill:gold;
    transform:scale(1.1,1.1);
  }
`

const Spinner = styled.div`
  display:inline-block;
  margin-left: 3px;
`

const Spin = styled.img`
  height:3px;
  position:absolute;
  top:3px;
`

const Content = styled.div`
  height: 100%;
  position: absolute;
  width: 100%;
  overflow: hidden;
`

const Title = styled.div`
  font-size: 12px;
  height: 26px;
  padding-left: 12px;
  line-height: 27px;
`

const Addresses = styled.div`
  height: calc(100% - 26px);
  overflow-y: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar{
    width: 5px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb{
    background-color: white;
  }
  &::-webkit-scrollbar-track{
    display: none;
  }
`

const Address = styled.div`
  width: 100%;
  overflow: hidden;
  margin-left:6px;
  margin-bottom:6px;
  font-size: 9px;
  position: relative;
  height:11px;
`

const Text = styled.div`
  display: inline-block;
  position: absolute;
  left: 9px;
  width: 80%;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  cursor: pointer;
  overflow: hidden;
  color: white;
  font-weight: 100;
  border: none;
  text-align: left;
  vertical-align: top;
  margin-left:2%;
  &:hover{
    color:${props=>props.clicked?'yellow':'gold'};
  }
`

const Amount = styled.div`
  display: inline-block;
  max-width: 13%;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: top;
`

