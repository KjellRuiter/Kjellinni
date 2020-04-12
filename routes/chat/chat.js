const getFromDB = require('../../helpers/getFromDb')
const setMessage = require('../../helpers/setMessage')
const updateLastSent = require('../../helpers/updateLastSent')
const filterPartenerData = require('../../helpers/filterPartenerData')
const deleteMatch = require('../../helpers/deleteMatch')

module.exports = class {
  static async renderChat(req, res) {
      // TODO: add req.session.user for sender
      const bothID = ["ID12345678910", req.params.id]
    let chatData = await getFromDB(process.env.DB_CHATS, bothID, true)
    if(chatData.length < 1){
        const dataObject = {
      // TODO: add req.session.user for sender
            users: [req.params.id, "ID12345678910"]
        };
        await setMessage(process.env.DB_CHATS, dataObject, true).then(
            async () => {
                chatData = await getFromDB(process.env.DB_CHATS, req.params.id, true)
            });
    }
    const partnersData = await getFromDB(process.env.DB_MATCHES, req.params.id, false)
    const filteredPartnersData = filterPartenerData(partnersData)
    console.log("coming from chatjs route",partnersData)
    res.render('pages/chat', {
        chatHistory: chatData[0].chat_history,
        roomID: chatData[0]._id,
      // TODO: add req.session.user for sender
        user: "ID12345678910", 
        partner: filteredPartnersData,
      })
  }
  static async sendMessage(req, res) {
    // updateLastSent(
    //   process.env.DB_MATCHES,
    //   req.params.match,
    //   req.body.textMessage,
    // )
    const messageData = {
      // TODO: add req.session.user for sender
      sender: 'ID12345678910',
      message: req.body.textMessage,
      created_at: new Date().getHours() + ':' + new Date().getMinutes(),
    }
    console.log(messageData)

   let chatData = await getFromDB(process.env.DB_CHATS, req.params.id, false)
   chatData[0].chat_history.push(messageData)
   console.log("coming from setting message",chatData[0].chat_history)
   await setMessage(process.env.DB_CHATS, chatData[0].chat_history, false, req.params.id)

    //     async () => {
    //     const partnersData = await getFromDB(process.env.DB_MATCHES, req.params.id, false)
    //     const filteredPartnersData = filterPartenerData(partnersData)
    //     // res.render('pages/matchlist', {
    //         // chatHistory: chatData[0].chat_history,
    //         // roomID: chatData[0]._id,
    //       // TODO: add req.session.user for sender
    //         // user: "ID12345678910", 
    //         // partner: filteredPartnersData,
    //     //   })
    //   },
    //   err => {
    //     console.error(err)
    //   },
    
  }
  static async unMatch(req, res) {
    await deleteMatch(process.env.DB_MATCHES, req.params.room).then(
      async () => {
        const matches = await getFromDB(process.env.DB_MATCHES)
        const filteredMatches = splitMatches(matches)
        // make the user come from req.session.user
        res.render('pages/matches', {
          user: 'Janno',
          newMatches: filteredMatches.new,
          oldMatches: filteredMatches.old,
        })
      },
      err => {
        console.error(err)
      },
    )
  }
}
