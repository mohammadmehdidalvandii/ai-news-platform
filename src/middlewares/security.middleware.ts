import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

export const securityHeader = helmet();
export const corsMiddleware = cors();

export const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders:true,
    legacyHeaders:false
})