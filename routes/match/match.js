const getMatch = require('../../helpers/getMatch')
const User = require('../../database/models/user')
const Matches = require('../../database/models/matches')
const matchesUpdate = require('../../database/matchUpdates')


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

            if (!checkDenied && !checkAccepted) {
                // Update other users accepted list
                const otherUserUpdate = [...matchingUserMatches.accepted, { userId: req.session.user._id }]
                await Matches.findByIdAndUpdate(matchingUserMatches._id, {
                    accepted: otherUserUpdate
                })

                matchesUpdate.matchesHistory(req.session.matches, 'pending')
            }
            else if (checkDenied) {
                matchesUpdate.matchesHistory(req.session.matches, 'denied')
            }
            else if (checkAccepted) {

                matchesUpdate.matchesHistory(req.session.matches, 'accepted')
            }
        }
        res.redirect('/match')
    }
}
