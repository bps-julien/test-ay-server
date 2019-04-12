const genderButtons = document.querySelectorAll('.field-col-3 button')
const optionButtons = document.querySelectorAll('.field-col-2 button')
const dayButtons = document.querySelectorAll('.field-col-7 button')
const inputs = document.querySelectorAll('form input')
const form = document.querySelector('form')

let gender = ""
let options = []
let days = []

genderButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        genderButtons.forEach((button) => {
            button.classList.remove('selected')
        })
        button.classList.add('selected')
        gender = button.textContent
    })
})

optionButtons.forEach(button => {
    button.addEventListener('click', () => {
        if(button.classList.contains('selected')) {
            const index = options.indexOf(button.textContent)
            options.splice(index, 1)
            button.classList.remove('selected')
        }
        else {
            options.push(button.textContent)
            button.classList.add('selected')
        }
    })
})

dayButtons.forEach(button => {
    button.addEventListener('click', () => {
        if(button.classList.contains('selected')) {
            const index = days.indexOf(button.textContent)
            days.splice(index, 1)
            button.classList.remove('selected')
        }
        else {
            days.push(button.textContent)
            button.classList.add('selected')
        }
    })
})

form.addEventListener('submit', event => {
    event.preventDefault()
    const data = {
        gender,
        options,
        days,
    }
    inputs.forEach(input => {
        data[input.name] = input.value
    })
    fetch('/api/users',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data),
    }).then(response => {
        if(!response.ok) {
            response.text().then(text => console.log(text))
        }
        return response.json()
    }).then(json => {
        console.log(json)
    })
    .catch(err => {
    })
    return false
})