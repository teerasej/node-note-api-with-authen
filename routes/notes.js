const { ObjectId } = require('mongodb');
const dbConnection = require('../db');
const dbName = 'nfmongop';


const settingRoute = (app) => {
    // read
    app.get('/notes', async (req, res) => {

        let client = await dbConnection.connect()
        let collection = client.db(dbName).collection('notes')
        let result = await collection.find().limit(10).toArray()
        client.close()

        res.json(result)
    })

    // create
    app.post('/notes', async (req, res) => {

        let newNote = req.body

        let client = await dbConnection.connect()
        let collection = client.db(dbName).collection('notes')
        let result = await collection.insertOne(newNote);
        client.close()

        res.json(result)
    })

    // update
    app.put('/notes', async (req, res) => {

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
    app.delete('/notes', async (req, res) => {

        let targetNote = req.body

        let client = await dbConnection.connect()
        let collection = client.db(dbName).collection('notes')

        let filter = { _id: ObjectId(targetNote._id) }

        let result = await collection.remove(filter)
        client.close()

        res.json(result);
    })
}

module.exports = settingRoute