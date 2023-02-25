import express from 'express';
import {MongoClient} from 'mongodb';

const app = express();
const port = 8000;

app.use(express.urlencoded({ extended: false }));

// load movies
app.get('/api/movies', async (req, res) => {
    const client = new MongoClient('mongodb://127.0.0.1:27017/');
    await client.connect();

    const db = client.db('movie-review-db');
    const data = await db.collection('movies').find().toArray();;
    res.json(data);
});


// add a new movie
app.post('/api/leave-review', async (req, res) => {
    const client = new MongoClient('mongodb://127.0.0.1:27017/');
    await client.connect();

    const db = client.db('movie-review-db');
    const insertOperation = await db.collection('movies').insertOne({"name":req.body.name,
                                                                    "releaseDate":req.body.release, 
                                                                    "actors":req.body.actor, 
                                                                    "image":req.body.image, 
                                                                    "ratings":req.body.rating});
    res.redirect('/');
})

app.listen(port, () => console.log(`Server is running on localhost:${port}`));