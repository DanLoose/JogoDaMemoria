let game = {

    lockmode: false,
    firstCard: null,
    secondCard: null,

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

    checkMatch: function(){

        if(!this.firstCard || !this.secondCard){
            return false;
        }
        return (this.firstCard.icon === this.secondCard.icon);

    },

    clearCards: function (){
        this.firstCard = null;
        this.secondCard = null;
        this.lockmode = false;
    },

    techs: ['bootstrap',
            'css',
            'electron',
            'firebase',
            'html',
            'javascript',
            'jquery',
            'mongo',
            'node',
            'react'],

    cards: null,

        
    createCardsFromTechs: function () {

        this.cards = [];

        for(let tech of this.techs){
            this.cards.push(this.createPairFromTech(tech));
        }

        this.cards = this.cards.flatMap(pair=>pair);
        this.shuffleCards();
        return this.cards;
    },

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

    createIdWithTech: function (tech){
        return tech + parseInt(Math.random()*1000);
    },

    shuffleCards: function (cards){
        let currentIndex = this.cards.length;
        let randomIndex = 0;
    
        while(currentIndex != 0){
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
    
            [this.cards[currentIndex], this.cards[randomIndex]] = [this.cards[randomIndex], this.cards[currentIndex]]
    
        }
    },

    unflipCards: function (){
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards();
    },

    checkGameOver(){
        return this.cards.filter(card => card.flipped).length == this.cards.length/2;

    }

}