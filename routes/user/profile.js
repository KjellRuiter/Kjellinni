const getSong = require('./getSong')

module.exports = async (req, res) => {
    req.session.user = req.user
    await req.session.user.populate('matches').execPopulate()
  
  if (req.session.acces_token) {
    const song = await getSong(req.session.acces_token)
    console.log(song)
  }
  req.session.matches = req.user.matches
  res.render('pages/profile', { user: req.user })
}
