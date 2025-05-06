//game setup
const gameArea = document.getElementById("game-area");
const inputBox = document.getElementById("input-box");
const scoreDisplay = document.getElementById("score");
const livesDisplay = document.getElementById("lives");

let bubbles = [];
let score = 0;
let lives=10;

// Generate a random lowercase letter
function getRandomLetter() {
    const letters = "abcdefghijklmnopqrstuvwxyz";
    return letters[Math.floor(Math.random() * letters.length)];
}

function createBubble() {
    const bubble = document.createElement("div");
    bubble.classList.add("bubble");

    const letter = getRandomLetter();
    bubble.textContent = letter;
    bubble.dataset.letter = letter;

    gameArea.appendChild(bubble);

    const bubbleWidth = bubble.offsetWidth;
    const maxLeft = gameArea.offsetWidth - bubbleWidth;

    bubble.style.left = Math.random() * maxLeft + "px";
    bubble.style.top = "0px";

    bubbles.push(bubble);
}

function moveBubbles() {
    for (let i = bubbles.length - 1; i >= 0; i--) {
        const bubble = bubbles[i];
        let top = parseInt(bubble.style.top);
        if (top > gameArea.offsetHeight) {
            gameArea.removeChild(bubble);
            bubbles.splice(i, 1);
            continue;
        }
        bubble.style.top = top + 2 + "px";
    }
}

function checkInput() {
    const typed = inputBox.value.trim().toLowerCase();
    if (typed.length === 0) return;

    for (let i = 0; i < bubbles.length; i++) {
        if (bubbles[i].dataset.letter === typed) {
            gameArea.removeChild(bubbles[i]);
            bubbles.splice(i, 1);
            inputBox.value = "";
            score++;
            scoreDisplay.textContent = "Score: " + score;
            break;
        }
      
    }
    inputBox.value = ""; 
}

inputBox.addEventListener("input", checkInput);

setInterval(createBubble, 700); 
setInterval(moveBubbles, 50);   