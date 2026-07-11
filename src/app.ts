import express , {Application , Request , Response} from 'express';
import {securityHeader , corsMiddleware , rateLimiter} from './middlewares/security.middleware';
import {httpLogger} from './middlewares/logger.middleware';
import {notFoundHandler , errorHandler} from './middlewares/error.middleware';
import websiteRoutes from './modules/website/website.routes';

const app:Application = express();

app.use(securityHeader);
app.use(corsMiddleware);
app.use(rateLimiter);
app.use(express.json());
app.use(httpLogger);

app.get('/health' , (_req:Request , res:Response)=>{
    res.status(200).json({status:'ok' , timestamp: new Date().toISOString()});
});


app.use('/api/articles', websiteRoutes);


app.use(notFoundHandler);
app.use(errorHandler);

export default app;