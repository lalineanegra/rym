import createError, { HttpError } from 'http-errors';
import express, { Application, Request, Response, NextFunction} from 'express';
import logger from 'morgan';
import redis, { RedisClient } from 'redis';
import session from 'express-session';
import passport from 'passport';

import charactersRouter from './routes/charactersRoute';
import usersRouter from './routes/usersRoute';
const authenticate = require('./authenticate');

let app: Application = express();
let RedisStore = require('connect-redis')(session);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Setup database connection
import mongoose from 'mongoose';
mongoose.Promise = require('bluebird');


//Setup database connection
//const url = process.env.MONGODB_URL || 'mongodb://mongo:27017/rym';
const url = process.env.MONGODB_URL || 'mongodb://localhost:27017/rym';
const connect = mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true } );

connect.then((db) => {
  	console.log('Connected to database'); 
}, (err) => {console.log(err); });

// Start Redis client
const redisPort: any = process.env.REDIS_PORT || 6379;
const host = process.env.REDIS_NAME || '127.0.0.1';
let redisClient: RedisClient = redis.createClient(redisPort, host);
redisClient.on('connect', () => {
  console.log('connected to Redis...')
})
redisClient.on("error", function (err: Error) {
  console.log("Redis error encountered", err);
});

//Express session
app.use(session({
	store: new RedisStore({ host: 'localhost', port: 6379, client: redisClient }),
	secret: '3115kbxd5gg8h6f64wq5dj4d2b3hs8fgh',
	name: '_rymDemo',
	resave: true,
	saveUninitialized: true,
	cookie:{maxAge:120000}  
}))

app.use(passport.initialize());
app.use(passport.session())

//Authentication
function auth(req: Request, res: Response, next: NextFunction) {
	if (!req.isAuthenticated){
		let err = createError(403, 'You are not authenticated');
		err.status = 401;
		next(err);
	}
	else {
		next();
	}
}

//================ Public routes
app.use('/users', usersRouter);
//================ Private routes
app.use(auth);
app.use('/characters', charactersRouter);

// catch 404 and forward to error handler
app.use(function(req: Request, res: Response, next: NextFunction) {
  next(createError(404, 'Not found'));
});

// error handler
app.use(function(err: HttpError, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({"error": err.message});
});

export default app;
