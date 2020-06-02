const express = require('express');



const app = express();

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