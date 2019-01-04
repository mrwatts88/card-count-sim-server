const express = require('express')
const router = express.Router()

const { Game } = require('../../blackjack-lib/game')
const { Player } = require('../../blackjack-lib/player')
const { SIX_DECK_H17_DAS_NO_SURR } = require('../../blackjack-lib/strategy')
const { DEBUG } = require('../../blackjack-lib/utils')

const ramp = [0, 1, 2, 3, 4, 5, 6, 10, 10, 10, 10]
const flat = [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]

router.get('/', (req, res, next) => {
  const game = new Game({ h17: true })
  const player = new Player(SIX_DECK_H17_DAS_NO_SURR, false, ramp)
  game.addPlayer(player)

  let i = 0
  while (!game.hasReachedCutCard()) {
    game.placeBets()
    game.dealRound()
    game.placeInsuranceBets()
    game.resolveInsurance()

    if (!game.getDealer().hasBlackjack()) {
      game.playersPlayRound()
      game.dealerPlayRound()
    }

    game.resolveBets()

    if (i >= 40) {
      return res.send(game)
    }

    game.cleanUp()
    ++i
  }
})

module.exports = router
