const bcrypt = require('bcryptjs');
const db = require('../helpers/db');

const { User } = db;
const path = require('path');

module.exports = {
  authenticate,
  create,
  update,
  delete: _delete,
};

async function authenticate({ email, password }) {
  const user = await User.findOne({ email });

  if (user && bcrypt.compareSync(password, user.hash)) {
    const { hash, ...userWithoutHash } = user.toObject();

    return userWithoutHash;
  }
}

async function create(userParam) {
  // validate
  if (await User.findOne({ email: userParam.email })) {
    throw `Email "${userParam.email}" is already taken`;
  }

  const user = new User(userParam);

  // hash password
  if (userParam.password) {
    user.hash = bcrypt.hashSync(userParam.password, 10);
  }

  // save user
  await user.save();
}

async function update(id, userParam, file = null) {
  const user = await User.findById(id);

  // validate
  if (!user) throw 'User not found';

  if (
    user.email !== userParam.email &&
    (await User.findOne({ email: userParam.email }))
  ) {
    throw `Email "${userParam.email}" is already taken`;
  }

  // hash password if it was entered
  if (userParam.password) {
    userParam.hash = bcrypt.hashSync(userParam.password, 10);
  }

  // Filename
  if (file) {
    user.photo = file.filename;
  }

  // copy userParam properties to user
  Object.assign(user, userParam);

  await user.save();
}

async function _delete(id) {
  await User.findByIdAndRemove(id);
}
