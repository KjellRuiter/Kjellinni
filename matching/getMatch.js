const User = require('../users/user.model')

module.exports = async user => {
  const allPossibleMatches =
    user.gender === 'both'
      ? await User.find({})
      : await User.find({}).where(
          'gender',
          user.gender === 'male' ? 'female' : 'male',
        )
  await user.populate('matches').execPopulate()
  console.log(user)
  const fitleredOut = allPossibleMatches.filter()
}
