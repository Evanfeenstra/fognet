import registerWebworker from 'webworker-promise/lib/register'
import {actions} from './actions'

registerWebworker(async (m) => actions[m.cmd](m))

// changes to curl.js
// var canvas = new OffscreenCanvas(300, 150) instead of document.createElement('canvas')
// global.curl instead of window.curl
// added a "var" to states? (line 5830)