const crypto = require('crypto')

const keyGen = length => {
    var charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ9'
    var values = crypto.randomBytes(length)
    var result = new Array(length)
    for (var i = 0; i < length; i++) {
        result[i] = charset[values[i] % charset.length]
    }
    return result.join('')
}

export default keyGen