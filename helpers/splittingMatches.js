const getFromDB = require('./getFromDb')
const ObjectId = require('mongodb').ObjectId;

module.exports = async (allMatches, myID) => {
  const oldMatches = [];
  const newMatches = [];
  
  const iets = allMatches.map( async match => {
    
    const bothID = [myID, ObjectId(match._id).toString()]
    let chatData = await getFromDB(process.env.DB_CHATS, bothID, 0)

    if(chatData.length > 0 && chatData[0].chat_history.length > 0){
      const matchWithMessage = {
        _id: match._id,
        name: match.name,
        photo: match.photo,
        lastMessage: chatData[0].chat_history[chatData[0].chat_history.length - 1].message
      }
      oldMatches.push(matchWithMessage);
      return chatData;
    }else{
      newMatches.push(match);
    }
  })
 await Promise.all(iets)

    const matches = {
      old: oldMatches,
      new: newMatches
    }

    return matches
}
