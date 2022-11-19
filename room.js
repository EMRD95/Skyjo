const Jeu = require("./jeu.js")

class Room {
    constructor(id, capacite) {
        this.id = id;
        this.placePrise = 0;
        this.placeMax = capacite;
        this.players = [];
        this.host = null;
        this.run = false;
        this.jeu = null;
        this.turn1 = false;
        this.turn;
    }
    
    createJeu() {
        this.jeu = new Jeu();
        this.jeu.shuffle();
        this.jeu.shuffle();
        this.jeu.distribute(this.players);
        
        this.players.forEach(p => {
            p.main.calculatePoints();
        });

        this.turn1 = true;
    }

    addPlayer(player) {      
        this.players.push(player);
        this.placePrise++;
    }

    deletePlayer(playerDelete) {
        this.players = this.players.filter(p => p.username !== playerDelete);
        this.placePrise--;
        if(playerDelete === this.host) {
            this.players.forEach(p => {
                this.setHost(p.username);
                return;
            });
        }
    }

    setHost(username) {
        this.host = username;
    }

    isFull() {
        return this.placeMax == this.placePrise;
    }
    
    verifierTurn1() {
        let bool = true;
        this.players.forEach(p => {
            //console.log("nb vcarte retourne : ", p.main.getNbCartesRetourne())
            if(p.main.getNbCartesRetourne() != 2) {
                bool = false;
            }
        });
        return bool;
    }

    majMain(player, cardsChange) {
        this.players.forEach(p => {
            if(player.username === p.username) {
                p.main.majMain(cardsChange);
                p.main.calculatePoints();
            }
        });
    }

    selectedCardPioche() {
        this.jeu.selectedCardPioche();
    }

    selectedCardDefausse() {
       this.jeu.selectedCardDefausse();
   }
 
   pickedPioche() {
       this.jeu.pickedPioche();
   }

   pickedMain(player, carte) {
    
   }

   turnCard(player) {
        let cardsChange = [player.phase.card2];
        this.majMain(player, cardsChange);
   }

   hierarchisePlayers() {
        
        this.players.sort((a, b) => a.points + b.points);
        console.log(this.players);
        this.turn = this.players[0];
   }

    getPlayers() {
        return this.players;
    }

    getDiscard2Cards() {
        return this.jeu.getDiscard2Cards();
    }

    getPioche2Cards() {
        return this.jeu.getPioche2Cards();
    }

    getSizePioche() {
        return this.jeu.getSizePioche(); 
    }

    getSizeDicard() {
        return this.jeu.getSizeDicard();
    }
}

module.exports = Room;