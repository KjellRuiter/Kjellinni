// const db = require('../database/db')
const User = require('../database/models/user')
const { MongoClient } = require('mongodb')

module.exports = async (data, collection) => {
  const uri = process.env.DB_URI

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  try {
    await client.connect()
    const db = client.db(process.env.DB_NAME)
    const fullDump = await db.collection(`${collection}`).insertOne({
      from: data.sender,
      msg: data.msg,
      time: data.time,
    })
    return fullDump
  } catch (e) {
    console.error(e)
  } finally {
    await client.close()
  }
}
