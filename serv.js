const express = require('express');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const LOGFILE_PATH = process.env.LOGFILE_PATH || 'fingerprints.log';
const HASHFILE_PATH = process.env.HASHFILE_PATH || 'hash';

app.use(express.json());
app.use(express.static('public'));

app.post('/data', (req, res) => {
    const fingerprint = req.body;
    const timestamp = new Date().toLocaleString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false});

    const logEntry = `[${timestamp}] ` + JSON.stringify(fingerprint) + '\n';
    fs.appendFileSync(LOGFILE_PATH, logEntry);
    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
