let game = {

    //variaveis de controle
    lockmode: false,
    firstCard: null,
    secondCard: null,
    cards: null,

    // =========== INICIALIZAÇÃO DAS CARTAS DO JOGO ===============

    //Cars do jogo da memória - insira o nome da imagem
    techs: ['bootstrap',],

    
    // Cria os cards com base no array anterior     
    createCardsFromTechs: function () {

        this.cards = [];

        for(let tech of this.techs){
            this.cards.push(this.createPairFromTech(tech));
        }

        this.cards = this.cards.flatMap(pair=>pair);
        this.shuffleCards();
        return this.cards;
    },

    //Pega cada carta criada e duplica, gerando pares
    createPairFromTech: function (tech){

        return[{
            id: this.createIdWithTech(tech),
            icon: tech,
            flipped: false,
        }, {
            id: this.createIdWithTech(tech),
            icon: tech,
            flipped: false,
        }]

    },

    // gera um id randomico para cada carta do jogo
    createIdWithTech: function (tech){
        return tech + parseInt(Math.random()*1000);
    },

    // embaralha todas as cartas produzidas pelos métodos anteriores
    shuffleCards: function (cards){
        let currentIndex = this.cards.length;
        let randomIndex = 0;
    
        while(currentIndex != 0){
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
    
            [this.cards[currentIndex], this.cards[randomIndex]] = [this.cards[randomIndex], this.cards[currentIndex]]
    
        }
    },

    // ================= CONTROLE DO JOGO ===========================

    // controla a seleção de apenas 2 cartas por rodada
    setCard: function(id){
        let card = this.cards.filter(card=>card.id === id)[0];

        if(card.flipped || this.lockmode){
            return false;
        }

        if(!this.firstCard){
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true;
        }else{
            this.secondCard = card;
            this.firstCard.flipped = true;
            this.lockmode = true;
            return true;
        }

    },

    // reseta as variaveis de controle de selação para a proxima rodada
    clearCards: function (){
        this.firstCard = null;
        this.secondCard = null;
        this.lockmode = false;
    },

    // confere se o as cartas selecionadas são pares
    checkMatch: function(){

        if(!this.firstCard || !this.secondCard){
            return false;
        }
        return (this.firstCard.icon === this.secondCard.icon);

    },
    
    // configura as cartas para ficarem de costas 
    unflipCards: function (){
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards();
    },

    // todas as cartas foram descobertas, o jogo acabou 
    checkGameOver(){
        return this.cards.filter(card => card.flipped).length == this.cards.length/2;

    }

}