//console.log("HELLO")

// fetch('http://localhost:3001/weather?address=' + location).then((response) => {

//     response.json().then((data) => {
//         console.log(data)
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message = document.querySelector('#message')

//message.textContent = 'From javascript'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            message.textContent = JSON.stringify(data)
        })
    })
})