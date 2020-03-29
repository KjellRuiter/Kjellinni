const getMatch = require('../../helpers/getMatch')
const User = require('../../database/models/user')
const Matches = require('../../database/models/matches')

module.exports = class {
    static async getMethod(req, res) {
        const match = await getMatch(req.session.user, req.session.matches)
        res.render('pages/match', { match })
    }
    static async postMethod(req, res) {
        if ('like' in req.body) {
            const matchingUser = await User.findById(req.session.matches.currentlyMatching)
            await matchingUser.populate('matches').execPopulate()
            const matchingUserMatches = matchingUser.matches[0]

            const checkDenied = req.session.matches.denied.find(m => m.userId.str === matchingUser._id.str)
            const checkAccepted = req.session.matches.accepted.find(m => m.userId.str === matchingUser._id.str)
            console.log(checkDenied, checkAccepted)

            if (!checkDenied && !checkAccepted) {
                // Update other users accepted list
                const otherUserUpdate = [...matchingUserMatches.accepted, { userId: req.session.user._id }]
                await Matches.findByIdAndUpdate(matchingUserMatches._id, {
                    accepted: otherUserUpdate
                })

                const updatedMatchHistory = [...req.session.matches.matched_history, {
                    status: 'pending',
                    userId: matchingUser._id
                }]
                await Matches.findByIdAndUpdate(req.session.matches._id, {
                    matched_history: updatedMatchHistory
                })
            }
            else if (checkDenied) {
                const updatedMatchHistory = req.session.matches.matched_history.push({
                    status: 'denied',
                    userId: matchingUser._id
                })
                await Matches.findByIdAndUpdate(req.session.matches._id, {
                    matched_history: updatedMatchHistory
                })
            }
            else if (checkAccepted) {
                const updatedMatchHistoryOtherUser = matchingUserMatches.matched_history
                    .map(m => {
                        if (m.userId.equals(req.session.user._id)) {
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

                const updatedMatchHistory = req.session.matches.matched_history.push({
                    status: 'accepted',
                    userId: matchingUser._id
                })
                await Matches.findByIdAndUpdate(req.session.matches._id, {
                    matched_history: updatedMatchHistory
                })
            }
        }
        res.redirect('/match')
    }
}
