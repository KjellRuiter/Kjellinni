const User = require('../database/models/user')
const Matches = require('../database/models/matches')
const randomItem = require('random-item')

module.exports = async (user, matches) => {
  if (matches.currentlyMatching) {
    const user = await User.findById(matches.currentlyMatching)
    return user
  }
  const allPossibleMatches =
    user.gender === 'both'
      ? await User.find({})
      : await User.find({}).where(
          'gender',
          user.gender === 'Man' ? 'Vrouw' : 'Man',
        )
  const filtered = allPossibleMatches.filter(u => {
    const alreadyMatched = matches.matched_history.find(u2 =>
      u2._id.equals(u._id),
    )
    if (!alreadyMatched) {
      return u
    }
  })
  const random = randomItem(filtered)
  try {
    await Matches.findByIdAndUpdate(matches._id, {
      currentlyMatching: random._id,
    })
  } catch (e) {
    console.log(e)
  }
  return random
}