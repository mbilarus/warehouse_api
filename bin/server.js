const { MongoClient } = require('mongodb');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const app = express();
const PORT = process.env.PORT || 6969;
const uri = "mongodb+srv://mbilarusadmin:jgFl35Dhl5FDla8lf5x0F13pw@cluster0.qhdvp.mongodb.net/warehouse?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function main() {
    await client.connect();
    // GraphQL
    const schema = require('../lib/src/schemas/items_schema');
    app.use('/graphql', graphqlHTTP({
        schema,
        graphiql: true
    }));
    app.listen(PORT, () => {
        console.log('Server running');
    });
}
main().catch(console.error);
module.exports = client;
