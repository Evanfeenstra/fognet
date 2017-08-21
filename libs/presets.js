const prod = process.env.NODE_ENV === 'production'

export default  {
    API: prod
      ? 'https://iotapay-server.now.sh/'
      : 'http://localhost:9000/',
      ADDRESS: `TRPSU9DSNROHLCPIXBXGDXPOLKPUOYZZBZJCEILRJNSIFZASLPKHCIDIDBRCJHASMENZMTICJMBZRANKM`,
      IOTA: prod
      ? 'http://52.58.212.188:14700'
      : 'http://52.58.212.188:14700',
  }