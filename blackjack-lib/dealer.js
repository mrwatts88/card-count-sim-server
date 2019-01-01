"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const participant_1 = require("./participant");
class Dealer extends participant_1.Participant {
    constructor() {
        super();
    }
    decideAction(h17) {
        const total = this.calcHandTotal();
        if (total > 21)
            throw Error('Total is over 21, should not be deciding action.');
        if (total > 17) {
            utils_1.DEBUG(`Dealer standing with: ${total}`);
            return participant_1.Participant.actions.STAND;
        }
        else if (total < 17) {
            utils_1.DEBUG(`Dealer hitting with: ${total}`);
            return participant_1.Participant.actions.HIT;
        }
        else if (!h17) {
            utils_1.DEBUG(`Dealer standing with: ${total}`);
            return participant_1.Participant.actions.STAND;
        }
        else if (!this.hasAce()) {
            utils_1.DEBUG(`Dealer standing with: ${total}`);
            return participant_1.Participant.actions.STAND;
        }
        else {
            if (this.isSoft())
                utils_1.DEBUG(`Dealer hitting with: ${total}`);
            else
                utils_1.DEBUG(`Dealer standing with: ${total}`);
            return this.isSoft()
                ? participant_1.Participant.actions.HIT
                : participant_1.Participant.actions.STAND;
        }
    }
    calcHandTotal() {
        return this.currentHand().calcHandTotal();
    }
    numCards() {
        return this.currentHand().numCards();
    }
    hasAce() {
        return this.currentHand().hasAce();
    }
    isPair() {
        return this.currentHand().isPair();
    }
    isSoft() {
        return this.currentHand().isSoft();
    }
    addCardToHand(card) {
        return this.addCardToInitialHand(card);
    }
    getCardAt(position) {
        return this.currentHand().getCardAt(position);
    }
    hasBlackjack() {
        const hasIt = this.currentHand().hasBlackjack();
        if (hasIt)
            utils_1.DEBUG('Dealer has Blackjack.');
        return hasIt;
    }
    clearHand() {
        return this.currentHand().clearHand();
    }
}
exports.Dealer = Dealer;
