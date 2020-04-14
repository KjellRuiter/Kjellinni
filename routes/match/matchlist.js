const User = require("../../database/models/user")
const splitMatches = require('../../helpers/splittingMatches')

module.exports = class {
    static async getMethod(req, res) {
        const getAcceptedMatches = req.session.matches.matched_history.filter(user => user.status == "accepted")
        
        const userPromises = getAcceptedMatches.map(user=> User.findById(user.userId))
        const allUsers = await Promise.all(userPromises)
        const splittedMatches = await splitMatches(allUsers, req.session.user._id)
       console.log("coming form matchlist ",splittedMatches)
        // loop through the matches , fetch chatdata and check if the chat_history is longer than 0 if so put them in the oldMatches array if not then dont

        // loop over both arrays to fetch their user data images and shit
        // or maybe just loop over the array and tghen in that loop loop over the allusers array and then filter the right id's

        res.render('pages/matchlist', {allUsers:allUsers})
    }
}
