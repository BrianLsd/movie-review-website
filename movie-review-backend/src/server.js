import express from 'express';
import {MongoClient} from 'mongodb';
import path from 'path';
import {fileURLToPath} from 'url';
import multer from 'multer';
import fs from 'fs';

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
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'admin-json/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const adminUpload = multer({ storage });

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

// admin endpoint - I have tested this endpoint using Postman and it's up and running
app.post('/api/admin', adminUpload.single('admin-movies'), async (req, res) => {
    const apiKey = req.headers["x-api-key"]; // api key name
    const apiKeyValue = "23fdf45vDWdhl346"; // API key value can be changed here

    if (apiKey !== apiKeyValue){ 
        return res.status(401).json({error:"Invalid API Key"});
    }

    if (!req.file) {
        return res.status(400).json({ error: "No files were uploaded." });
    }

    if (!req.file.originalname.endsWith('.json')) {
        return res.status(400).json({ error: 'Invalid file type. Only JSON files are allowed.' });
    }

    try {
        const moviesJSON = fs.readFileSync(req.file.path);
        const movies = JSON.parse(moviesJSON);
        console.log(movies);
        const client = new MongoClient('mongodb://127.0.0.1:27017/');
        await client.connect();

        const db = client.db('movie-review-db');
        const deleteOperation = await db.collection('movies').deleteMany({}); // remove all the data from the db
        if (!deleteOperation) {
            return res.status(404).json({ error: 'Could not remove all the movies' });
        } 
        const insertOperation = await db.collection('movies').insertMany(movies);
        if (!insertOperation) {
            return res.status(404).json({ error: 'Could not insert all the movies' });
        }
        return res.status(200).json({ message: 'Movies have been added' });
    } catch (e) {
        return res.status(400).json({ error: e.message });
    }
})

app.listen(port, () => console.log(`Server is running on localhost:${port}`));