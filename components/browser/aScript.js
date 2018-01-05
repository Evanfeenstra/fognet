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

export const BleChunk = (s) => {
  var enc = new TextEncoder('utf-8')
  const num = Math.ceil(s.length / 18)
  const chunks = []
  for(var i=0; i<num; i++){
    var sub = s.substr(i*18, 19)
    const chunk = enc.encode(sub)
    chunks.push(chunk)
  }
  //const bytes = enc.encode(s)
  const start = enc.encode('<start>')
  const done = enc.encode('<done>')
  return [start, ...chunks, done]
}








