import React, { Component } from 'react';
import styled from 'styled-components'
import * as util from './aScript'
import Gooey from './gooey'

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/*

<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no"><meta name="theme-color" content="#000000"><link rel="manifest" href="/manifest.json"><link rel="shortcut icon" href="/favicon.ico"><link href="https://fonts.googleapis.com/css?family=Lato:100" rel="stylesheet"><title>FogNet</title><link href="/static/css/main.e226bfb7.css" rel="stylesheet"></head><body><noscript>You need to enable JavaScript to run this app.</noscript><div id="fognet-landing-root"></div><script type="text/javascript" src="/static/js/main.b44b5db2.js"></script></body></html>

*/
export default class B extends Component {

  constructor(){
    super()
    this.state={
      url:'https://coinmarketcap.com',
      html:'',
      loading:false,
      index:0,
      sites:[],
      toggle:false,
      char: null,
    }
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
    navigator.bluetooth.requestDevice({ 
      filters: [{ services: ['00001234-0000-1000-8000-00805f9b34fb'] }]
    })
    .then(device => device.gatt.connect())
    .then(server => server.getPrimaryService('00001234-0000-1000-8000-00805f9b34fb'))
    .then(service => service.getCharacteristic('00001234-0000-1000-8000-00805f9b34fb'))
    .then(characteristic => {
      console.log(characteristic)
      this.setState({char:characteristic, toggle:false})
      clearInterval(this.interval)
      this.interval = null
    })
    .catch(error => { 
      clearInterval(this.interval)
      this.setState({toggle:false})
      this.interval = null
    });
  }

  toggler = () => {
    this.setState({toggle:!this.state.toggle}) 
  }

  go = async (url) => {
    this.setState({loading:true})
    setTimeout(()=>{
      this.setState({html: ''})
    },200)

    var enc = new TextEncoder("utf-8");
    const byteArray = enc.encode(url)
    this.state.char.writeValue(byteArray)
    .then(r=>{
      console.log("GATT COMPLETE", r)
    })
    .catch(err=>{
      console.log(err)
    })

    /*const opts = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: "hi",
        url: url
      })
    }
    const response = await util.API("fognet", opts)
    const sites = [...this.state.sites]
    sites.push({url, html: response.html})
    this.setState({html: response.html, loading:false, sites, index: sites.length - 1})*/
  }

  render() {
    const {index, loading, url, html, sites, toggle, char} = this.state
    return (<Browser>
      
      <TopBar>
        {char && <Things style={{margin:5}}>
          <Back onClick={this.back} disabled={index===0}>◀</Back>
          <Forward onClick={this.forward} disabled={index>=sites.length-1}>▶</Forward>
          <Input value={url} 
            onChange={(e)=>this.setState({url:e.target.value})} 
            onKeyPress={this.inputKeyPress} />
          <Button onClick={()=>this.go(url)} 
            disabled={!url || loading}>
            go
          </Button>
        </Things>}
        {!char && <Things>
          <Connect>Connect</Connect>
          <Gooey onClick={this.connectToBLE} checked={toggle} />
        </Things>}
      </TopBar>

      {html && <iframe srcDoc={html} 
        height="468" frameBorder="0"
        style={{opacity:loading?0:1,transition:'all 0.2s'}}
        ref={ref=>this.frame=ref} onLoad={this.onFrameLoad}>
      </iframe>}

      {loading && <Loading>
        <Spinner src="/static/img/ajax-loader-small.gif" />
      </Loading>}
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
  top: 5px;
  font-size: 12px;
  right: 23px;
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
  right: 0px;
  top: 0px;
`
const Input = styled.input`
  width:382px;
  margin-left:50px;
`
const Loading = styled.div`
  display:flex;
  justify-content:center;
  align-items: center;
  position:absolute;
  top:32px;left:0;bottom:0;right:0;
`
const Spinner = styled.img`
  height:10px;
`
