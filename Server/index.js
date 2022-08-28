const { PORT } = require('./config.js'); 
const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Hola Server')
});

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
});