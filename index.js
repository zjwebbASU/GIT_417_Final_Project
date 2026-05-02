"use strict";

const modeBtn = document.getElementById("mode-btn");

modeBtn.addEventListener("click", function(){
    document.body.classList.toggle("dark-mode");
})