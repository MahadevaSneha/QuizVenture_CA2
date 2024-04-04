const questions = [
    {
        question: "Which tag is used to link two web pages?",
        options: ["<link>", "<a>", "<hyperlink>", "<button>"],
        correctAnswer: "<a>"
    },
    {
        question: "Which tag is used to define an unordered list in HTML?",
        options: ["<ul>", "<ol>", "<li>", "dl"],
        correctAnswer: "<ul>"
    },
    {
        question: "Which attribute is used to specify an alternate text for an image in HTML?",
        options: ["src", "alt", "title", "href"],
        correctAnswer: "alt"
    },
    {
        question: "Which HTML element is used to define the title of a document?",
        options: ["<head>", "<title>", "<h1>", "<header>"],
        correctAnswer: "<title>"
    },
    {
        question: "What is the correct HTML element for inserting a line break?",
        options: ["<lb>", "<break>", "<br>", "<newline>"],
        correctAnswer: "<br>"
    }
];

const time = 60;
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = time;
let timerInterval;
const qElem = document.getElementById("questions");
const oElem = document.getElementById("options");
const timeLeftElem = document.getElementById("time-left");
const scoreElem = document.getElementById("score-value");
const gameOverScreen = document.getElementById("game-over-screen");
const gameOverMessage = document.getElementById("game-over-message");
const nextButton = document.getElementById("next-button");
const bgMusic=document.getElementById("background-music");
document.body.addEventListener("click",playBackgroudMusic);

showQuestions();
nextButton.addEventListener("click", handleNextButtonClick);
startTimer();

function showQuestions() {
    const currentQuestion = questions[currentQuestionIndex];
    qElem.textContent = currentQuestion.question;
    oElem.innerHTML = "";
    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option-btn");
        button.addEventListener("click", handleAnswerClick);
        oElem.appendChild(button);
    });
}

function handleAnswerClick(event) {
    clearInterval(timerInterval);
    const selectedButton = event.target;
    const selectedAnswer = selectedButton.textContent;
    const currentQuestion = questions[currentQuestionIndex];
    const buttons = oElem.querySelectorAll(".option-btn");

    buttons.forEach(button => {
        if (button.textContent === currentQuestion.correctAnswer) {
            button.style.backgroundColor = "green";
            button.style.color = "white";
        } else {
            button.style.backgroundColor = "red";
            button.style.color = "white";
        }
        button.disabled = true;
    });

    if (selectedAnswer === currentQuestion.correctAnswer) {
        score++;
        updateScore();
        document.getElementById("correct-sound").play();
    } else {
        document.getElementById("incorrect-sound").play();
    }
    nextButton.classList.remove("hidden");
}

function handleNextButtonClick() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        nextButton.classList.add("hidden");
        resetTimer();
        showQuestions();
    } else {
        endGame();
    }
}

function startTimer() {
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    timeLeft--;
    timeLeftElem.textContent = timeLeft;
    if (timeLeft === 0) {
        clearInterval(timerInterval);
        endGame();
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    timeLeft = time;
    timeLeftElem.textContent = timeLeft;
    startTimer();
}

function updateScore() {
    scoreElem.textContent = score;
}
function endGame() {
    document.getElementById("background-music").pause();
    gameOverScreen.classList.remove("hidden");
    if(score === questions.length){
    gameOverMessage.textContent = "Congratulations! You answered all questions correctly!";
    gameOverMessage.style.color="white";
    }
    else{
        gameOverMessage.textContent="You didn't answer all questions correctly.Reattempt this quiz!!";
        gameOverMessage.style.color="white";
        const reattemptButton=document.createElement("button");
        reattemptButton.textContent="Reattempt Quiz";
        reattemptButton.addEventListener("click",reattemptQuiz);
        gameOverScreen.appendChild(reattemptButton);
    }
}
function reattemptQuiz(){
    gameOverScreen.classList.add("hidden");
    currentQuestionIndex=0;
    score=0;
    timeLeft=time;
    showQuestions();
    startTimer();
    updateScore();
}
function playBackgroudMusic(){
    if(bgMusic.paused){
        bgMusic.play();
    }
}