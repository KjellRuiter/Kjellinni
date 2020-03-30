const Matches = require('./models/matches')
const User = require('./models/user')

const matchesHistory = async (matches, status, currentlyMatching) => {
    const updatedMatchHistory = [...matches.matched_history, {
        status: status,
        userId: currentlyMatching
    }]
    console.log('----------matchesHistory----------')
    console.log(updatedMatchHistory)
    await Matches.findByIdAndUpdate(matches._id, {
        matched_history: updatedMatchHistory
    })
}

const getOtherUserMatches = async (currentlyMatching) => {
    const matchingUser = await User.findById(currentlyMatching)
    await matchingUser.populate('matches').execPopulate()

    console.log('----OtherUserMatches------', matchingUser, matchingUser.matches[0])
    return matchingUser.matches[0]
}

const otherUserMatchHistory = async (userId, currentlyMatching) => {
    const matchingUserMatches = await getOtherUserMatches(currentlyMatching)

    const updatedMatchHistoryOtherUser = matchingUserMatches.matched_history
        .map(m => {
            if (m.userId.equals(userId)) {
                console.log(m)
                return {
                    ...m._doc,
                    status: 'accepted'
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
    const otherUserUpdate = [...matchingUserMatches[status], { userId: userId }]
    await Matches.findByIdAndUpdate(matchingUserMatches._id, {
        [status]: otherUserUpdate
    })
}

module.exports = {
    matchesHistory,
    otherUserMatchHistory,
    otherUserStatus
}