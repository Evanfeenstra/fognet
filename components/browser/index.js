import React, { Component } from 'react';
import styled from 'styled-components'
import * as util from './utils'
import Gooey from './gooey'

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/*

<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no"><meta name="theme-color" content="#000000"><link rel="manifest" href="/manifest.json"><link rel="shortcut icon" href="/favicon.ico"><link href="https://fonts.googleapis.com/css?family=Lato:100" rel="stylesheet"><title>FogNet</title><link href="/static/css/main.e226bfb7.css" rel="stylesheet"></head><body><noscript>You need to enable JavaScript to run this app.</noscript><div id="fognet-landing-root"></div><script type="text/javascript" src="/static/js/main.b44b5db2.js"></script></body></html>

*/

const dev = false;

export default class B extends Component {

  constructor(){
    super()
    this.state={
      url:'https://fognet.world',
      html:'',
      loading:false,
      index:0,
      sites:[],
      toggle:false,
      connected:false,
      streamProgress:0,
      streamLength:0,
    }
    this.char = null
  }

  componentDidMount(){
    /*if(typeof WebSocket !== 'undefined'){
      this.ws = new WebSocket('ws://localhost:8000/fognet')
      this.ws.onmessage = this.onMessage
    }*/
    if(util.isWindow()){
      window.addEventListener('message', (e) => {
        if(e.data && e.data.hasOwnProperty && e.data.hasOwnProperty('fognetHref')){
          this.go(e.data.fognetHref)
        }
      })

      /*window.fetch = async () => {
        console.log("FETHC HEREREERERERE")
        await timeout(1000)
        return true
      }

      window.XMLHttpRequest.prototype.open = async () => {
        console.log("XMLHttpRequest HEREREREREREERE")
        await timeout(1000)
        return true
      }*/
    }
  }

  inputKeyPress = (e) => {
    if(e.key === 'Enter'){
      this.go(this.state.url)
    }
  }

  back = () => {
    const index = this.state.index - 1
    const site = this.state.sites[index]
    this.setState({index, ...site})
  }

  forward = () => {
    const index = this.state.index + 1
    const site = this.state.sites[index]
    this.setState({index, ...site})
  }

  onFrameLoad = () => {
    const doc = this.frame.contentDocument || this.frame.document
    var iFrameHead = doc.getElementsByTagName("head")[0]
    var myscript = document.createElement('script')
    myscript.type = 'text/javascript'
    myscript.text = util.script(this.state.url)
    iFrameHead.appendChild(myscript)
  }

  connectToBLE = () => {
    if(!this.interval){
      this.interval = setInterval(()=>{
        this.toggler()
      },420)
    }
    if(this.props.initialized==='BLE'){
      navigator.bluetooth.requestDevice({ 
        filters: [{ services: ['00001234-0000-1000-8000-00805f9b34fb'] }]
      })
      .then(device => device.gatt.connect())
      .then(server => server.getPrimaryService('00001234-0000-1000-8000-00805f9b34fb'))
      .then(service => {
        // CATCH THIS ONE TOO! PROMISE ALL?
        service.getCharacteristic('00001235-0000-1000-8000-00805f9b34fb')
        .then(notifyChar => {
          console.log(notifyChar)
          notifyChar.startNotifications().then(_ => {
            console.log('> Notifications started')
            notifyChar.addEventListener('characteristicvaluechanged', this.bleNotification)
          })
        })
        service.getCharacteristic('00001234-0000-1000-8000-00805f9b34fb')
        .then(characteristic => {
          console.log(characteristic)
          this.setState({connected:true, toggle:false})
          clearInterval(this.interval)
          this.interval = null
          this.char = characteristic
        })
      })
      .catch(error => {
        console.log(error)
        clearInterval(this.interval)
        this.setState({toggle:false, connected:false})
        this.interval = null
        this.char = null
      })
    } else {
      this.setState({toggle:false, connected:true})
      clearInterval(this.interval)
      this.interval = null
    }
  }

  bleNotification = (e) => {
    util.decode(e.target.value,(cmd,len)=>{
      console.log('stream started',cmd,len)
      this.setState({streamLength:len})
    },()=>{
      this.setState({streamProgress:this.state.streamProgress+1})
    },(v)=>{
      const html = v.trim()
      console.log('set html length ',html.length)
      const sites = [...this.state.sites]
      sites.push({url:this.state.url, html})
      if(!dev){
        this.spend(this.state.streamLength)
      }
      this.setState({html, loading:false,
        streamLength:0, streamProgress:0,
        sites, index:sites.length-1
      })
    })
  }

  toggler = () => {
    this.setState({toggle:!this.state.toggle})
  }

