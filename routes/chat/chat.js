const getFromDB = require('../../helpers/getFromDb')
const setMessage = require('../../helpers/setMessage')
const updateLastSent = require('../../helpers/updateLastSent')
const filterPartenerData = require('../../helpers/filterPartenerData')
const deleteMatch = require('../../helpers/deleteMatch')
const spliceMatch = require('../../helpers/splicefromMatches')

module.exports = class {
  static async renderChat(req, res) {
      // TODO: add req.session.user for sender
      const bothID = ["ID12345678910", req.params.id]
    let chatData = await getFromDB(process.env.DB_CHATS, bothID, 0)
    console.log(chatData.length)
 
    if(chatData.length < 1){
        const dataObject = {
      // TODO: add req.session.user for sender
            users: [req.params.id, "ID12345678910"]
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
            user: "ID12345678910", 
            partner: filteredPartnersData
        })
  }
  static async sendMessage(req, res) {
    const messageData = {
      // TODO: add req.session.user for sender
      sender: 'ID12345678910',
      message: req.body.textMessage,
      created_at: new Date().getHours() + ':' + new Date().getMinutes(),
    }

   let chatData = await getFromDB(process.env.DB_CHATS, req.params.id, 1)
   chatData[0].chat_history.push(messageData)
   await setMessage(process.env.DB_CHATS, chatData[0].chat_history, false, req.params.id)
   // update the last message in the document with the matches
   //    await setMessage(process.env.DB_CHATS, chatData[0].chat_history, false, req.params.id)

    const partnersID = chatData[0].users.filter(id => id !== "ID12345678910");
    const partnersData = await getFromDB(process.env.DB_USERS, partnersID[0], 1)
    const filteredPartnersData = filterPartenerData(partnersData)
    console.log("my partners data ",filteredPartnersData)
        res.render('pages/chat', {
            chatHistory: chatData[0].chat_history,
            roomID: chatData[0]._id,
            //   TODO: add req.session.user for sender
            user: "ID12345678910", 
            partner: filteredPartnersData,
          })    
  }
  static async unMatch(req, res) {
    //   const matches = await getFromDB(process.env.DB_USERS, req.params.id, 2)
    // this search will have to be performed twice, once for each end of the match
    //   const matches = await getFromDB(process.env.DB_MATCHES, "5e90730cdfd3bd4ca84e1b60", 2);
      const getAcceptedMatches = req.session.matches.matched_history.filter(user => user.status == "accepted")
      const removedFromMatches = spliceMatch(getAcceptedMatches, req.params.id);
      console.log(getAcceptedMatches.length)
      console.log(removedFromMatches.length)
    // await deleteMatch(process.env.DB_USERS, req.params.room).then(
    //   async () => {
    //     const matches = await getFromDB(process.env.DB_USERS)
    //     const filteredMatches = splitMatches(matches)
    //     // make the user come from req.session.user
    //     res.render('pages/matchlist', {
    //       user: 'ID12345678910',
    //       newMatches: filteredMatches.new,
    //       oldMatches: filteredMatches.old,
    //     })
    //   },
    //   err => {
    //     console.error(err)
    //   },
    // )
  }
}
