import { application } from './app.js';
import config from './config/index.js';
import express from 'express';

const app = express();
const PORT = config.PORT || 2000;

await application(app);

app.listen(PORT, () => console.log('Server running on port', PORT));