import crypto from "crypto";
import fs from "fs/promises";
import process from "process";
import { logger } from "./logger.js";

const HASHFILE_PATH = 'hashes/hashes.json';

export function generateHash({data, algo = 'sha256'}) {
    const hash =  crypto.createHash(algo);
    data = JSON.stringify(data);
    hash.update(data);
    return hash.digest('hex');
}

export async function readHashes() {
    await fs.mkdir(process.cwd() + '/hashes', { recursive: true });
    try {
        const data = await fs.readFile(HASHFILE_PATH, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        logger.error(`Failed to read hash: ${err}`);
    }
}

export async function addHash(newHash) {
    const hashes = await readHashes();

    if (!hashes.includes(newHash)) {
        hashes.push(newHash);
        await fs.writeFile(HASHFILE_PATH, JSON.stringify(hashes, null, 2), 'utf8');
    }
}
