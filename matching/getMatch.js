const User = require('../users/user.model')

module.exports = async user => {
  const allPossibleMatches = await User.find({}).where(
    'gender',
    user.gender === 'male' ? 'female' : 'male',
  )

  const fitleredOut = allPossibleMatches.filter()
}
