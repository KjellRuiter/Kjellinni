const mongo = require("mongodb");

module.exports = async (collection) => {
    
        const uri = process.env.DB_URI;

        const client = new mongo.MongoClient(uri, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        });
        try {
          await client.connect();
          const db = client.db("dating-base");
          const data = await db
            .collection(`${collection}`)
            .find({})
            .toArray();
          return data;
        } catch (e) {
          console.error(e);
        } finally {
          await client.close();
        }
}
