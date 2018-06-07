
export const script = (url) => `
  var as = document.getElementsByTagName("a")
  for (var i = 0; i < as.length; i++) {
    as[i].addEventListener('click', function(e) {
      console.log(e)
      e.preventDefault()
      var href = ''
      if(e.target.pathname[0]=='/'){
        href = '${url}' + e.target.pathname + e.target.hash
      } else {
        href = e.srcElement.href
      }
      parent.postMessage({fognetHref:href},'*')
      return false
    })
  }
`

const url = 'https://flash.iota.studio/'
//const url = 'http://lyle.local:8089/'
//const url = 'http://localhost:8081/'
export const API = async (path, options) => {
  try {
    let response = await fetch(url + path, options)
    let responseJson = await response.json()
    return responseJson
  } catch (error) {
    console.error(error)
  }
}

export const BleAPI = (cmd, a) => {
  var enc = new TextEncoder('utf-8')
  const num = Math.ceil(a.length / 18)
  const chunks = []
  for(var i=0; i<num; i++){
    var sub = a.substr(i*18, 19)
    const chunk = enc.encode(sub)
    chunks.push(chunk)
  }
  const go = enc.encode(`<*>${cmd}`)
  const no = enc.encode(`<^>${cmd}`)
  return [go, ...chunks, no]
}

var chunks = []
export const decode = (s, start, tick, finish) => {
  var dec = new TextDecoder('utf-8')
  const text = dec.decode(s)
  console.log('From BLE ', text)
  if(text.includes('<*>')){
    const ts = text.substr(3,15).replace(/\s/g, '').split("<*>")
    const cmd = ts[0]
    const len = parseInt(ts[1])
    start(cmd, len)
    chunks = []
  } else if (text.includes('<^>')){
    const cmd = text.substr(3,15).replace(/\s/g, '')
    var s = ''
    chunks.forEach(function(chunk){
      s += chunk.substr(0,18)
    })
    //console.log('FROm BLE WHOLE')
    finish(s)
    chunks = []
  } else {
    tick()
    chunks.push(text)
  }
}

export const isWindow = () => {
  if (typeof window === "undefined" || typeof localStorage === "undefined") {
    return false
  }
  return true
}


