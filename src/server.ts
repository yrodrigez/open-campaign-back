import express from 'express';
import path from 'path';
import apiControllers from './interface/controllers';
import cors from 'cors';

require('dotenv').config({path: path.resolve(__dirname, '../.env.local')});
if (!process.env.RESEND_API_KEY) {
    throw new Error('Missing env var: RESEND_API_KEY')
}

const app = express();
app.use(express.json());
app.use(cors());
const PORT = 3000;

app.use(express.static(path.join(__dirname, '..', 'webapp')));


app.use('/', apiControllers);


app.listen(PORT, async () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
