"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Suit;
(function (Suit) {
    Suit[Suit["C"] = 0] = "C";
    Suit[Suit["D"] = 1] = "D";
    Suit[Suit["H"] = 2] = "H";
    Suit[Suit["S"] = 3] = "S";
})(Suit = exports.Suit || (exports.Suit = {}));
class Card {
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
    }
    toString() {
        return this.valAsString() + Suit[this.suit];
    }
    valAsString() {
        switch (this.value) {
            case 1:
                return 'A';
            case 2:
                return '2';
            case 3:
                return '3';
            case 4:
                return '4';
            case 5:
                return '5';
            case 6:
                return '6';
            case 7:
                return '7';
            case 8:
                return '8';
            case 9:
                return '9';
            case 10:
                return 'T';
            case 11:
                return 'J';
            case 12:
                return 'Q';
            case 13:
                return 'K';
            default:
                throw new Error('Not a valid card value.');
        }
    }
    valAsInt() {
        if (this.value > 1 && this.value < 11)
            return this.value;
        else
            switch (this.value) {
                case 1:
                    return 11;
                case 11:
                case 12:
                case 13:
                    return 10;
                default:
                    throw new Error('Nota valid card value.');
            }
    }
}
Card.Suits = Suit;
exports.Card = Card;
