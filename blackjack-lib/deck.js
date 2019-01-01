"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const card_1 = require("./card");
class Deck {
    constructor() {
        this.cardsNotDealt = [];
        this.cardsDealt = [];
    }
    shuffle() {
        this.cardsNotDealt.forEach(() => {
            const c1 = Math.floor(Math.random() * this.cardsNotDealt.length);
            const c2 = Math.floor(Math.random() * this.cardsNotDealt.length);
            const temp = this.cardsNotDealt[c1];
            this.cardsNotDealt[c1] = this.cardsNotDealt[c2];
            this.cardsNotDealt[c2] = temp;
        });
    }
    dealCard() {
        const card = this.cardsNotDealt.shift();
        this.cardsDealt.push(card);
        return card;
    }
    isEmpty() {
        return this.cardsNotDealt.length === 0;
    }
    init() {
        this.cardsNotDealt = [];
        this.cardsDealt = [];
        for (let suit = 0; suit < Deck.NUMBER_OF_SUITS; ++suit)
            for (let value = 0; value < Deck.NUMBER_OF_RANKS; ++value)
                this.cardsNotDealt[Deck.NUMBER_OF_RANKS * suit + value] = new card_1.Card(suit, value + 1);
    }
    toString() {
        let dealtString = 'Dealt: ';
        let notDealtString = 'Not dealt: ';
        for (const card of this.cardsDealt)
            dealtString += card.toString() + ' ';
        for (const card of this.cardsNotDealt)
            notDealtString += card.toString() + ' ';
        return dealtString + '\n' + notDealtString;
    }
}
Deck.NUMBER_OF_SUITS = 4;
Deck.NUMBER_OF_RANKS = 13;
exports.Deck = Deck;
