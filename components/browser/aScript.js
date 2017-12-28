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
      parent.postMessage(JSON.stringify({fognetHref:href}),'*')
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
    let response = await fetch('http://localhost:9000/' + url, options)
    let responseJson = await response.json()
    return responseJson
  } catch (error) {
    console.error(error)
  }
}