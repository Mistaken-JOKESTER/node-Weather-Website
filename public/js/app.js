console.log('clinet side java script is loading')

const weatherFrom = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')


weatherFrom.addEventListener('submit', (e)=>{
    e.preventDefault()
    
    messageOne.textContent = 'loading.................'
    messageTwo.textContent = ''
    messageThree.textContent = ''
    messageFour.src = ""
    messageFour.alt = ""
    
    const location = search.value
    const url = '/weather?address=' + (location)
    
    fetch(url).then((response)=>{
        response.json().then((data)=>{

             if(data.error){ 
                messageOne.textContent = data.error
            } else {

                console.log(data)
                console.log(data.temp, data.humidity, data.discription)
                if(data){
                messageOne.textContent = data.location
                messageTwo.textContent = data.discription
                messageThree.textContent = 'Temperature is ' + data.temp + ' and humidity is ' + data.humidity
                messageFour.src = "http://openweathermap.org/img/w/" + data.icon + ".png"
                messageFour.alt = "icon"
                }

            }
         })
    })
})


// http://localhost:3000/weather?address=12what