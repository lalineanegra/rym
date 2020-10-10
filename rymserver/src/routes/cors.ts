import express, { Request } from 'express'

const whitelist = ['http://localhost:3000', 'https://localhost:3443']

export const corsOptionsDelegate = (req: Request, callback: any) => {
    let corsOptions;
    //@ts-ignore
    if (whitelist.indexOf(req.header('Origin')) !== -1){
        corsOptions = {origin: true} // reflect (enable) the requested origin
    } else {
        corsOptions = {origin: false} // disable CORS for this request
    }
    callback(null, corsOptions);
};
