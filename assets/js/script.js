const start = document.querySelector('#start');
start.addEventListener('click', init);

const startScreen = document.querySelector('#start-screen');
const questionScreen = document.querySelector('#questions');
const endScreen = document.querySelector('#end-screen');
const timerDisplay = document.querySelector('#time');
const finalScore = document.querySelector('#final-score');
const sendInitials = document.querySelector('#initials');


const submitButton = document.querySelector('#submit');
submitButton.addEventListener('click', storeData);

const correctSound = new Audio('./assets/sfx/correct.wav');
const incorrectSound = new Audio('./assets/sfx/incorrect.wav')

const feedback = document.querySelector('#feedback');

let timeCount;
let timer;
let choiceBox = document.querySelector('#choices');
let questionNum = 0;
let score = 0;
let storedItems = [];


function init() {
    startScreen.classList.remove('start');
    startScreen.classList.add('hide');

    questionScreen.classList.remove('hide');

    timeCount = 10;
    startTimer();    
    generateQuestion();
}

function startTimer() {
    
    timer = setInterval(function() {        
        timerDisplay.textContent = timeCount;
        timeCount--;
        if (timeCount < 0) {
            timerDisplay.textContent = 0 ;
            endgame();
        }
    }, 1000);
    
}

function generateQuestion() {
    let question = questionList[questionNum]; 
    document.querySelector('#question-title').textContent = question.title;
    choiceBox.innerHTML = '';

    for (let i = 0; i < question.choices.length; i++) {
        let choiceButton = document.createElement('button');
        choiceButton.textContent = question.choices[i];
        choiceBox.appendChild(choiceButton);
    }
}

choiceBox.addEventListener("click", function(event) {

    let button = event.target

    if (timeCount === 0) {
        return;
    }
    let answer = questionList[questionNum].correctAnswer;
    let correctButton = questionList[questionNum].choices[answer];
    
    if (button.textContent === correctButton) {
        questionNum++;
        score++;
        correctSound.play();
        displayFeedback('Correct Answer!')

        if(questionNum < questionList.length) {
            generateQuestion();
        } else {
            endgame();
        }
    } else {
        incorrectSound.play();
        timeCount -= 3;
        displayFeedback('Wrong Answer!')

    }
})

function endgame() {
    clearInterval(timer);
    questionScreen.classList.add('hide');
    endScreen.classList.remove('hide');
    finalScore.textContent = score;
}

function storeData() {
    let textInitials = sendInitials.value.toUpperCase();
    if (textInitials !== '') {
    storedItems = JSON.parse(localStorage.getItem('highscore')) || [];
    storedItems.push(`${textInitials} - ${score}`);
    localStorage.setItem('highscore', JSON.stringify(storedItems));
    window.location.href = 'highscores.html';
    } else {
        displayFeedback('PLease type your initials.')
    }
}

function displayFeedback(message) {

    feedback.textContent = message;
    feedback.classList.remove('hide');
    
    setTimeout(function() {
        feedback.classList.add('hide');
    }, 1000);
}
