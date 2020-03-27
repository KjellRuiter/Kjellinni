// user routes
app.use('/users', require('./users/user.controller'))

// views
app.get('/', forwardAuthenticated, (req, res) => {
  res.render('pages/login')
})
app.get('/register', forwardAuthenticated, (req, res) =>
  res.render('pages/register'),
)

app.get('/profile', ensureAuthenticated, async (req, res) => {
  await req.user.populate('matches').execPopulate()
  req.session.user = req.user
  req.session.matches = req.user.matches[0]
  res.render('pages/profile', { user: req.user })
})

const router = new require('express').Router()

router
  .get('/')
  .get('/users')
  .get('/profile')
