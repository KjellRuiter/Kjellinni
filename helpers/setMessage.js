const ObjectId = require('mongodb').ObjectId;
const { MongoClient } = require('mongodb')

module.exports = async (collection, data, isNewChat, collectionID) => {
  const uri = process.env.DB_URI

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  try {
    await client.connect()
    const db = client.db(process.env.DB_NAME)
    let fullDump
    if (isNewChat == 0) {
      // makes a new chat in the chat document
      fullDump = await db.collection(collection).insertOne({
        users: [data[0],data[1]],
        chat_history: []
      })
      return fullDump.ops
  }else if(isNewChat == 1){
    // updates the chat_history in the document
     fullDump = await db.collection(`${collection}`).updateOne(
        { _id: ObjectId(collectionID) },
        { $set: { chat_history: data } }
      );
  }else{
    // updates the matched history of the user who's id is passed as an argument in the document
     fullDump = await db.collection(`${collection}`).updateOne(
        { _id: ObjectId(collectionID) },
        { $set: { matched_history: data } }
      );
  }
    return fullDump
  } catch (e) {
    console.error(e)
  } finally {
    await client.close()
  }
}
