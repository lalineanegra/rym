import createError, { HttpError } from 'http-errors';
import express, { Application, Request, Response, NextFunction} from 'express';
import logger from 'morgan';
import redis from 'redis';
import session from 'express-session';

import charactersRouter from './routes/charactersRoute';
import usersRouter from './routes/usersRoute';

let app: Application = express();
let RedisStore = require('connect-redis')(session);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Start Redis client
const redisPort: any = process.env.REDIS_PORT || 6379
const host = process.env.REDIS_NAME || '127.0.0.1'
let redisClient = redis.createClient(redisPort, host);
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

app.use('/characters', charactersRouter);
app.use('/users', usersRouter);

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
  res.json({"error": "error"});
});

export default app;
