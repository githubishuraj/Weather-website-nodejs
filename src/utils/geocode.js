const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://www.mapquestapi.com/geocoding/v1/address?key=KP1SpT7ePcBfMb0yjOtvbqAYNPlBerBP&location=' + address
    request({ url, json: true }, (error, { body }) => {

        if (error || body == undefined) {
            callback("unable to connect", undefined)
        } else if (body.info.statuscode == 400) {
            callback("check url", undefined)

        } else {
            callback(undefined, {
                latitude: body.results[0].locations[0].latLng.lat,
                longitude: body.results[0].locations[0].latLng.lng
            })
        }
    })


}

module.exports = geocode