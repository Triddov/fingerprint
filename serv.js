const express = require('express');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const LOGFILE_PATH = process.env.LOGFILE_PATH || 'fingerprints.log';
const HASHFILE_PATH = process.env.HASHFILE_PATH || 'hashes.json';

app.use(express.json());
app.use(express.static('public'));

function generateHash(data) {
    const hash = crypto.createHash('sha256');
    hash.update(JSON.stringify(data));
    return hash.digest('hex');
}

function readHashes() {
    if (fs.existsSync(HASHFILE_PATH)) {
        return JSON.parse(fs.readFileSync(HASHFILE_PATH, 'utf8'));
    }
    return [];
}

function saveHashes(hashes) {
    fs.writeFileSync(HASHFILE_PATH, JSON.stringify(hashes, null, 2));
}

app.post('/data', (req, res) => {
    const fingerprint = req.body;
    const hash = generateHash(fingerprint);

    const hashes = readHashes();

    if (hashes.includes(hash)) {
        return res.sendStatus(200);
    }

    const timestamp = new Date().toLocaleString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });

    const logEntry = `[${timestamp}] ` + JSON.stringify(fingerprint) + '\n';
    fs.appendFileSync(LOGFILE_PATH, logEntry);

    hashes.push(hash);
    saveHashes(hashes);

    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
