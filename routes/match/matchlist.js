module.exports = class {
    static async getMethod(req, res) {
        const matches = await getMatches(process.env.DB_MATCHES);
        const getAcceptedMatches = (list)=> list.filter(user => user.status==='accepted')
        res.render('pages/matches', {user: req.session.matches.matched_history })
    }
}
