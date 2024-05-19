/** Libs */
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const random = require('random-string-generator');

/** Models */
const URLMapping = require('./models/URLMapping');


/** Set-up mongoose. */
mongoose.set('strictQuery', false);

/** Extract all the environment variables. */
dotenv.config();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;
const CLIENT_URL = process.env.CLIENT_URL;
const SHORT_URL_LENGTH = process.env.SHORT_URL_LENGTH;

/** Initializing the app. */
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(cors({
    credentials: true,
    origin: CLIENT_URL
}))

/** Return information about a specific URL. */
app.get('/url/:url', async (req, res) => {
    const url = req.params.url;
    let urlMapping = await URLMapping.findOne({url: url}).exec();

    if (urlMapping == null)
        res.statusCode(400).json({errMessage: "Could not find the specified URL!"});

    res.statusCode(200).json({
        URL: urlMapping.url,
        shortURL: urlMapping.shortUrl,
        clicks: urlMapping.clicks
    })
});


/** Shorten a specific URL. */
app.post('/shorten', async (req, res) => {
    const url = req.query.url;
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

    res.statusCode(200).json({
        URL: urlMapping.url,
        shortURL: urlMapping.shortUrl,
        clicks: urlMapping.clicks
    });
});


/** Visit a specific URL (given a shorten URL?). */
app.post('/visit', async (req, res) => {
});