import express from 'express';
import {MongoClient} from 'mongodb';
import path from 'path';
import {fileURLToPath} from 'url';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 8000;

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../posters')));
app.use(express.static(path.join(__dirname, '../build')));

app.get(/^(?!\/api).+/, (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

const upload = multer({ dest: 'posters/' });

// load movies
app.get('/api/movies', async (req, res) => {
    const client = new MongoClient('mongodb://127.0.0.1:27017/');
    await client.connect();

    const db = client.db('movie-review-db');
    const data = await db.collection('movies').find().toArray();;
    res.json(data);
});

// add a new movie
app.post('/api/leave-review', upload.single('image') ,async (req, res) => {
    const client = new MongoClient('mongodb://127.0.0.1:27017/');
    await client.connect();

    const db = client.db('movie-review-db');
    const insertOperation = await db.collection('movies').insertOne({"name":req.body.name,
                                                                    "releaseDate":req.body.release, 
                                                                    "actors":req.body.actor, 
                                                                    "image":req.file.filename, 
                                                                    "ratings":req.body.rating});
    res.redirect('/');
})

// delete a movie
app.post('/api/remove-movie/:name', async (req, res) => {
    const client = new MongoClient('mongodb://127.0.0.1:27017/');
    await client.connect();
    
    const deleteQuery = req.params;

    const db = client.db('movie-review-db');
    const deleteOperation = await db.collection('movies').deleteOne(deleteQuery);
    if (deleteOperation) {
        return res.status(200).json({ message: 'Movie has been deleted' });
    } else {
        return res.status(404).json({ message: 'Deletion failed...' });
    }
    
})

app.listen(port, () => console.log(`Server is running on localhost:${port}`));