const getMatch = require('../../helpers/getMatch')
const matchesUpdate = require('../../database/matchUpdates')
const utils = require('../../database/utils')

module.exports = class {
    static async getMethod(req, res) {
        const match = await getMatch(req.session.user, req.session.matches)
        res.render('pages/match', { match })
    }
    static async postMethod(req, res) {
        if ('like' in req.body) {
            const checkDenied = req.session.matches.denied.find(utils.findByObjectId)
            const checkAccepted = req.session.matches.accepted.find(utils.findByObjectId)

            if (!checkDenied && !checkAccepted) {
                // Update other users accepted list
                await matchesUpdate.otherUserStatus(req.session.user._id, req.session.matches.currentlyMatching, 'accepted')
                await matchesUpdate.matchesHistory(req.session.matches, 'pending')
            }
            else if (checkDenied) {
                await matchesUpdate.matchesHistory(req.session.matches, 'denied')
            }
            else if (checkAccepted) {
                await matchesUpdate.otherUserMatchHistory(req.session.user._id, req.session.matches.currentlyMatching)
                await matchesUpdate.matchesHistory(req.session.matches, 'accepted')
            }
        }
        res.redirect('/match')
    }
}
