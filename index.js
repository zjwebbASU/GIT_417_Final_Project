"use strict";

const modeBtn = document.getElementById("mode-btn");
const nameInput = document.getElementById("name");
const commentsInput = document.getElementById("comments");
const phoneRadio = document.getElementById("phone-pref");
const emailRadio = document.getElementById("email-pref");
const phoneInput = document.getElementById("phone");
const emailInput = document.getElementById("email");
const submitBtn = document.getElementById("submit-btn");

const game = document.getElementById("game-left");
const gameTitle = document.getElementById("game-title");
const gameGuess = document.getElementById("game-guess");
const gameResults = document.getElementById("game-results");
const guessInput = document.getElementById("guess");

modeBtn.addEventListener("click", function(){ /*this function toggles light and dark mode*/
    document.body.classList.toggle("dark-mode");
});

function formRequirements(){  /*this function checks the phone and email radios to make sure one is checked*/
    if(phoneRadio.checked){
        phoneInput.required = true;
        emailInput.required = false;
    }else if(emailRadio.checked){
        emailInput.required = true;
        phoneInput.required = false;
    }else{
        phoneInput.required = false;
        emailInput.required = false;
    }
};

phoneRadio.addEventListener("change", formRequirements);
emailRadio.addEventListener("change", formRequirements);
formRequirements();

function validateForm(e){ /*This function ensures the user inputs the required fields with valid data*/

    e.preventDefault();

    let outputP = document.getElementById("outputP");
    const emailRegex = /^.+@.+\.com$/;
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
    let messages = [];

    if(!nameInput.value){
        messages.push("Full name is required. ");
    }

    if(!phoneRadio.checked && !emailRadio.checked){
        messages.push("Please select a contact preference. ")
    }

    if(phoneRadio.checked){
        if(!phoneInput.value){
            messages.push("Phone number is required. ");
        }else if(!phoneRegex.test(phoneInput.value)){
            messages.push("Invalid phone number. ")
        }
    }
    
    if(emailRadio.checked){
        if(!emailInput.value){
            messages.push("Email is required. ")
        }else if(!emailRegex.test(emailInput.value)){
            messages.push("Invalid Email Address. ");
            
        }
    }

    if(!commentsInput.value){
        messages.push("Comments are required.");
    }

    if(messages.length > 0){
        outputP.innerHTML = messages.join("<br>");
        outputP.classList.add("error");
        return;
    }

    outputP.classList.remove("error");

    const customer = {
        name: nameInput.value,
        phone: phoneInput.value,
        email: emailInput.value,
        comments: commentsInput.value
    }

    outputP.innerHTML = `
        Thanks for your interest!<br>
        Name: ${customer.name}<br>
        Phone: ${customer.phone}<br>
        Email: ${customer.email}<br>
        Comments: ${customer.comments}
    `
}

submitBtn.addEventListener("click", validateForm);

game.addEventListener("submit", function(e){ /*This function takes a number 1 to 10 from a user and compares it to a random number 1 to 10*/
    e.preventDefault();

    const userGuess = Number(guessInput.value);
    const winningNumber = Math.floor(Math.random() * 10) +1;

    if(userGuess === winningNumber){
        gameTitle.textContent = "You Won!";
        gameGuess.textContent = `Your Guess: ${userGuess}`;
        gameResults.textContent = `Winning Number: ${winningNumber}`;
    }else{
        gameTitle.textContent = "Try Again!";
        gameGuess.textContent = `Your Guess: ${userGuess}`;
        gameResults.textContent = `Winning Number: ${winningNumber}`;
    }
})