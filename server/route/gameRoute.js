const { addGame, getAllGame, deleteGame, UpdateGame, getgameByID } = require('../controllers/gameCont')


const gameRouter=require('express').Router()

gameRouter.post('/add-game',addGame)
gameRouter.get('/allgame',getAllGame)
gameRouter.delete('/delete-game/:id',deleteGame)
gameRouter.post('/update-game',UpdateGame)
gameRouter.get('/game/:id',getgameByID)

module.exports=gameRouter