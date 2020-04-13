const getFromDB = require('../../helpers/getFromDb')
const setMessage = require('../../helpers/setMessage')
const filterPartenerData = require('../../helpers/filterPartenerData')
const spliceMatch = require('../../helpers/splicefromMatches')
const User = require("../../database/models/user")

module.exports = class {
  static async renderChat(req, res) {
      // TODO: add req.session.user for sender
      const bothID = ["5e90730cdfd3bd4ca84e1b60", req.params.id]
    let chatData = await getFromDB(process.env.DB_CHATS, bothID, 0)
    console.log(chatData.length)
 
    if(chatData.length < 1){
        const dataObject = {
      // TODO: add req.session.user for sender
            users: [req.params.id, "5e90730cdfd3bd4ca84e1b60"]
        };
        await setMessage(process.env.DB_CHATS, dataObject, 0).then(
            async () => {
                chatData = await getFromDB(process.env.DB_CHATS, req.params.id, 0)
            });
    }
    
    const partnersData = await getFromDB(process.env.DB_USERS, req.params.id, 1)
    const filteredPartnersData = filterPartenerData(partnersData)
        res.render('pages/chat', {
            chatHistory: chatData[0].chat_history,
            roomID: chatData[0]._id,
            // TODO: add req.session.user for sender
            user: "5e90730cdfd3bd4ca84e1b60", 
            partner: filteredPartnersData
        })
  }
  static async sendMessage(req, res) {
    const messageData = {
      // TODO: add req.session.user for sender
      sender: '5e90730cdfd3bd4ca84e1b60',
      message: req.body.textMessage,
      created_at: new Date().getHours() + ':' + new Date().getMinutes(),
    }

   let chatData = await getFromDB(process.env.DB_CHATS, req.params.id, 1)
   chatData[0].chat_history.push(messageData)
   await setMessage(process.env.DB_CHATS, chatData[0].chat_history, 1, req.params.id)
   // todo: with loc, update the last message in the document with the matches
   //    await setMessage(process.env.DB_CHATS, chatData[0].chat_history, false, req.params.id)

    const partnersID = chatData[0].users.filter(id => id !== "5e90730cdfd3bd4ca84e1b60");
    const partnersData = await getFromDB(process.env.DB_USERS, partnersID[0], 1)
    const filteredPartnersData = filterPartenerData(partnersData)
        res.render('pages/chat', {
            chatHistory: chatData[0].chat_history,
            roomID: chatData[0]._id,
            //   TODO: add req.session.user for sender
            user: "5e90730cdfd3bd4ca84e1b60", 
            partner: filteredPartnersData,
          })    
  }
  static async unMatch(req, res) {
      const potentialMatches = req.session.matches.matched_history.filter(user => user.status !== "accepted")
      const getAcceptedMatches = req.session.matches.matched_history.filter(user => user.status == "accepted")
      const removedFromMatches = spliceMatch(getAcceptedMatches, req.params.id);
      req.session.matches.matched_history = potentialMatches.push(removedFromMatches)
      
      // this search will have to be performed twice, once for each end of the match
      const partenrsMatches = await getFromDB(process.env.DB_MATCHES, req.params.id, 2);
      const partnersReducedMatches = spliceMatch(partenrsMatches[0].matched_history, req.params.id);
      await setMessage(process.env.DB_MATCHES, partnersReducedMatches, 2, acceptedMatches[0]._id)
      .then(
          async () => {
              // this search will have to be performed twice, once for each end of the match
              // todo: replace hardcoded string with req.session.user
            const AllMyMatches = await getFromDB(process.env.DB_MATCHES, "5e90730cdfd3bd4ca84e1b60", 2);
            const myReducedMatches = spliceMatch(AllMyMatches, req.params.id);
            // todo: replace hardcoded string with req.session.user
            await setMessage(process.env.DB_MATCHES, myReducedMatches, 2, "5e90730cdfd3bd4ca84e1b60")

        const userPromises = removedFromMatches.map(user=> User.findById(user.userId))
        const allUsers = await Promise.all(userPromises)
    // todo: replace hardcoded string with req.session.user
        res.render('pages/matchlist', {
          user: '5e90730cdfd3bd4ca84e1b60',
          allUsers: allUsers
        })
      },
      err => {
        console.error(err)
      },
    )
  }
}
