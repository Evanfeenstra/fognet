# FogNet
[FogNet.me](https://fognet.me) | **Free internet via Bluetooth mesh**

[![FogNet](https://raw.githubusercontent.com/Evanfeenstra/fognet/master/static/img/fognet-screen.png)](https://vimeo.com/252654479)

 - See [fognet-server](https://github.com/Evanfeenstra/fognet-server) for the server portion of this app
 - See [fognet-arduino](https://github.com/Evanfeenstra/fognet-arduino) for Arduino code that runs the FogNet bluetooth router

### Future plans
 - separate react-iota Wallet component into an npm package
 - optimize ble throughput
 - upgrade to [Nordic nRF52840](http://www.nordicsemi.com/eng/Products/nRF52840) and true [mesh topology](https://www.bluetooth.com/bluetooth-technology/topology-options/le-mesh)
 - upgrade to [Teensy 3.6](https://www.pjrc.com/store/teensy36.html) and use onboard SD card instead of Redis for flash channel persistence
 - long-term: customizable FogNet-enabled website builder. User-created websites are rendered from simple json objects by a master React app "operating system". This will keep websites much smaller and enable faster loading over resource-constrained connections. Also will enable anyone to participate in FogNet and IOTA, and monetize their online content without any middlemen. Focus on:
   - online publishing
   - digital asset distribution (music, art, etc)
   - distributed social media and decentralized web advertising