const User = require('../database/models/user')

module.exports = async (user, matches) => {
  const allPossibleMatches =
    user.gender === 'both'
      ? await User.find({})
      : await User.find({}).where(
          'gender',
          user.gender === 'male' ? 'female' : 'male',
        )
  console.log(user)
  const fitleredOut = allPossibleMatches.filter()
}
