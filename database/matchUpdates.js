const Matches = require('./models/matches')
const User = require('./models/user')

const matchesHistory = async (matches, status, currentlyMatching) => {
    const updatedMatchHistory = [...matches.matched_history, {
        status: status,
        userId: currentlyMatching
    }]
    await Matches.findByIdAndUpdate(matches._id, {
        matched_history: updatedMatchHistory
    })
}

const resetCurrentlyMatching = async (matches) => { 
    console.log('reset currently matching')
    await Matches.findByIdAndUpdate(matches._id, {
        currentlyMatching: undefined
    })
    matches.currentlyMatching = undefined
}

const getOtherUserMatches = async (currentlyMatching) => {
    const matchingUser = await User.findById(currentlyMatching)
    await matchingUser.populate('matches').execPopulate()
    return matchingUser.matches
}

const otherUserMatchHistory = async (userId, currentlyMatching, status) => {
    const matchingUserMatches = await getOtherUserMatches(currentlyMatching)

    const updatedMatchHistoryOtherUser = matchingUserMatches.matched_history
        .map(m => {
            if (m.equals(userId)) {
                return {
                    ...m._doc,
                    status: status
                }
            }
            return m
        })

    await Matches.findByIdAndUpdate(matchingUserMatches._id, {
        matched_history: updatedMatchHistoryOtherUser
    })
}

const otherUserStatus = async (userId, currentlyMatching, status) => {
    const matchingUserMatches = await getOtherUserMatches(currentlyMatching)
    const otherUserUpdate = [...matchingUserMatches[`otherUser_${status}`], userId]
    await Matches.findByIdAndUpdate(matchingUserMatches._id, {
        [`otherUser_${status}`]: otherUserUpdate
    })
}

module.exports = {
    matchesHistory,
    otherUserMatchHistory,
    otherUserStatus,
    resetCurrentlyMatching
}