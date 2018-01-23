import React, {Component} from 'react';
import clipboard from 'clipboard-polyfill'
import styled from 'styled-components'
import Button from './comps/button'

const Receive = (props) => {
  const {addresses, balanceInputs} = props.iota
  const {getAddresses, gettingAddresses} = props.actions
  // console.log('balanceInputs',balanceInputs)
  // console.log('addresses', addresses)
  return <Content>
    <Title>Addresses</Title>
    {!addresses && <IntroSpinner src="/static/img/ajax-loader-small.gif" size={props.size} />}
    <Addresses>
      {addresses && addresses.map((a,i)=>{
        const input = balanceInputs && balanceInputs.find(bi=>a.includes(bi.address))
        return <Addy {...props} address={a} input={input} key={i} />
      })}
      {addresses && <Button title="More" size="tiny" margin="7px 13px" width="42px" 
        onClick={()=>getAddresses(addresses.length, 10)} 
        active={gettingAddresses} />}
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
    const {iota, actions, utils, address, input} = this.props
    const {fundingAddressFromTestnet} = iota
    return <Address>
      <Icon>
        {fundingAddressFromTestnet === address ?
          <Spin src="/static/img/ajax-loader-small.gif" /> :
          <Link viewBox="0 0 512 512" active={fundingAddressFromTestnet}
            onClick={()=>actions.fundFromTestnet(address, 441)}>
            <G />
          </Link>
        }
      </Icon>
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
        {utils.reducer(parseInt(input.balance))}
      </Amount>}
    </Address>
  }

}

const G = () => {
  return <g><path d="M256.5,208H256v0C256.2,208,256.3,208,256.5,208z"/><path d="M368.5,160H320c0,0,26,17,31.6,48H368h0.5c17.6,0,31.5,13.9,31.5,31.5v32c0,17.6-13.9,32.5-31.5,32.5h-112   c-17.6,0-32.5-14.9-32.5-32.5V240h-48v31.5c0,11.5,2.5,22.5,6.9,32.5c12.6,28.2,40.9,48,73.6,48h112c44.2,0,79.5-36.3,79.5-80.5   v-32C448,195.3,412.7,160,368.5,160z"/><path d="M329.6,208c-12.1-28.3-40.1-48-73.1-48h-112c-44.2,0-80.5,35.3-80.5,79.5v32c0,44.2,36.3,80.5,80.5,80.5H192   c0,0-25.8-17-32.1-48h-15.4c-17.6,0-32.5-14.9-32.5-32.5v-32c0-17.6,14.9-31.5,32.5-31.5H256h0.5c17.6,0,31.5,13.9,31.5,31.5v32   c0,0.2,0,0.3,0,0.5h48c0-0.2,0-0.3,0-0.5v-32C336,228.3,333.7,217.6,329.6,208z"/></g>
}

const IntroSpinner = styled.img`
  height:5px;
  width:8px;
  margin-left:13px;
  margin-top:3px;
`

const Content = styled.div`
  display:flex;
  flex:1;
  width:100%;
  flex-direction:column;
`
const Title = styled.div`
  font-size: 12px;
  height: 23px;
  padding-left: 12px;
  line-height: 27px;
  display:inline-block;
`
const Link = styled.svg`
  pointer-events: ${p=> p.active ? 'none' : 'auto'};
  height:10px;
  vertical-align:top;
  fill:white;
  cursor:${p=> p.active ? 'default' : 'pointer'};
  &:hover{
    fill:${p=> p.active ? 'white' : 'gold'};
  }
`
const Icon = styled.div`
  width:10px;
  margin:0 4px;
`
const Spin = styled.img`
  height:4px;
  margin-bottom:1px;
  margin-left: 2px;
`
const Addresses = styled.div`
  display:flex;
  flex:1;
  flex-direction:column;
  overflow-y: scroll;
  overflow-x: hidden;
  padding-bottom: 3px;
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
  display:flex;
  flex-direction:row;
  overflow: hidden;
  margin:3px 0;
  font-size: 9px;
  position: relative;
  min-height:11px;
`
const Text = styled.div`
  display: inline-block;
  left: 9px;
  width: 75%;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  cursor: pointer;
  overflow: hidden;
  color: white;
  font-weight: 100;
  border: none;
  text-align: left;
  vertical-align: top;
  &:hover{
    color:${props=>props.clicked?'yellow':'gold'};
  }
`
const Amount = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  width: 16%;
  margin-left: 4px;
`

