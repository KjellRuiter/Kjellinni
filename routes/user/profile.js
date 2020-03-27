module.exports = async (req, res) => {
  await req.user.populate('matches').execPopulate()
  req.session.user = req.user
  req.session.matches = req.user.matches[0]
  res.render('pages/profile', { user: req.user })
}
