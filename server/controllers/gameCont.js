
const game = require('../model/gameModel')
const addGame = async (req, res) => {
    try {
        const newGame = await game.create(req.body)
        res.status(200).send({ message: "New game added", data: newGame })
    } catch (error) {
        return res.status(500).send({
                      message:error.message,
                      success: false,
    
                })
    }
}
const UpdateGame = async (req, res) => {
  try {
    const { id, ...updateData } = req.body
    const Game = await game.findByIdAndUpdate(id, updateData, { new: true })

    if (!Game) {
      return res.status(404).send({ success: false, message: "Game not found" })
    }

    res.status(200).send({
      success: true,
      message: "Game updated successfully",
      data: Game
    })
  } catch (error) {
    return res.status(500).send({
              message:error.message,
              success: false,
        })  
  }
}

const deleteGame = async (req, res) => {
   
    try {
        const Game = await game.findByIdAndDelete(req.params.id)
        if (!Game) {
            return res.status(404).send({ message: "game not found", success: false })
        }
        return res.status(200).send({ message: "Game deleted successfully", success: true });

    } catch (error) {
         return res.status(500).send({
              message:error.message,
              success: false,
        })  
    }
}
const getAllGame = async (req, res) => {    
    try {
        const allgame = await game.find()
        res.send({
            success: true,
            data: allgame
        })
    } catch (error) {
    return res.status(500).send({
              message:error.message,
              success: false,
        })  

    }
}
const getgameByID =async(req,res)=>{
    try {
        const getGame=await game.findById(req.params.id)
        res.send({
            data:getGame
        })
    } catch (error) {
         return res.status(500).send({
              message:error.message,
              success: false,
        })  
        
    }
}
module.exports = { addGame, deleteGame, getAllGame, UpdateGame,getgameByID }