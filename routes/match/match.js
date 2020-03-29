const getMatch = require('../../helpers/getMatch')
module.exports = class {
    static async getMethod(req, res) {
        const match = await getMatch(req.session.user, req.session.matches)
        console.log('matchennnnn', match)
        res.render('pages/match', { match })
    }
    static async postMethod(req, res) {
        console.log(req.body)
        res.redirect('/match')
    }
}
