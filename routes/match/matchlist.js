const User = require('../../database/models/user')

module.exports = class {
    static async getMethod(req, res) {
        const getAcceptedMatches = req.session.matches.matched_history.filter(user => user.status==='accepted')
        
        const userPromises = getAcceptedMatches.map(user=> User.findById(user.userId))
        const allUsers = await Promise.all(userPromises)
        console.log(allUsers)
        res.render('pages/matchlist', {user:getAcceptedMatches  })
    }
}
