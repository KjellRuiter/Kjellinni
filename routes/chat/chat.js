const getChat = require('../../helpers/getChat')
const setMessage = require('../../helpers/setMessage')

module.exports = class {
    static async renderChat(req, res) {
    console.log("match is: ",req.params.match)
    // const chatData = await getChat('match-Ferrari-Janno-5e6fbd3f38f8fc7b1ce48165');
    const chatData = await getChat(req.params.match);
    // for each message check if sender is the same as req.user and if so add something to make it render real smoof
    // const chathistory = await GetFromDB(`${matchID}`);
    // user: req.user, chatHistory: fullchathsitory, matchData: matchData 
    res.render('pages/chat', {chatHistory: chatData, roomID:req.params.match})
    }
    static async sendMessage(req, res) {
        const messageData = {
            from: "Janno",
            // TODO: add req.user for sender
        msg: req.body.textMessage,
        time: new Date().getHours() + ":" + new Date().getMinutes()
    }
    await setMessage(messageData, req.params.match)
        .then(async value => {
        console.log("value: ",value);
        const chatData = await getChat(req.params.match);
        console.log("after promise chatdata: ",chatData)
        res.render('pages/chat', {chatHistory: chatData, roomID:req.params.match})
      }, err => {
        console.error(err); 
      });
    console.log(messageData)
    }

}
