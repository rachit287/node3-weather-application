// const passion = 'what you love';
// console.log(`You got to be obsessed with ${passion}`);

// fetch('http://puzzle.mead.io/puzzle').then((response) =>{
//     response.json().then((data) => {
//         console.log(data);
//     })
// })


const weatherForm = document.querySelector('form'); 
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');


weatherForm.addEventListener('submit',(e) =>{
    e.preventDefault();

    const location = search.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) =>{
        if(data.error)
        {
            messageOne.textContent = data.error;
        }
        else{
           messageOne.textContent = "";
            messageTwo.textContent = `The place is ${data.address}. There is ${data.forecast.howItIs.toLowerCase()} in the air, the temperature is ${data.forecast.temperature} and there is ${data.forecast.precip} percent chance of rain.`;

        }
    })
})
})

//main string for forecast output to play around 
// `The place is ${data.address}. There is ${data.forecast.howItIs.toLowerCase()} in the air, the temperature is ${data.forecast.temperature} and there is ${data.forecast.precip} percent chance of rain.`;