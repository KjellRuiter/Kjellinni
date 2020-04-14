const getFromDB = require('./getFromDb')

module.exports = async (allMatches, myID) => {
  const oldMatches = [];
  const newMatches = [];



const matchesWithChatdata = await allMatches.forEach(async match => {
    const bothID = [myID, match.userId]
    let chatData = await getFromDB(process.env.DB_CHATS, bothID, 0)
    return chatData;
  })
  
      if(chatData.length < 1){
          // chatData = await setMessage(process.env.DB_CHATS, bothID, 0)
          console.log(chatData)
          // console.log(match.name)
          // newMatches.push(match);
        }else{
          console.log("yes chat")
          console.log(match.name)
          oldMatches.push(match);
          //     // make this the length of the chat history array minus one
      //     match.lastmessage = chatData[0].chat_history
      }
    const matches = {
      old: oldMatches,
      new: newMatches
    }
    return matches

  
}
