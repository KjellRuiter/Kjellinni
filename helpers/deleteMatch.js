const mongo = require("mongodb");

module.exports = async (collection, room) => {
    
        const uri = process.env.DB_URI;

        const client = new mongo.MongoClient(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
          });
          try {
            await client.connect();
            const db = client.db(process.env.DB_NAME);
            const deleteDocument = await db
              .collection(collection)
              .deleteOne({ roomID: room });
            return deleteDocument;
          } catch (e) {
            console.error(e);
          } finally {
            await client.close();
          }
}
