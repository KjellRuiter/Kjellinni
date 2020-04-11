const mongo = require("mongodb");

module.exports = async (collection, findThis) => {
    
        const uri = process.env.DB_URI;

        const client = new mongo.MongoClient(uri, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        });
        try {
          await client.connect();
          const db = client.db(process.env.DB_NAME);
          let data;
          if (findThis){
             data = await db
            .collection(`${collection}`)
            .find({ roomID: findThis })
            .toArray();
          }else{
             data = await db
              .collection(`${collection}`)
              .find({})
              .toArray();
          }
          return data;
        } catch (e) {
          console.error(e);
        } finally {
          await client.close();
        }
}
