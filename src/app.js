// const geocode = (address, callback) => {
//     const url = 'https://www.mapquestapi.com/geocoding/v1/address?key=KP1SpT7ePcBfMb0yjOtvbqAYNPlBerBP&location=' + address
//     request({ url, json: true }, (error, { body }) => {
//         if (error) {
//             callback("unable to connect", undefined)
//         } else if (body.info.statuscode == 400) {
//             callback("check url", undefined)

//         } else {
//             callback(undefined, {
//                 latitude: body.results[0].locations[0].latLng.lat,
//                 longitude: body.results[0].locations[0].latLng.lng
//             })
//         }
//     })


// }


// const forecast = (latitude, longitude, callback) => {
//     const url = 'http://api.weatherstack.com/current?access_key=5311cbe28b8ec68c95b0ecd0d56c6897&query=' + latitude + ',' + longitude
//     request({ url, json: true }, (error, { body }) => {
//         if (error) {
//             callback("unable to connect", undefined)
//         } else if (body.error) {
//             callback("check url", undefined)
//         } else {
//             const data = body
//             callback(undefined, `It is currntly ${data.current.temperature} degress out. It feels like ${data.current.feelslike} degress out.`)
//         }
//     })
// }



const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const request = require('postman-request')

const port = process.env.PORT || 3001

const viewsPath = path.join(__dirname, '../templates/views')
const publicDirectoryPath = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'weather',
        name: 'IRB'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about me',
        name: 'IRB'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: "call to this no. 9981",
        name: 'IRB'

    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send('please provide the address')
    } else {
        geocode(req.query.address, (error, { latitude, longitude } = {}) => {
            if (error) {
                res.send(error)
            } else {
                console.log(`latitude : ${latitude} longitude : ${longitude}`)

                forecast(latitude, longitude, (error, forecastdata) => {
                    if (error) {
                        console.log(error)
                    } else {
                        res.send(forecastdata)
                    }


                })

            }
        })
    }
})



app.listen(port, () => {
    console.log("listening at " + port)
})



// app.get('/product', (req, res) => {
//     if (!req.query.search) {
//         return res.send({
//             error: 'You must provide a search term'
//         })
//     }
//     console.log(req.query.search)
//     res.send({
//         product: []
//     })
// })

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'IRB',
        errormessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'IRB',
        errormessage: 'page not found'
    })
})



// app.listen(3000, () => {
//     console.log("listening")
// })


















// app.get('', (req, res) => {
//     res.send("Hello express!")
// })

// app.get('/help', (req, res) => {
//     res.send("call to this 9981")
// })

// app.get('/about', (req, res) => {
//     res.send("learner")
// })

// app.get('/weather', (req, res) => {
//     res.send('Summer')
// })