const getFromDB = require('../../helpers/getFromDb')
const setMessage = require('../../helpers/setMessage')
const updateLastSent = require('../../helpers/updateLastSent')
const selectUserImg = require('../../helpers/selectUserImg')
const deleteMatch = require('../../helpers/deleteMatch')

module.exports = class {
  static async renderChat(req, res) {
    const chatData = await getFromDB(req.params.match)
    const matchData = await getFromDB(process.env.DB_MATCHES, req.params.match)
    // make the user value come from req.session.user
    const partnerData = selectUserImg(matchData, 'Janno')
    res.render('pages/chat', {
      chatHistory: chatData,
      roomID: req.params.match,
      user: 'Janno',
      partner: partnerData,
    })
  }
  static async sendMessage(req, res) {
    updateLastSent(
      process.env.DB_MATCHES,
      req.params.match,
      req.body.textMessage,
    )
    const messageData = {
      // TODO: add req.session.user for sender
      sender: 'Janno',
      msg: req.body.textMessage,
      time: new Date().getHours() + ':' + new Date().getMinutes(),
    }
    await setMessage(messageData, req.params.match).then(
      async () => {
        const chatData = await getFromDB(req.params.match)
        const matchData = await getFromDB(
          process.env.DB_MATCHES,
          req.params.match,
        )
        // make the user value come from req.session.user
        const partnerData = selectUserImg(matchData, 'Janno')
        res.render('pages/chat', {
          chatHistory: chatData,
          roomID: req.params.match,
          user: 'Janno',
          partner: partnerData,
        })
      },
      err => {
        console.error(err)
      },
    )
  }
  static async unMatch(req, res) {
    await deleteMatch(process.env.DB_MATCHES, req.params.room).then(
      async value => {
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
