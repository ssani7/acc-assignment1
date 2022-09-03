const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const userRoute = require('./routes/v1/user.routes');

app.use(express.json());

const allData = JSON.parse(fs.readFileSync('./data.json'));


const run = async () => {
    try {
        app.get('/', async (req, res) => {
            res.send("hello");
            res.end();
        })

        app.use('/user', userRoute);
    }
    finally {

    }
}
run().catch(console.dir);

app.listen(5000, () => {
    console.log("server running at 5000");
})