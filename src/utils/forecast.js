const request = require('postman-request')


const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=5311cbe28b8ec68c95b0ecd0d56c6897&query=' + latitude + ',' + longitude
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("unable to connect", undefined)
        } else if (body.error) {
            callback("check url", undefined)
        } else {
            const data = body
            callback(undefined, {
                temperature: data.current.temperature
            })
        }
    })
}


module.exports = forecast


// `It is currntly ${data.current.temperature} degress out. It feels like ${data.current.feelslike} degress out.`