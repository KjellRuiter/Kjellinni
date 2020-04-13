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
    if (getChat == 0) {
      // this returns the object in the chats documents whose id's match the two you submitted
      data = await db
        .collection(collection)
        .find({ users: { $all: [findThis[0], findThis[1]] }})
        .toArray()
      } else if( getChat == 1) {
        // this returns the object whose id is the same as the one you are looking for
        data = await db
        .collection(collection)
        .find(ObjectId(findThis))
        .toArray()
      } else{
        // to find the owner of the match
        // this search will have to be performed twice, once for each end of the match
        data = await db
          .collection(collection)
          .find({ owner: ObjectId(findThis) })
          .toArray()
      }
    return data
  } catch (e) {
    console.error(e)
  } finally {
    await client.close()
  }
}
