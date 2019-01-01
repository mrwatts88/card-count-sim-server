"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const deck_1 = require("./deck");
class Shoe extends deck_1.Deck {
    constructor(numDecks, cardsAfterCut, countValueMapping) {
        super();
        this.numDecks = numDecks;
        this.cardsAfterCut = cardsAfterCut;
        this.runningCount = 0;
        this.countValueMapping = countValueMapping;
    }
    dealCard() {
        const card = super.dealCard();
        this.runningCount += this.countValueMapping[card.value];
        utils_1.DEBUG(`Dealt ${card} - Running count: ${this.runningCount}`);
        return card;
    }
    calcTrueCount() {
        // Based on closest number of 1/2 decks left in the undealt shoe.
        // Result is truncated because a true count must be reached before betting...
        // according to that count. (e.g. TC = 1.99 = 1)
        const denominator = 0.5 * Math.ceil(this.cardsNotDealt.length / 26);
        let trueCount = denominator === 0 ? 0 : this.runningCount / denominator;
        trueCount = Math.floor(trueCount);
        utils_1.DEBUG(`True count: ${trueCount}, Cards remaining: ${this.cardsNotDealt.length}`);
        return trueCount;
    }
    setCountMap(countMap) {
        this.countValueMapping = countMap;
    }
    getCountMap() {
        return this.countValueMapping;
    }
    hasReachedCutCard() {
        const reached = this.cardsNotDealt.length <= this.cardsAfterCut;
        if (reached)
            utils_1.DEBUG(`Reached the cut card with ${this.cardsNotDealt.length} cards left.`);
        return reached;
    }
    shuffle() {
        for (let i = 0; i < this.numDecks; ++i)
            this.addShuffledDeck(new deck_1.Deck());
        super.shuffle();
        this.runningCount = 0;
    }
    addShuffledDeck(deck) {
        deck.init();
        deck.shuffle();
        while (!deck.isEmpty())
            this.cardsNotDealt.push(deck.dealCard());
    }
}
exports.Shoe = Shoe;
