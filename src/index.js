import 'dotenv/config';
import { app } from './app.js';
import dbConnect from './Database/dbConnect.js';

const port = process.env.PORT || 5000;

await dbConnect();

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})