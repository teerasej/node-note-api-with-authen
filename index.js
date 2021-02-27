const express = require('express')
const passport = require('./authen')
const app = express()
const port = 3000
app.use(express.json());
app.use(passport.initialize());

const {ObjectId} = require('mongodb');
const dbConnection = require('./db');
const dbName = 'nfmongop';

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// read
app.get('/notes', async (req,res) => {

    let client = await dbConnection.connect()
    let collection = client.db(dbName).collection('notes')
    let result = await collection.find().limit(10).toArray()
    client.close()

    res.json(result)
})

// create
app.post('/notes', async (req,res) => {

    let newNote = req.body

    let client = await dbConnection.connect()
    let collection = client.db(dbName).collection('notes')
    let result = await collection.insertOne(newNote);
    client.close()

    res.json(result)
})

// update
app.put('/notes', async (req,res) => {

    let targetNote = req.body

    let client = await dbConnection.connect()
    let collection = client.db(dbName).collection('notes')

    let filter = { _id: ObjectId(targetNote._id) }
    let query = {
        $set: { first_name: targetNote.first_name }
    }

    let result = await collection.updateOne(filter, query)
    client.close()

    res.json(result);
})

// delete
app.delete('/notes', async (req,res) => {

    let targetNote = req.body

    let client = await dbConnection.connect()
    let collection = client.db(dbName).collection('notes')

    let filter = { _id: ObjectId(targetNote._id) }

    let result = await collection.remove(filter)
    client.close()

    res.json(result);
})


app.listen(port, () => console.log(`Note API listening on http://localhost:${port}!`))