import path from 'path';
import fs from 'fs';
import morgan from 'morgan';
import winston from 'winston';


const configLog = (app) => {
    const __dirname = path.resolve();
    var today = new Date();
    var dateName = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear();
    var accessLogStream = fs.createWriteStream(path.join(__dirname, dateName+'_access.log'), { flags: 'a' });
    app.use(morgan('combined', { stream: accessLogStream }));
}
