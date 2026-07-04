import pinoHttp from 'pino-http';
import {config} from '../config/index';

export const httpLogger = pinoHttp({
    level: config.app.env === 'development' ? 'debug' : 'info'
});