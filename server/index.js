const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // bodyparser built into express middleware

app.get('/', (req, res) => {
    res.json({
        message: 'Tweeting w/nodemon part4'
    });
});
app.post('/tweets', (req, res) => {
    console.log(req.body);
})

app.listen(5001, () => {
    console.log('Listening on http://localhost:5001');
});