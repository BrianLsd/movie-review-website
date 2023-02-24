import express from 'express';
import {MongoClient} from 'mongodb';

const app = express();
const port = 8000;

// load movies
app.get('/api/movies', async (req, res) => {
    const client = new MongoClient('mongodb://127.0.0.1:27017/');
    await client.connect();

    const db = client.db('movie-review-db');
    const data = await db.collection('movies').find().toArray();
    console.log(data);
    res.json(data);
});


// add a new movie
app.post('/api/leave-review', async (req, res) => {
    const client = new MongoClient('mongodb://127.0.0.1:27017/');
    await client.connect();

    const db = client.db('movie-review-db');
    //const insertOperation = 
    res.redirect('/');
})

app.listen(port, () => console.log(`Server is running on localhost:${port}`));