  go = async (url) => {
    this.setState({loading:true})
    setTimeout(()=>{
      this.setState({html: ''})
    },2)
    
    if(this.props.initialized==='BLE'){
      console.log("SEND URL NOw", url)
      util.BleAPI('web', url).reduce((prev, val) => {
        return prev.then(() => this.char.writeValue(val))
      }, Promise.resolve())
      this.setState({loading:true})
    } else {
      const opts = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          url: url
        })
      }
      const response = await util.API("fognetdemo", opts)
      const sites = [...this.state.sites]
      sites.push({url, html: response.html})
      this.setState({html:response.html, loading:false, sites, index:sites.length - 1})
      // each ble packet is 18 bytes
      if(!dev){
        this.spend(Math.ceil(response.html.length / 18))
      }
    }
  }

  spend = (packetCount) => {
    //Cost is one iota per megabyte
    const iotaAmount = Math.ceil(packetCount/55.555/1000)
    if(this.props.onSpend){
      this.props.onSpend(iotaAmount)
    }
  }

  render() {
    const {index, loading, url, html, sites, toggle, connected} = this.state
    const {spendConfirmed, flashFund, totalSpent, spend, spendError} = this.props
    return (<Browser>
      
      <TopBar>
        {connected && <Things style={{margin:5}}>
          <Back onClick={this.back} disabled={index===0}>◀</Back>
          <Forward onClick={this.forward} disabled={index>=sites.length-1}>▶</Forward>
          <Input value={url}
            onChange={(e)=>this.setState({url:e.target.value})} 
            onKeyPress={this.inputKeyPress} />
          <Button onClick={()=>this.go(url)} 
            disabled={!url || loading || (!dev && (flashFund<1 || totalSpent))}>
            go
          </Button>
          <Balance>{flashFund - totalSpent}i</Balance>
        </Things>}
        {!connected && <Things>
          <Connect>Connect</Connect>
          <Gooey onClick={this.connectToBLE} checked={toggle} />
        </Things>}
      </TopBar>

      {(html && spendConfirmed) && <iframe srcDoc={html} height="468" frameBorder="0"
        style={{opacity:loading?0:1,transition:'all 0.2s',background:html?'white':'transparent'}}
        ref={ref=>this.frame=ref} onLoad={this.onFrameLoad}>
      </iframe>}

      {(loading || spend!==0) && <Loading>
        <Bar length={this.state.streamLength} progress={this.state.streamProgress}/>
        <Spinner src="/static/img/ajax-loader-small.gif" />
      </Loading>}
      {spendError && <Loading><Err>
        {spendError}
      </Err></Loading>}
    </Browser>)
  }

}

const Browser = styled.div`
  width:500px;
  height:500px;
  background:#130060;
  display:flex;
  flex-direction:column;
  justify-content:flex-start;
  box-shadow: 0px 1px 9px 1px rgba(94,94,94,.5);
  border: 1px solid white;
  position: relative;
`
const TopBar = styled.div`
  height:32px;
  width:100%;
  background: linear-gradient(340deg, #004a51 4%, #30139d);
  border-bottom: 1px solid white;
  position:relative;
`
const Things = styled.div`
  margin:5;
  position:relative;
`
const Connect = styled.div`
  position:absolute;
  color:white;
  top: 7px;
  font-size: 13px;
  right: 15px;
`
const Back = styled.button`
  width: 21px;
  height: 21px;
  cursor: pointer;
  position: absolute;
  left: 0px;
  top: 0px;
  padding-left:4px;
`
const Forward = styled.button`
  width: 22px;
  height: 21px;
  cursor: pointer;
  position: absolute;
  left: 24px;
  top: 0px;
  padding-left: 6px;
`
const Button = styled.button`
  width: 48px;
  height: 21px;
  cursor: pointer;
  position: absolute;
  right: 47px;
  top: 0px;
`
const Input = styled.input`
  width:335px;
  margin-left:50px;
`
const Balance = styled.div`
  border:1px solid white;
  text-align:center;
  color:white;
  position: absolute;
  width: 40px;
  right: 0px;
  top: 1px;
  font-size: 11px;
  line-height: 19px;
  height: 18px;
`
const Loading = styled.div`
  display:flex;
  justify-content:center;
  align-items: center;
  position:absolute;
  top:32px;left:0;bottom:0;right:0;
`
const Err = styled.div`
  height:11px;
  color:white;
`
const Bar = styled.div`
  position:absolute;
  top:0;left:0;
  height:4px;
  background:white;
  width:${p=> Math.ceil(500 / (p.length / p.progress))}px;
`
const Spinner = styled.img`
  height:10px;
`
