import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js'
import { configLogs } from './config/loggers.js';
dotenv.config({path: './.env'});

const app = express();

app.use(cors());

const __dirname = path.resolve()

app.use('/public', express.static(path.join(__dirname, '/public')));

connectDB();

configLogs(app);

app.use(express.json());

if(process.env.MODE === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')));
  
    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    )
} else {
    app.get('/', (req, res) => {
        res.send('Pondy tolet API');
    });
}


app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT,() => {
	console.log(`Running on PORT ${process.env.PORT}`);
})
