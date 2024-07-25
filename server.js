const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 3000;

const uri = "mongodb+srv://atnpyth:7y5fidCIMdAIiGJ8@thanhcon.dryxlpp.mongodb.net/?retryWrites=true&w=majority&appName=thanhcon";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Do not close the connection immediately
  }
}
run().catch(console.dir);

const db = client.db("thanhcon");
const iplist = db.collection("iplist");

app.use(async (req, res, next) => {
    const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    if (clientIp) {
        const ipEntry = { name: "ip", ip: clientIp };
        try {
            await iplist.insertOne(ipEntry);
            console.log('IP saved to database:', clientIp);
        } catch (err) {
            console.error('Error saving IP to database:', err);
        }
    }
    next();
});

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
