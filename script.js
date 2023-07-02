// récupération de toutes les classes
const newGame = document.querySelector('.new_game');
const rollDice = document.querySelector('.roll_dice');
const holdDice = document.querySelector('.hold');
let dices = document.querySelectorAll('.dice');
let firstGamer = document.getElementById('first-game');
let secondGamer = document.getElementById('second-game');
let gameScore = document.getElementById('firt_game_score')
let playerOneGlobalScore = document.querySelector('.first_player .score');
let playerTwoGlobalScore = document.querySelector('.second_player .score');
let playerOneroundScore = document.querySelector('.current .score');
let playerTworoundScore = document.querySelector('.current-two .score');


let playerOneTurn = true;
let playerTwoTurn = false;

// On cache dans un premier temps le temoin(le point rouge) du joueur numéro deux 
secondGamer.style.visibility = 'hidden';

// Je rends le dés numéro 1 visible
document.getElementById('dice-1').style.visibility = 'visible';
        

rollDice.addEventListener('click', ()=>{
  diceRoll()
})
// Création d'une fonction contenant la fonction qui génère le nombre aléatoire
function diceRoll(max){
  let randomNumber = Math.floor(Math.random() * 6) + 1;
  let currentDice = document.getElementById(`dice-${randomNumber}`);
  currentDice.style.visibility = 'visible';

  // Je dis que si l'attribut id généré n'est pas celui généré par la fonction aléatoire on affiche pas le dé
  dices.forEach(dice => {
    if (dice.getAttribute('id') !== currentDice.getAttribute('id')) {
      dice.style.visibility = 'hidden';
    } 
  })

  // Si le dé généré est le dé numéro 1, le joueur passe sont tour et son score est réinitialisé à zéro et le tour passe à l'autre joueur sinon le joueur peut envoyer son score s'il veut.
  // Les variables playerOneTurn = false;  playerTwoTurn = true;
     
  if (playerOneTurn) {
    if(randomNumber === 1){
      playerOneroundScore.innerText = 0;
      playerOneTurn = false;
      playerTwoTurn = true;
      secondGamer.style.visibility = 'visible';
      firstGamer.style.visibility = 'hidden';
    }else{
       playerOneroundScore.innerText = parseInt(playerOneroundScore.innerText)+randomNumber;
    }
  } else if (playerTwoTurn) {
    if(randomNumber === 1){
      playerTworoundScore.innerText = 0;
      playerOneTurn = true;
      playerTwoTurn = false;
      secondGamer.style.visibility = 'hidden';
      firstGamer.style.visibility = 'visible';
    }else{
       playerTworoundScore.innerText = parseInt(playerTworoundScore.innerText)+randomNumber;
    }
  } 

}
  
// Fonction pour réinitialiser le jeu
newGame.addEventListener('click', ()=>{
  location.reload()
})

// Fonction pour lancer le dés
holdDice.addEventListener('click', ()=>{
  hold()
})

// Fonction pour envoyer le score du joueur qui le sohaite si son score est supérieur ou égale à 100.
function hold(){
  if (playerOneTurn) {
    playerOneGlobalScore.innerText = parseInt(playerOneGlobalScore.innerText) + parseInt(playerOneroundScore.innerText);
    playerOneroundScore.innerText = 0;

    if (parseInt(playerOneGlobalScore.innerText) >= 100) {
      alert(`Game Over. Le Player 1 à gagner`);
      location.reload();
    }else{
        playerOneTurn = false;
      playerTwoTurn = true;

      secondGamer.style.visibility = 'visible';
      firstGamer.style.visibility = 'hidden';
    }
  }else if (playerTwoTurn) {
    playerTwoGlobalScore.innerText = parseInt(playerTwoGlobalScore.innerText) + parseInt(playerTworoundScore.innerText);
    playerTworoundScore.innerText = 0;

    if (parseInt(playerTwoGlobalScore.innerText)>= 100) {
      alert(`Game Over. Le Player 2 à gagner`);
      location.reload();
    }else{
      playerOneTurn = true;
      playerTwoTurn = false;

      secondGamer.style.visibility = 'hidden';
      firstGamer.style.visibility = 'visible';
    }
  }
}
