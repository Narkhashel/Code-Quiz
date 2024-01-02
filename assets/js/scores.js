//js file to take care of logic of highscore page
const scoreList = document.querySelector('#highscores');
const clearScore = document.querySelector('#clear');

// Function to 
function getScore () {
    let storedScore = JSON.parse(localStorage.getItem('highscore'));

    if (storedScore) {
        descendingScore(storedScore);
    // For loop to create score list from local storage    
    for (let i = 0; i < storedScore.length; i++) {
        let newList = document.createElement('li');
        newList.textContent = storedScore[i];
        scoreList.appendChild(newList);
    }} else {
        return;
    }
}
// Function to create descending score list
function descendingScore (item) {
    item.sort((a, b) => {
        const scoreA = parseInt(a.split(" - ")[1]);
        const scoreB = parseInt(b.split(" - ")[1]);
        return scoreB - scoreA;
    });
}
//Display score list automatically
getScore();

function clearEvent() {
    scoreList.innerHTML = '';
    localStorage.clear();
}
// Event to clear score list 
clearScore.addEventListener('click', clearEvent);
