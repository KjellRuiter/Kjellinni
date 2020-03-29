const getMatch = require('../../helpers/getMatch')
const User = require('../../database/models/user')

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

            const checkLiked = matchingUserMatches.likes.find(id => id.equals(req.session.user._id))
            const checkDisLiked = matchingUserMatches.dislikes.find(id => id.equals(req.session.user._id))

            if (!checkDisLiked && !checkLiked) {

            }
        }
        res.redirect('/match')
    }
}
