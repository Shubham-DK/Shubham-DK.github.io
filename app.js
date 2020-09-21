/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer;

/* Initilizing the Game */
InitGame();

/*Handling Roll Dice button click */
document.querySelector('.btn-roll').addEventListener('click',function(){

    var dice = Math.floor(Math.random()*6) +1;
    var diceDOM = document.querySelector('.dice');

    /* 1. Bring the dice pic and Change the dice picture as per dice number */
    diceDOM.style.display = 'block';
    diceDOM.src ='dice-' + dice + '.png';

    /* 2. Updating Current Score of the active Player*/
    roundScore +=dice;
    document.querySelector('#current-' + activePlayer).textContent = roundScore;

    /* 3. Adding roundScore to TotalScore */
    /*Get the Current total score of a player */
    var TotalScore = document.querySelector('#score-'+activePlayer).textContent;

    if (dice === 1)
    {
        roundScore =0;
        document.querySelector('#current-' + activePlayer).textContent = 0;
        TotalScore += 0;
        /*Switching of active Player */
        nextPlayer();
    }
    

})

/*Handling Hold button Click */
document.querySelector('.btn-hold').addEventListener('click',function(){

    /*1. Addition of roundscore to total score and making current score back to zero*/
    scores[activePlayer]+=roundScore;
    document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];
    roundScore =0;
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
    /* Checking if player won the game */
    if(scores[activePlayer] >= 20){
        document.querySelector('#name-' + activePlayer ).textContent= 'Winner!!';
        document.querySelector('.player-' + activePlayer +'-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer +'-panel').classList.remove('active');
        document.querySelector('.dice').style.display = 'none';
    }
    else{
    /*2. Switching of active Player */
    nextPlayer();
}
})

/*New Game Button Functionality */
document.querySelector('.btn-new').addEventListener('click',InitGame);


function nextPlayer(){
    document.querySelector('.player-'+ activePlayer + '-panel').classList.remove('active')
        activePlayer === 0 ? activePlayer =  1 : activePlayer=0;
        document.querySelector('.player-'+ activePlayer + '-panel').classList.toggle('active')
        document.querySelector('.dice').style.display = 'none';
}

function InitGame(){
    console.log("Inside Game Reset Function!!");

    scores =[0,0];
    roundScore = 0;
    activePlayer =0;

    /*Making Global score as zero*/
    var globalscores = document.querySelectorAll('.player-score');
    globalscores.forEach( element => {
        console.log(element);
        element.textContent = 0;
    })
    var currentscores = document.querySelectorAll('.player-current-score');
    currentscores.forEach( element => {
        console.log(element);
        element.textContent = 0;
    })
    
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.player-0-panel').classList.add('active');
    document.getElementById('name-0').textContent='PLAYER 1';
    document.getElementById('name-1').textContent='PLAYER 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

}