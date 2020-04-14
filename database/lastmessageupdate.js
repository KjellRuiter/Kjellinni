const Matches = require('./models/matches')

/**
 * Saves a file in imgur as base64 and returns the image link in astring
 * @function lastmessageupdate
 * @public
 * @param {matches} - whole matches collection
 * @param {otherId} - Other user id (the user you are sending an message)
 * @param {senderId} - Who sended the message
 * @param {message} - The message it self
 */

module.exports =async (matches, otherId, senderId, message)=>{
    const updateMatchedHistory = matches.matched_history.map(match=>{
        if(match.userId.equals(otherId)){
            return {
                id: senderId,
                message
            }
        }
    })
    await Matches.findByIdAndUpdate(matches._id, {
        matched_history: updateMatchedHistory
    })
}