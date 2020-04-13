const getSong = require('./getSong')
const Songs = require('../../database/models/songs')

module.exports = async (req, res) => {
  // Connect to songs model.
  await req.user.populate('songs').execPopulate()
  // Connect to matches model.
  await req.user.populate('matches').execPopulate()
  req.session.user = req.user
  const songInDb = req.session.user.songs

  // Check if song data is already in database or not.
  if (!songInDb) {
    // Check if user retrieved an acces token.
    if (req.session.acces_token) {
      const song = await getSong(req.session.acces_token)
      // Set data for database.
      const newSongs = await new Songs({
        owner: req.session.user._id,
        id: song[0].id,
      })
      // Save data.
      await newSongs.save()
      res.redirect('http://localhost:3000/profile')
    }
  }
  // Check if user already has Spotify data stored.
  else if (songInDb) {
    console.log('song already in database')
    res.render('pages/profile', {
      user: req.user,
      song: songInDb,
    })
  }
}
