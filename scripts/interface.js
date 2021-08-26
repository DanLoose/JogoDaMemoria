const FRONT = "front-card";
const BACK = "back-card";
const CARD = "card";
const ICON = "icon";
const FLIP = "flip";


startGame();

function startGame(){
    
    initializeCards(game.createCardsFromTechs());
}

function initializeCards(cards){
    let gameBoard = document.getElementById("gameBoard");
    gameBoard.innerHTML = '';
    game.cards.forEach(card => {

        let cardElement = document.createElement('div');
        cardElement.id = card.id;
        cardElement.classList.add(CARD);
        cardElement.dataset.icon = card.icon;

        createCardContent(card, cardElement);

        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
        

    })
}


function createCardContent(card, cardElement){

    createCardFace(FRONT, card, cardElement);
    createCardFace(BACK, card, cardElement);

}


function createCardFace(face, card, element){
    let cardElementeFace = document.createElement('div');
    cardElementeFace.classList.add(face);
    if(face === FRONT) {
        let iconElement = document.createElement('img');
        iconElement.classList.add(ICON);
        iconElement.src = "./Assets/images/" + card.icon + ".png";
        cardElementeFace.appendChild(iconElement);
    }else {
        cardElementeFace.innerHTML = "&lt/&gt";
    }
    element.appendChild(cardElementeFace);
}


function flipCard(){

    if(game.setCard(this.id)){

        this.classList.add("flip");
        
        if(game.secondCard){
            if(game.checkMatch()){
                game.clearCards();
                if(game.checkGameOver()){
                    setTimeout(() => {
                        let gameOverLayer = document.getElementById("gameOver");
                         gameOverLayer.style.display = 'flex';
                    }, 500);
                }
            }else{
                
                setTimeout(() => {
                    let firstCardView = document.getElementById(game.firstCard.id);
                    let secondCardView = document.getElementById(game.secondCard.id);
    
                    firstCardView.classList.remove(FLIP);   
                    secondCardView.classList.remove(FLIP);
                    game.unflipCards();
                }, 1000);
            }
        }
    }
}


function restart(){
    startGame();
    let gameOverLayer = document.getElementById("gameOver");
    gameOverLayer.style.display = "none";
}