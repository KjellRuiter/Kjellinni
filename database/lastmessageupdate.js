const Matches = require('./models/matches')

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