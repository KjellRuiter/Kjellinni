const Matches = require('./models/matches')
const User = require('./models/user')

module.exports = async (user, matches, otherUserId)=>{
    const updateMatchedHistory_self = matches.matched_history.filter(match=>!match.userId.equals(otherUserId))

    const otherUser = await User.findById(otherUserId)
    const otherUserMatches = await otherUser.populate('matches').execPopulate()
    const updateMatchedHistory_other = otherUserMatches.matched_history.filter(match=>!match.userId.equals(user._id))

    await Matches.findByIdAndUpdate(matches._id,{
        matched_history: updateMatchedHistory_self
    })
    await Matches.findByIdAndUpdate(otherUserMatches._id,{
        matched_history: updateMatchedHistory_other
    })
}