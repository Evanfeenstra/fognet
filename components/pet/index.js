import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import Clipboard from 'react-clipboard';
import Form from 'muicss/lib/react/form'
import Input from 'muicss/lib/react/input'
import Button from 'muicss/lib/react/button'
import clipboard from 'clipboard-polyfill'

const spinner = '/static/img/ajax-loader-small.gif'

export default class Pet extends Component {

  constructor(){
    super()
    this.state={
      mode:null,
      recipient:null
    }
  }

  render() {
    const {createRandom, balance, gettingBalance, getBalance, getAddresses, addresses, gettingAddresses} = this.props
    const isConnected = balance || balance===0
    const {mode} = this.state
    return (<div className="pet">
      <div className="pet-content">

        {!isConnected && <div className="pet-connect" 
          onClick={()=>createRandom()}>
          {!gettingBalance ? 'Connect' : 
          <img alt="spinner" src={spinner} />}
        </div>}

        {isConnected && <div className="pet-header">
          <span>Balance:&nbsp;&nbsp;{balance}&nbsp;i</span>
          {mode && <div className="pet-header-exit-mode"
            onClick={()=>this.setState({mode:null})}>
            <X style={{width:12, height:20, stroke:'white'}} />
          </div>}
        </div>}

        {isConnected && <div className="pet-tabs" style={{height:mode?128:32}}>

          {!mode && <div className="pet-tab" 
            onClick={()=>this.setState({mode:'send'})}>
            Send
          </div>}
          {!mode && <div className="pet-tab"
            onClick={()=>{
              this.setState({mode:'receive'})
              if(!addresses){
                getAddresses()
              }
            }}>
            {!gettingAddresses ? 'Receive' :
            <img alt="spinner" src={spinner} />}
          </div>}

          {mode==='send' && <Send {...this.props}
            setRecipient={(a)=>this.setState({recipient:a})}
            recipient={this.state.recipient}
          />}

          {mode==='receive' && addresses && <Addresses {...this.props} />}
        </div>}
      </div>
    </div>)
  }

}

class Send extends Component {

  componentDidMount(){
    if(!this.props.recipient){
      setTimeout(()=>{
        ReactDOM.findDOMNode(this.customInput).querySelector('input').focus()
      },150)
    }
  }

  onSubmit = (e) => {
    e.preventDefault()
    console.log('submit')
    this.props.sendIota(1, this.props.recipient, 'sent with react-iota', '')
  }

  render(){
    const {recipient, setRecipient, sendingIota} = this.props
    return <div className="pet-mode-content">
      <div style={{padding:10}}>
        <Form onSubmit={this.onSubmit} style={{textAlign:'center'}}>
          <Input label="Send to Address" floatingLabel={true} 
            style={{textAlign:'left'}}
            ref={ref=>this.customInput=ref}
            onChange={(e)=>setRecipient(e.target.value)}
            value={recipient || ''} />
          <Button color="teal" variant="raised"
            onClick={this.onSubmit}
            disabled={!recipient || sendingIota}>
            {'Send'}
          </Button>
        </Form>
      </div>
    </div>
  }
}

const Addresses = ({addresses, balanceInputs}) => {
  console.log(balanceInputs)
  return <div className="pet-mode-content">
    <div className="pet-addresses-title">Addresses</div>
    <div className="pet-addresses">
      {addresses && addresses.map(a=>{
        console.log(a)
        const input = balanceInputs && balanceInputs.find(bi=>a.includes(bi.address))
        return <div className="pet-address" key={a}>
          <Link style={{height:10, verticalAlign:'top', marginTop:1}} />
          <div className="pet-address-text" onClick={()=>clipboard.writeText(a)}>
            {a}
          </div>
          {input && <div className="pet-address-amount">
            {input.balance}
          </div>}
        </div>
      })}
    </div>
  </div>
}

const X = ({style}) => {
  return <svg style={style} viewBox="0 0 60 60">
    <path style={{strokeWidth:5, strokeLinecap: 'round'}}
      d="M 15.674663,15.572746 L 44.587629,44.485711 M 45.118838,15.420972 L 15.522889,45.016920"></path>
  </svg>
}

const Link = ({style}) => {
  return <svg style={style} fill="white" viewBox="0 0 512 512"><g><path d="M256.5,208H256v0C256.2,208,256.3,208,256.5,208z"/><path d="M368.5,160H320c0,0,26,17,31.6,48H368h0.5c17.6,0,31.5,13.9,31.5,31.5v32c0,17.6-13.9,32.5-31.5,32.5h-112   c-17.6,0-32.5-14.9-32.5-32.5V240h-48v31.5c0,11.5,2.5,22.5,6.9,32.5c12.6,28.2,40.9,48,73.6,48h112c44.2,0,79.5-36.3,79.5-80.5   v-32C448,195.3,412.7,160,368.5,160z"/><path d="M329.6,208c-12.1-28.3-40.1-48-73.1-48h-112c-44.2,0-80.5,35.3-80.5,79.5v32c0,44.2,36.3,80.5,80.5,80.5H192   c0,0-25.8-17-32.1-48h-15.4c-17.6,0-32.5-14.9-32.5-32.5v-32c0-17.6,14.9-31.5,32.5-31.5H256h0.5c17.6,0,31.5,13.9,31.5,31.5v32   c0,0.2,0,0.3,0,0.5h48c0-0.2,0-0.3,0-0.5v-32C336,228.3,333.7,217.6,329.6,208z"/></g></svg>
}

