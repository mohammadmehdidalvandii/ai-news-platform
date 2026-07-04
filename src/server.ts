import app from './app';
import {config} from './config/index';
import {connectDatabase} from './lib/database';

const start = async ():Promise<void>=>{
    await connectDatabase();

    app.listen(config.app.port , ()=>{
        console.log(`✅ Server is running on ${config.app.url}`);
    });
};


start();