module.exports = async (req, res) => {
  await req.user.populate('matches').execPopulate()
  req.session.user = req.user
  req.session.matches = req.user.matches
  res.render('pages/profile', { user: req.user })
}
