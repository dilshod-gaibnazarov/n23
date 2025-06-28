import { resolve } from 'node:path';
import { readFile, writeFile } from 'node:fs/promises';

const filePath = resolve('users.json');

export const write = async (data) => {
    await writeFile(filePath, JSON.stringify(data, null, 2));
}

export const read = async () => {
    const data = await readFile(filePath, 'utf8');
    return JSON.parse(data);
}