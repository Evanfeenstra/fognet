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
export const isWindow = () => {
  if (typeof window === "undefined" || typeof localStorage === "undefined") {
    return false
  }
  return true
}

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
  url: 'hi'
}







