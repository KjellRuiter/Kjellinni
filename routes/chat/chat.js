const getFromDB = require('../../helpers/getFromDb')
const setMessage = require('../../helpers/setMessage')
const filterPartenerData = require('../../helpers/filterPartenerData')
const spliceMatch = require('../../helpers/splicefromMatches')
const User = require("../../database/models/user")
const deleteMatch = require("../../database/deleteMatch")

module.exports = class {
  static async renderChat(req, res) {
      const bothID = [req.session.user._id, req.params.id]
    let chatData = await getFromDB(process.env.DB_CHATS, bothID, 0)
 
    if(chatData.length < 1){
        chatData = await setMessage(process.env.DB_CHATS, bothID, 0)
    }

    const partnersData = await getFromDB(process.env.DB_USERS, req.params.id, 1)
    const filteredPartnersData = filterPartenerData(partnersData)
    res.render('pages/chat', {
        chatHistory: chatData[0].chat_history,
        roomID: chatData[0]._id,
        user: req.session.user._id, 
        partner: filteredPartnersData
    })
  }
  static async sendMessage(req, res) {
    const messageData = {
      sender: req.session.user._id,
      message: req.body.textMessage,
      created_at: new Date().getHours() + ':' + new Date().getMinutes(),
    }

   let chatData = await getFromDB(process.env.DB_CHATS, req.params.id, 1)
   chatData[0].chat_history.push(messageData)
   await setMessage(process.env.DB_CHATS, chatData[0].chat_history, 1, req.params.id)

   const partnersID = chatData[0].users.filter(id => id !== req.session.user._id);
   const partnersData = await getFromDB(process.env.DB_USERS, partnersID[0], 1)
   const filteredPartnersData = filterPartenerData(partnersData)

    res.render('pages/chat', {
        chatHistory: chatData[0].chat_history,
        roomID: chatData[0]._id,
        user: req.session.user._id, 
        partner: filteredPartnersData,
    })    
  }
  static async unMatch(req, res) {
      // accepted matches
      const potentialMatches = req.session.matches.matched_history.filter(user => user.status !== "accepted")
      // pending matches
      const getAcceptedMatches = req.session.matches.matched_history.filter(user => user.status == "accepted")

      const removedFromMatches = spliceMatch(getAcceptedMatches, req.params.id);
      req.session.matches.matched_history = potentialMatches.push(removedFromMatches)

      const myMatches = await getFromDB(process.env.DB_MATCHES, req.session.user._id, 2);

      deleteMatch(req.user.session._id, myMatches[0], req.params.id)

    const userPromises = removedFromMatches.map(user=> User.findById(user.userId))
    const allUsers = await Promise.all(userPromises)
    res.render('pages/matchlist', { allUsers: allUsers })
  }
}
