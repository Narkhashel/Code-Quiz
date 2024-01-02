const start = document.querySelector('#start');
const startScreen = document.querySelector('#start-screen');
const questionScreen = document.querySelector('#questions');
const endScreen = document.querySelector('#end-screen');
const timerDisplay = document.querySelector('#time');
const finalScore = document.querySelector('#final-score');
const sendInitials = document.querySelector('#initials');
const submitButton = document.querySelector('#submit');
const feedback = document.querySelector('#feedback');
const correctSound = new Audio('./assets/sfx/correct.wav');
const incorrectSound = new Audio('./assets/sfx/incorrect.wav')
const choiceBox = document.querySelector('#choices');

let timeCount;
let timer; 
let score = 0;
let storedItems = [];
let usedQuestionNumbers = [];
let questionNum = 0;

//
function init() {
    startScreen.classList.remove('start');
    startScreen.classList.add('hide');
    questionScreen.classList.remove('hide');
    timeCount = 45;
    startTimer(); 
    questionList.sort(()=> Math.random()-0.5);   
    generateQuestion();
}
//
function startTimer() {
    timer = setInterval(function() {        
        timerDisplay.textContent = timeCount;
        timeCount -= 1;
        if (timeCount < 0) {
            timerDisplay.textContent = 0 ;
            endgame();
        }
    }, 1000);
}

//
function generateQuestion(i) {
    let question = questionList[questionNum]; 
    document.querySelector('#question-title').textContent = question.title;
    choiceBox.innerHTML = '';

    for (let i = 0; i < question.choices.length; i++) {
        let choiceButton = document.createElement('button');
        choiceButton.textContent = question.choices[i];
        choiceBox.appendChild(choiceButton);
    }
}
//
function endgame() {
    clearInterval(timer);
    questionScreen.classList.add('hide');
    endScreen.classList.remove('hide');
    finalScore.textContent = score;
}

function displayFeedback(message) {
    feedback.textContent = message;
    feedback.classList.remove('hide');
        setTimeout(function() {
        feedback.classList.add('hide');
    }, 1000);
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

//
choiceBox.addEventListener("click", function(event) {
    let button = event.target
    let answer = questionList[questionNum].correctAnswer;
    let correctButton = questionList[questionNum].choices[answer];
    
    if (button.textContent === correctButton) {
        score += 1;
        correctSound.play(); 
        displayFeedback('Correct Answer!')
    } else {
        incorrectSound.play();
        timeCount -= 3;
        displayFeedback('Wrong Answer!')
    }

    if(questionNum !== questionList.length - 1) {
        questionNum += 1;
        generateQuestion();           
    } else {
        endgame();
    }
})

start.addEventListener('click', init);

submitButton.addEventListener('click', storeData);