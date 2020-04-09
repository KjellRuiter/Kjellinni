module.exports = class {
    static async getMethod(req, res) {
        console.log(req.session.matches)
        res.send('test')
        const getAcceptedMatches = req.session.matches.matched_history.filter(user => user.status==='accepted')
        res.render('pages/matches', {user:getAcceptedMatches  })
    }
}
