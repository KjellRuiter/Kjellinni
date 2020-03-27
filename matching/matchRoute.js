module.exports = (req, res) => {
  console.log(req.session.matches)
  res.render('pages/match')
}
