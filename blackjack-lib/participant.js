"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hand_1 = require("./hand");
var Action;
(function (Action) {
    Action[Action["STAND"] = 0] = "STAND";
    Action[Action["HIT"] = 1] = "HIT";
    Action[Action["DOUBLE"] = 2] = "DOUBLE";
    Action[Action["SPLIT"] = 3] = "SPLIT";
    Action[Action["DS"] = 4] = "DS";
})(Action = exports.Action || (exports.Action = {}));
class Participant {
    constructor() {
        this.hands = [new hand_1.Hand()];
        this.currentHandIndex = 0;
    }
    currentHand() {
        return this.hands[this.currentHandIndex];
    }
    hasBlackjack() {
        return this.hands[0].hasBlackjack();
    }
    addCardToInitialHand(card) {
        this.hands[0].addCardToHand(card);
    }
    reset() {
        this.hands = [new hand_1.Hand()];
        this.currentHandIndex = 0;
    }
}
Participant.actions = Action;
exports.Participant = Participant;
