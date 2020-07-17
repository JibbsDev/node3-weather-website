

const weatherForm = document.querySelector('form')
const searchElelemnt = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')
weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    const location = searchElelemnt.value
    const url = 'http://localhost:3000/weather?address='+location
    fetch(url).then((response) =>{

    response.json().then((data) => {

        if(data.Error){
            return messageOne.textContent =data.Error
        }
        else{
            messageOne.textContent =data.location
            messageTwo.textContent = data.forecast
        }
    })
})
})