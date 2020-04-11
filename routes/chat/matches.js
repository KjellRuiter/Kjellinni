const getFromDB  = require('../../helpers/getFromDb');
const splitMatches  = require('../../helpers/splittingMatches');

module.exports = class {
    static async getMethod(req, res) {
        const matches = await getFromDB(process.env.DB_MATCHES);
        const filteredMatches = splitMatches(matches);
        // make the user come from req.user
        res.render('pages/matches', {user: 'Janno',newMatches: filteredMatches.new, oldMatches: filteredMatches.old})
    }
}