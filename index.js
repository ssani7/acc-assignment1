const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const fs = require('fs');
const path = require('path');
const userRoute = require('./routes/v1/user.routes');

app.use(express.json());

const allData = JSON.parse(fs.readFileSync('./data.json'));


app.get('/', async (req, res) => {
    res.send("hello");
    res.end();
})

app.use('/api/v1/user', userRoute);

app.all("*", (req, res) => {
    res.send("NO route found!!");
});

app.listen(port, () => {
    console.log(`server running at ${port}`);
})