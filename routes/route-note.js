const express = require('express');
const router = express.Router();




const { ObjectId } = require('mongodb');
const dbConnection = require('../db');
const dbName = 'nfmongop';


// read
router.get('/', async (req, res) => {

    let uid = req.user._id;

    let client = await dbConnection.connect()
    let collection = client.db(dbName).collection('notes')
    let result = await collection.find({ userId: uid }).toArray()
    // client.close()

    res.json(result)
})

// create
router.post('/', async (req, res) => {

    let newNote = req.body
    
    let uid = req.user._id
    newNote.userId = uid;

    let client = await dbConnection.connect()
    let collection = client.db(dbName).collection('notes')
    let result = await collection.insertOne(newNote);
    // client.close()

    res.json(result)
})

// update
router.put('/', async (req, res) => {

    let targetNote = req.body

    let client = await dbConnection.connect()
    let collection = client.db(dbName).collection('notes')

    let filter = { _id: ObjectId(targetNote._id) }
    let query = {
        $set: { message: targetNote.message }
    }

    let result = await collection.updateOne(filter, query)
    // client.close()

    res.json(result);
})

// delete
router.delete('/', async (req, res) => {

    let targetNote = req.body

    let client = await dbConnection.connect()
    let collection = client.db(dbName).collection('notes')

    let filter = { _id: ObjectId(targetNote._id) }

    let result = await collection.remove(filter)
    // client.close()

    res.json(result);
})


module.exports = router;