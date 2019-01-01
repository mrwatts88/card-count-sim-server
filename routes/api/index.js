const express = require('express')
const router = express.Router()

const { Game } = require('../../blackjack-lib/game')
const { Player } = require('../../blackjack-lib/player')
const { SIX_DECK_H17_DAS_NO_SURR } = require('../../blackjack-lib/strategy')
const { DEBUG } = require('../../blackjack-lib/utils')

const ramp = [0, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
const flat = [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]

router.get('/', (req, res, next) => {
  const game = new Game({ h17: true })
  const player = new Player(SIX_DECK_H17_DAS_NO_SURR, false, flat)

  game.addPlayer(player)

  console.log(game.getPlayerAt(1).getStats())

  res.send(game.getPlayerAt(1).getStats())
})

module.exports = router
