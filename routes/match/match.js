const getMatch = require('../../helpers/getMatch')
const matchesUpdate = require('../../database/matchUpdates')
const Matches = require('../../database/models/matches')
const User = require('../../database/models/user')

module.exports = class {
  static async getMethod(req, res) {
    // Get latest matches
    const user = await User.findById(req.session.user._id)
    await user.populate('matches').execPopulate()
    req.session.matches = user.matches
    // console.log(req.session.matches)
    const match = await getMatch(req.session.user, req.session.matches)

    // Spotify
    const matching = req.session.matches.currentlyMatching
    const matchingSong = await User.findById(matching)
    // Connect to songs model.
    await matchingSong.populate('songs').execPopulate()
    // Get fav song of match.
    const matchSong = matchingSong.songs
    res.render('pages/match', { match, song: matchSong })
  }

  static async postMethod(req, res) {
    const updatedMatches = await Matches.findById(req.session.matches._id)
    req.session.matches = updatedMatches
    const matchingUserId = req.session.matches.currentlyMatching
    const checkDenied = req.session.matches.otherUser_denied.find(m =>
      m.equals(matchingUserId)
    )
    const checkAccepted = req.session.matches.otherUser_accepted.find(m =>
      m.equals(matchingUserId)
    )

    if ('like' in req.body) {
      if (!checkDenied && !checkAccepted) {
        await matchesUpdate.otherUserStatus(
          req.session.user._id,
          req.session.matches.currentlyMatching,
          'accepted'
        )
        await matchesUpdate.matchesHistory(
          req.session.matches,
          'pending',
          req.session.matches.currentlyMatching
        )
      } else if (checkDenied) {
        await matchesUpdate.matchesHistory(
          req.session.matches,
          'denied',
          req.session.matches.currentlyMatching
        )
      } else if (checkAccepted) {
        await matchesUpdate.otherUserMatchHistory(
          req.session.user._id,
          req.session.matches.currentlyMatching,
          'accepted'
        )
        await matchesUpdate.matchesHistory(
          req.session.matches,
          'accepted',
          req.session.matches.currentlyMatching
        )
      }
    } else if ('dislike' in req.body) {
      if (!checkDenied && !checkAccepted) {
        await matchesUpdate.otherUserStatus(
          req.session.user._id,
          req.session.matches.currentlyMatching,
          'denied'
        )
        await matchesUpdate.matchesHistory(
          req.session.matches,
          'denied',
          req.session.matches.currentlyMatching
        )
      } else if (checkDenied) {
        await matchesUpdate.matchesHistory(
          req.session.matches,
          'denied',
          req.session.matches.currentlyMatching
        )
      } else if (checkAccepted) {
        await matchesUpdate.otherUserMatchHistory(
          req.session.user._id,
          req.session.matches.currentlyMatching,
          'denied'
        )
        await matchesUpdate.matchesHistory(
          req.session.matches,
          'denied',
          req.session.matches.currentlyMatching
        )
      }
    }
    await matchesUpdate.resetCurrentlyMatching(req.session.matches)
    res.redirect('/match')
  }
}
