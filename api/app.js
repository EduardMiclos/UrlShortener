/** Libs */
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const random = require('random-string-generator');
const cors = require('cors');
const bodyparser = require('body-parser');

/** Models */
const URLMapping = require('./models/URLMapping');


/** Set-up mongoose. */
mongoose.set('strictQuery', false);

/** Extract all the environment variables. */
dotenv.config();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;
const CLIENT_URL = process.env.CLIENT_URL;
const SHORT_URL_LENGTH = 6;

/** Initializing the app. */
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(cors({
    credentials: true,
    origin: CLIENT_URL
}))

/** Return information about a specific short URL. */
app.get('/url/:shortURL', async (req, res) => {
    const shortURL = req.params.shortURL;
    let urlMapping = await URLMapping.findOne({shortUrl: shortURL}).exec();

    if (urlMapping === null)
        res.status(400).json({errMessage: "Could not find the specified short URL!"});
    else {

        res.status(200).json({
            URL: urlMapping.url,
            shortURL: urlMapping.shortUrl,
            clicks: urlMapping.clicks
        });
    }
});


/** Shorten a specific URL. */
app.post('/shorten', async (req, res) => {
    const url = req.body.url;
    let urlMapping = await URLMapping.findOne({url: url}).exec();

    if (urlMapping == null) {
        let newShortUrl = null;

        do {
            newShortUrl = random(SHORT_URL_LENGTH, 'alphanumeric')
            urlMapping = await URLMapping.findOne({shortUrl: newShortUrl}).exec();

            if (urlMapping == null) break;
        } while (true);

        urlMapping = await URLMapping.create({url: url, shortUrl: newShortUrl});
    }

    res.status(200).json({
        URL: urlMapping.url,
        shortURL: urlMapping.shortUrl,
        clicks: urlMapping.clicks
    });
});


/** Visit a specific URL (given a shorten URL?). */
app.post('/visit', async (req, res) => {
    // to do
});

const start = async() => {
    try {
        await mongoose.connect(MONGODB_URI);

        app.listen(PORT, () => {
            console.log("Application listening on PORT " + PORT);
        });
    }
    catch (err) {
        console.log(err.message);
    }
}

start();