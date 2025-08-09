import express from 'express';
import { generateHash, readHashes, addHash } from './hash.js'
import { generateDate } from './date.js'
import { saveFingerprint } from './fingers.js'
import { logger } from './logger.js'

const PORT = process.env.HTTP_PORT || 80;
const app = express();

app.use(express.json());
app.use(express.static('public'));


app.post('/api/data', async (req, res) => {
    const fingerprintData = req.body;

    const hash = generateHash({data: fingerprintData});
    const hashes = await readHashes();
    if (hashes.includes(hash)) {
        logger.info(`Fingerprint request for ${hash} again`);
        return res.sendStatus(200);
    }

    fingerprintData.createTimestamp = generateDate();
    await saveFingerprint(fingerprintData, hash)
    await addHash(hash);

    logger.info(`Fingerprint created for ${hash}`);
    res.sendStatus(201);
});


app.listen(PORT, () => {
    logger.info(`Server starts on port ${PORT}`);
});
