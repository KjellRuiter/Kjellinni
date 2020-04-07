const bcrypt = require('bcryptjs')
// const flash = require('express-flash')
const db = require('../database/db')

const { User } = db
const Matches = require('../database/models/matches')

module.exports = {
  authenticate,
  create,
  update,
  delete: _delete,
}

async function authenticate(req, res) {
  const { email, password } = req
  const user = await User.findOne({
    email,
  })

  if (user && bcrypt.compareSync(password, user.hash)) {
    const { hash, ...userWithoutHash } = user.toObject()
    return userWithoutHash
  }
}

async function create(userParam, req) {
  // validate
  if (userParam.password.length < 7) {
    req.flash('error', `Er bestaat al een account met ${userParam.email}`)
    throw `Email "${userParam.email}" is already taken`
  }
  if (
    await User.findOne({
      email: userParam.email,
    })
  ) {
    req.flash('error', `Er bestaat al een account met ${userParam.email}`)
    throw `Email "${userParam.email}" is already taken`
  }

  const user = new User(userParam)

  // hash password
  if (userParam.password) {
    user.hash = bcrypt.hashSync(userParam.password, 10)
  }

  // save user
  try {
    await user.save()
    const matches = new Matches({
      owner: user._id,
    })
    await matches.save()
    await user.populate('matches').execPopulate()
    req.session.user = user
    req.session.matches = user.matches[0]
  } catch (e) {}
}

async function update(id, userParam, file = null) {
  const user = await User.findById(id)

  // validate
  if (!user) throw 'User not found'

  if (
    user.email !== userParam.email &&
    (await User.findOne({
      email: userParam.email,
    }))
  ) {
    throw `
          Email "${userParam.email}"
          is already taken `
  }

  // hash password if it was entered
  if (userParam.password) {
    userParam.hash = bcrypt.hashSync(userParam.password, 10)
  }

  // Filename
  if (file) {
    user.photo = file.filename
  }

  // copy userParam properties to user
  Object.assign(user, userParam)

  await user.save()
}

async function _delete(id) {
  await User.findByIdAndRemove(id)
}
