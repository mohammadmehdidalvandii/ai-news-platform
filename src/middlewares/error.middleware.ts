import {Request , Response , NextFunction} from 'express';

export const notFoundHandler = (_req:Request ,  res:Response):void =>{
    res.status(404).json({error:'Route not found'});
};

export const errorHandler = (
    err:Error,
    req:Request,
    res:Response,
    _next:NextFunction
):void =>{
    res.status(500).json({error:'Internal server error'})
}