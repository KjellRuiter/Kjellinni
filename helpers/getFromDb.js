const ObjectId = require('mongodb').ObjectId;
const mongo = require('mongodb')

module.exports = async (collection, findThis, getChat) => {
  const uri = process.env.DB_URI

  const client = new mongo.MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  try {
    await client.connect()
    const db = client.db(process.env.DB_NAME)
    let data
    if (getChat === true) {
      data = await db
        .collection(collection)
        .find({ users: { $all: [findThis[0], findThis[1]] }})
        .toArray()
      } else {
        data = await db
          .collection(collection)
          .find(ObjectId(findThis))
          .toArray()
      }
    return data
  } catch (e) {
    console.error(e)
  } finally {
    await client.close()
  }
}
