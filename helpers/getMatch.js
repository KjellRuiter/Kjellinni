const User = require('../database/models/user')
const Matches = require('../database/models/matches')
const randomItem = require('random-item')

module.exports = async (user, matches) => {
    console.log(matches)
    console.log(matches.currentlyMatching)
    if (matches.currentlyMatching) {
        console.log('huh')
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
    console.log(allPossibleMatches)
    const filtered = allPossibleMatches.filter(u => {
        const alreadyMatched = matches.matched_history.find(u2 => {
            return u._id.equals(u2.userId)
        })
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
