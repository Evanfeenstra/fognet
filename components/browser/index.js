import React, { Component } from 'react';
import styled from 'styled-components'
import * as util from './aScript'

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
      sites:[]
    }
  }

  componentWillMount(){
    /*if(typeof WebSocket !== 'undefined'){
      this.ws = new WebSocket('ws://localhost:8000/fognet')
      this.ws.onmessage = this.onMessage
    }*/
    if(util.isWindow()){
      window.addEventListener('message', (e) => {
        var r = JSON.parse(e.data)
        if(r.hasOwnProperty('fognetHref')){
          this.go(r.fognetHref)
        }
      })
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

  onFrameLoad = () => {
    const doc = this.frame.contentDocument || this.frame.document
    var iFrameHead = doc.getElementsByTagName("head")[0]
    var myscript = document.createElement('script')
    myscript.type = 'text/javascript'
    myscript.text = util.script(this.state.url)
    iFrameHead.appendChild(myscript)
  }

  go = async (url) => {
    this.setState({loading:true})
    setTimeout(()=>{
      this.setState({html: ''})
    },200)
    const opts = {
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
    this.setState({html: response.html, loading:false, sites, index: sites.length - 1})
  }

  render() {
    const {index, loading, url, html, sites} = this.state
    return (<Browser>
      <TopBar>
        <Things style={{margin:5}}>
          <Back onClick={this.back} 
            disabled={sites.length<2}>
            ◀
          </Back>
          <Forward onClick={this.forward} 
            disabled={!url || loading}>
            ▶
          </Forward>
          <Input value={url} 
            onChange={(e)=>this.setState({url:e.target.value})} 
            onKeyPress={this.inputKeyPress} />
          <Button onClick={()=>this.go(url)} 
            disabled={!url || loading}>
            go
          </Button>
        </Things>
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
`
const TopBar = styled.div`
  height:32px;
  width:100%;
  background: linear-gradient(340deg, #004a51 4%, #291184);
  border-bottom: 1px solid white;
`
const Things = styled.div`
  margin:5;
  position:relative;
`
const Back = styled.button`
  width: 21px;
  height: 21px;
  cursor: pointer;
  position: absolute;
  left: 0px;
  top: 0px;
  padding-left:5px;
`
const Forward = styled.button`
  width: 22px;
  height: 21px;
  cursor: pointer;
  position: absolute;
  left: 24px;
  top: 0px;
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
  flex:1;
`
const Spinner = styled.img`
  height:10px;
`
