// Elements
const button = document.querySelector('#button');
const input = document.querySelector('#input');
const answer = document.querySelector('#answer');
const error = document.querySelector('#error');

// API 
const API_URL = 'https://yesno.wtf/api';

let requestInProgress = false;

function setRequestInProgress(value) {
    requestInProgress = value;
}

function disableButton(isDisabling) {
    if (isDisabling) {
        button.setAttribute('disabled', 'disabled');
    } else {
        button.removeAttribute('disabled');
    }
}

function clearResponse() {
    setTimeout(function() {
        answer.innerHTML = '';
        input.value = '';
        setRequestInProgress(false);
        disableButton(false);
    }, 4500);
}

function displayAnswer(answerUrl) {
    setTimeout(function() {
        answer.innerHTML = `<img src="${answerUrl}" width="600px" height="400px">`;
        clearResponse();
    }, 1000);
}

function displayError() {
    error.innerHTML = 'You Must Write Something First';

    setTimeout(function() {
        error.innerHTML = '';
    }, 1000);
}

function setIsRequestInProgress(value) {
    requestInProgress = value;
}

function setDisableButtonState(isDisabling) {
    if (isDisabling) {
        button.setAttribute('disabled', 'disabled');
    } else {
        button.removeAttribute('disabled');
    }
}

function getAnswer() {
    if (requestInProgress) return;
    if (!input.value) return displayError();

    fetchAnswer();
}

function handleKeyEnter(e) {
    if (e.keyCode === 13) {
        getAnswer();
    }
}

button.addEventListener('click', getAnswer);

async function fetchAnswer() {
    setIsRequestInProgress(true);

    setDisableButtonState(true);

    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        displayAnswer(data.image);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
