const getMatch = require('../../helpers/getMatch')
const matchesUpdate = require('../../database/matchUpdates')
const Matches = require('../../database/models/matches')
const Songs = require('../../database/models/songs')

module.exports = class {
  static async getMethod(req, res) {
    const match = await getMatch(req.session.user, req.session.matches)
    res.render('pages/match', { match })
    // Mathing user
    const matchId = req.session.user.songs._id
    console.log(matchId)
    // Get song from matching user
    const matchSong = await Songs.findById(matchId)
    console.log(matchSong)
    res.render('pages/match', {
      song: matchSong,
    })
  }

  static async postMethod(req, res) {
    const updatedMatches = await Matches.findById(req.session.matches._id)
    req.session.matches = updatedMatches
    const matchingUserId = req.session.matches.currentlyMatching
    const checkDenied = req.session.matches.denied.find(
      m => m.userId.str === matchingUserId.str
    )
    const checkAccepted = req.session.matches.accepted.find(
      m => m.userId.str === matchingUserId.str
    )

    await matchesUpdate.resetCurrentlyMatching(req.session.matches)

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
    res.redirect('/match')
  }
}
