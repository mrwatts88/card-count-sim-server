"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const hand_1 = require("./hand");
const participant_1 = require("./participant");
class Player extends participant_1.Participant {
    constructor(basicStrategy, ill18, bettingRamp) {
        super();
        this.basicStrategy = basicStrategy;
        this.ill18 = ill18;
        this.bettingRamp = new Map();
        for (let i = 0; i < 11; ++i)
            this.bettingRamp.set(i, bettingRamp[i]);
        this.currentBet = 0;
        this.currentInsuranceBet = 0;
        this.bankroll = 0;
        this.totalBet = 0;
    }
    usingIll18() {
        return this.ill18;
    }
    getTotalBet() {
        return this.totalBet;
    }
    addHandForSplit(bet, card) {
        const hand = new hand_1.Hand();
        hand.setBet(bet);
        hand.addCardToHand(card);
        this.hands.splice(this.currentHandIndex, 0, hand);
    }
    placeBet(count) {
        let adjustedCount = count;
        if (count < 1)
            adjustedCount = 0;
        if (count > 10)
            adjustedCount = 10;
        this.currentBet = this.bettingRamp.get(adjustedCount);
        this.currentHand().bet = this.currentBet;
        this.makeBet(this.currentBet);
        utils_1.DEBUG(`Player's bet: ${this.currentBet} - Bankroll after bet: ${this.bankroll}`);
    }
    makeBet(amount) {
        this.totalBet += amount;
        this.bankroll -= amount;
    }
    resolveBet(multiplier, bet) {
        // -1 = loss, 0 = push, 1 = even money win, 1.2 = 6 to 5, 1.5 = 3 to 2
        this.bankroll += multiplier === -1 ? 0 : bet * (multiplier + 1);
        utils_1.DEBUG(`Player's Bankroll after bet resolution: ${this.bankroll}`);
    }
    decideAction(count, dealerUpcardValAsInt) {
        // TODO: Take into account ill18
        if (this.currentHandIndex === null)
            throw new Error('There is no current hand to take action on');
        let action;
        if (this.currentHand().isPair())
            action = this.basicStrategy.PAIRS[dealerUpcardValAsInt][this.currentHand()
                .getCardAt(0)
                .valAsInt()];
        else if (!this.currentHand().hasAce() ||
            (this.currentHand().hasAce() && !this.currentHand().isSoft()))
            action = this.basicStrategy.HARD[dealerUpcardValAsInt][this.currentHand().calcHandTotal()];
        else
            action = this.basicStrategy.SOFT[dealerUpcardValAsInt][this.currentHand().calcHandTotal()];
        let actionString;
        switch (action) {
            case participant_1.Participant.actions.SPLIT:
                actionString = 'splitting';
                break;
            case participant_1.Participant.actions.DOUBLE:
                actionString = 'doubling';
                break;
            case participant_1.Participant.actions.STAND:
                actionString = 'standing';
                break;
            case participant_1.Participant.actions.HIT:
                actionString = 'hitting';
                break;
            case participant_1.Participant.actions.DS:
                actionString = 'doubling/splitting';
                break;
            default:
                break;
        }
        utils_1.DEBUG(`Player's hand: ${this.currentHand().toString()}- ${actionString} with ${this.currentHand().calcHandTotal()}`);
        return action;
    }
    getStats() {
        return {
            totalBet: `${this.totalBet} units`,
            profit: `${this.bankroll} units`,
            edge: this.totalBet === 0
                ? '0.00%'
                : `${((100 * this.bankroll) / this.totalBet).toFixed(5)}%`,
        };
    }
}
exports.Player = Player;
