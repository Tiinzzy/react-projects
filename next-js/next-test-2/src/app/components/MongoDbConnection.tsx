const { MongoClient } = require('mongodb');

const url: string = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const dbName: string = 'kanban';

export async function main() {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('documents');

    console.log(collection)
    // the following code examples can be pasted here...

    return collection;
}
