const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // bodyparser built into express middleware

app.get('/', (req, res) => {
    res.json({
        message: 'Tweeting w/nodemon part5'
    });
});


function isValidTweet(tweet) {
    return tweet.name && tweet.name.toString().trim() !== '' &&
        tweet.content && tweet.content.toString().trim() !== '';
}

app.post('/tweets', (req, res) => {
    console.log(req.body);
    if (isValidTweet(req.body)) {
        // insert into db..
        const tweet = {
            name: req.body.name.toString(),
            content: req.body.content.toString()
        };
    } else {
        res.status(422);
        res.json({
            message: 'Fill in all fields.'
        });
    }
})

app.listen(5001, () => {
    console.log('Listening on http://localhost:5001');
});