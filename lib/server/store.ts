import 'server-only'
import { appendFile, mkdir } from 'node:fs/promises'
import path from 'node:path'

/**
 * Speichert Anfragen zeilenweise (JSONL) mit Dateirechten 600.
 * In Coolify /app/data als persistentes Volume mounten, sonst gehen Daten beim Redeploy verloren.
 */
const DIR = path.resolve(process.env.DATA_DIR || './data')

export async function store(file: 'anfragen', record: object) {
  await mkdir(DIR, { recursive: true, mode: 0o700 })
  await appendFile(path.join(DIR, `${file}.jsonl`), JSON.stringify(record) + '\n', { mode: 0o600 })
}
