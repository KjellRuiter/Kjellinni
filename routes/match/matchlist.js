const User = require("../../database/models/user")
const splitMatches = require('../../helpers/splittingMatches')

module.exports = class {
    static async getMethod(req, res) {
        const getAcceptedMatches = req.session.matches.matched_history.filter(user => user.status == "accepted")
        
        const userPromises = getAcceptedMatches.map(user=> User.findById(user.userId))
        const allUsers = await Promise.all(userPromises)
        const splittedMatches = await splitMatches(allUsers, req.session.user._id)
        res.render('pages/matchlist', {newMatches: splittedMatches.new, oldMatches: splittedMatches.old})
    }
}
