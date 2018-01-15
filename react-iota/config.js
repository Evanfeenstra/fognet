// const prod = process.env.NODE_ENV === 'production'
const prod = false

export default {
  API: prod
    ? "https://satoshipay.iotaledger.net/"
    : "http://localhost:8081/",//'http://Lyle.local:8081/',//"http://localhost:8081/",
  //ADDRESS: `GQMHDLS9XPSNURUCPKKJJTULZRPH9WSKUKQQQPJOY9CPRCNAUSIFWCLHVDSUHJJCPMQDARUIFFXKXFVQD`,
  IOTA: prod ? "https://node.tangle.works" : "https://testnet140.tangle.works:443",
  PROD: prod ? true : false,
  SECURITY: 2,
}
//http://52.58.212.188:14700



// ADDRESS is the receiving address of the server flash channel




//https://testnet140.tangle.works:443


//http://p101.iotaledger.net:14700