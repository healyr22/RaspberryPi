'use strict';

const express = require('express');
const whichBin = require('./whichBin');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/whichBin', async (req, res, next) => {

    try {
        const result = await whichBin.check();
        res.send('Hello World!!! - ' + result);
    } catch(err) {
        console.log(err);
        res.status(500).send({err: err.stack});
    }
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
