const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));


app.post('/data', (req, res) => {
    const fingerprint = req.body;
    fs.appendFileSync('fingerprints.log', JSON.stringify(fingerprint) + '\n');
    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
