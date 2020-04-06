const getSong = require('./getSong')

module.exports = async (req, res) => {
  await req.user.populate('matches').execPopulate()
  req.session.user = req.user
  req.session.matches = req.user.matches[0]
  if (req.session.acces_token) {
    const song = await getSong(req.session.acces_token)
    console.log(song)
  }
  res.render('pages/profile', { user: req.user })
}
