import fs from 'fs/promises';
import path from "path";
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FINGERPRINT_DIR = path.resolve(__dirname, '../fingerprints');

export async function saveFingerprint(fingerprintData, hash) {
    await fs.mkdir(FINGERPRINT_DIR, { recursive: true });

    const filePath = path.join(FINGERPRINT_DIR, `${hash}.json`);
    await fs.writeFile(filePath, JSON.stringify(fingerprintData, null, 2), 'utf-8');
}
