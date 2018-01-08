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

export const API = async (url, options) => {
  try {
    let response = await fetch('http://fognet.sg3npvvuir.us-west-2.elasticbeanstalk.com/' + url, options)
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

const BleReturns = {
  web: function(msg){
    console.log('ALL DA WAY AROuND!!',msg)
  }
}

var chunks = []
export const decode = (s) => {
  var dec = new TextDecoder('utf-8')
  const text = dec.decode(s)
  console.log('From BLE ', text)
  if(text.includes('<*>')){
    const cmd = text.substr(3,15).replace(/\s/g, '')
    chunks = []
  } else if (text.includes('<^>')){
    const cmd = text.substr(3,15).replace(/\s/g, '')
    var s = ''
    chunks.forEach(function(chunk){
      s += chunk.substr(0,18)
    })
    //BleReturns[cmd](s)
    console.log('FROm BLE WHOLE', s)
    chunks = [] 
  } else {
    chunks.push(text)
  }
}

export const isWindow = () => {
  if (typeof window === "undefined" || typeof localStorage === "undefined") {
    return false
  }
  return true
}


