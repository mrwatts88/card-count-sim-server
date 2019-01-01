"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Hand {
    constructor() {
        this.bustedOrDiscarded = false;
        this.bet = 0;
        this.hand = [];
    }
    numCards() {
        return this.hand.length;
    }
    setBet(bet) {
        this.bet = bet;
    }
    hasAce() {
        for (const card of this.hand)
            if (card.value === 1)
                return true;
        return false;
    }
    isPair() {
        return (this.numCards() === 2 &&
            this.getCardAt(0).valAsInt() === this.getCardAt(1).valAsInt());
    }
    isSoft() {
        return this.calcHandTotal() !== this.calcHandTotalWithAcesAsOnes();
    }
    calcHandTotal() {
        let total = this.hand.reduce((prev, cur) => {
            return prev + cur.valAsInt();
        }, 0);
        if (total > 21)
            for (const card of this.hand)
                if (card.value === 1) {
                    total -= 10;
                    if (total < 22)
                        break;
                }
        return total;
    }
    addCardToHand(card) {
        this.hand.push(card);
    }
    removeCardAt(position) {
        return this.hand.splice(position, 1)[0];
    }
    getCardAt(position) {
        return this.hand[position];
    }
    hasBlackjack() {
        if (this.hand.length !== 2)
            return false;
        return ((this.hand[0].value === 1 && this.hand[1].valAsInt() === 10) ||
            (this.hand[1].value === 1 && this.hand[0].valAsInt() === 10));
    }
    clearHand() {
        this.hand = [];
    }
    toString() {
        let str = '';
        for (const card of this.hand)
            str += `${card.toString()}, `;
        return str;
    }
    calcHandTotalWithAcesAsOnes() {
        let total = this.hand.reduce((prev, cur) => {
            return prev + cur.valAsInt();
        }, 0);
        for (const card of this.hand)
            if (card.value === 1)
                total -= 10;
        return total;
    }
}
exports.Hand = Hand;
