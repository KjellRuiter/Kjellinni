const mongo = require("mongodb");

module.exports = async (collection, room, newValue) => {

const uri = process.env.DB_URI;

const client = new mongo.MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    const updatedDocument = await db
      .collection(`${collection}`)
      .updateOne(
        { roomID: `${room}` },
        { $set: { lastMessage: `${newValue}` } }
      );
    return updatedDocument;
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}