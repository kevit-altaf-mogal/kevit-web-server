console.log('Client side javascript file is loaded!')

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then(data=>{
//         console.log(data)
//     })
// })


// fetch('http://localhost:3000/weather?address=!').then((response)=>{
//     response.json().then(data=>{
//         if (data.error){
//             console.log('Error = ',data.error)
//         }else{
//             console.log('data',data)
//         }
//     })
// })

function fetchWeather(address,cb){
    fetch(address).then((response)=>{
    response.json().then(data=>{
      cb(data)
    })
})
}

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    let url = 'http://localhost:3000/weather?address=' + location
    fetchWeather(url,(res)=>{
        console.log(res)
       if (res.error){
            messageOne.textContent = res.error
            messageTwo.textContent = ''
       }else{
        messageOne.textContent = res.location
        messageTwo.textContent =  `It is currently ${res.forecastData.temperature} degress out. There is a ${res.forecastData.feelslike}% chance of rain.`
       }
    })
    
})

