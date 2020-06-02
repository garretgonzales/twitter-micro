const express = require('express');
const cors = require('cors');
const monk = require('monk');
const Filter = require('bad-words');
const rateLimit = require('express-rate-limit');

const app = express();

const db = monk('localhost/tweeter');
const tweets = db.get('tweets'); // collection within db - created automatically by mongo
const filter = new Filter();


app.use(cors());
app.use(express.json()); // bodyparser built into express middleware

app.get('/', (req, res) => {
    res.json({
        message: 'Tweeting w/nodemon part5'
    });
});

app.get('/tweets', (req, res) => {
    tweets
        .find()
        .then(tweets => {
            res.json(tweets);
        });
});

function isValidTweet(tweet) {
    return tweet.name && tweet.name.toString().trim() !== '' &&
        tweet.content && tweet.content.toString().trim() !== '';
}

app.use(rateLimit({
    windowMs: 30 * 1000, // 15 minutes
    max: 1 // limit each IP to 100 requests per
}));


app.post('/tweets', (req, res) => {
    if (isValidTweet(req.body)) {
        // insert into db..
        const tweet = {
            name: filter.clean(req.body.name.toString()),
            content: filter.clean(req.body.content.toString()),
            created: new Date()
        };

        tweets
            .insert(tweet)
            .then(createdTweet => {
                res.json(createdTweet);
            });
        //console.log(tweet);
    } else {
        res.status(422);
        res.json({
            message: 'Fill in all fields.'
        });
    }
});

app.listen(5001, () => {
    console.log('Listening on http://localhost:5001');
});