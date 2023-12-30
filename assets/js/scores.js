const scoreList = document.querySelector('#highscores');
const clearScore = document.querySelector('#clear');
clearScore.addEventListener('click', clearEvent);

function getScore () {
    let storedScore = JSON.parse(localStorage.getItem('highscore'));

    if (storedScore) {
        descendingScore(storedScore);
        
    for (let i = 0; i < storedScore.length; i++) {
        let newList = document.createElement('li');
        newList.textContent = storedScore[i];
        scoreList.appendChild(newList);
    }} else {
        return;
    }
}

function descendingScore (item) {
    item.sort((a, b) => {
        const scoreA = parseInt(a.split(" - ")[1]);
        const scoreB = parseInt(b.split(" - ")[1]);
        return scoreB - scoreA;
    });
}


getScore();

function clearEvent() {
    scoreList.innerHTML = '';
    localStorage.clear();
}


