console.log('hello there')

const resultText = document.querySelector('#resultText')

const buttonD6 = document.querySelector('#buttonD6')

const buttonD10 = document.querySelector('#buttonD10')

const NUMBER = 6

// Some function to make a request when we push the button.

// the function makes a request to our server
// gets response and updated the Result text.

function responseHandler () {

  console.log(this.responseText)
  const parsedData = JSON.parse(this.responseText)
  console.log(parsedData)

  let stringToDisplay = parsedData.number + " out of a maximum of " + parsedData.maxNumber + " with added bonus data of: " + parsedData.someFluff + parsedData.aThirdThing
  resultText.textContent = stringToDisplay;

}

function onClick () {

  let value = this.id
  let valuesArray = value.split('D')
  let maxNo = valuesArray[1]

  console.log('clicked!')
  // make new request
  let request = new XMLHttpRequest()

  // add event listener (response Handler)
  request.addEventListener("load", responseHandler);

  // define url
  var url = "/random/" + maxNo

  // open, say it's a get request
  request.open('GET', url)

  //send
  request.send()

}

buttonD6.addEventListener('click', onClick)
buttonD10.addEventListener('click', onClick)