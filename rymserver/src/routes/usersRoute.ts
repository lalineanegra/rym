import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { corsOptionsDelegate } from './cors'
import passport from 'passport';
import createError from 'http-errors';

import User from '../models/usersModel';
import { registerValidation } from '../validation/userValidation';

const usersRouter = express.Router();
usersRouter.use(bodyParser.json()); 

usersRouter.route('/signup')
.options(cors(corsOptionsDelegate), (req: Request, res: Response) => { res.sendStatus(200) })
.post(cors(), async (req: Request, res: Response, next: NextFunction) => {
	try {
		const value = await registerValidation.validateAsync(req.body);
		if (value.error != undefined){
			() => {
				console.log(value.error)
				res.statusCode = 422;
				res.setHeader('Content-Type', 'application/json')
				res.json(value.error)
			}
		}
		//@ts-ignore
		User.register( new User({username: req.body.username, 
			firstName: req.body.firstName, 
			lastName: req.body.lastName, email: req.body.username}), 
			req.body.password, (err:any, user: any) => {
			if (err){
				res.statusCode = 500;
				res.setHeader('Content-Type', 'application/json')
				res.json({err: `There was an error ${err}`})
			}
			else {
				if(req.body.firstName){
					user.firstName = req.body.firstName
				}
				if(req.body.lastName){
					user.lastName = req.body.lastName
				}
				if(req.body.email){
					user.email= req.body.email
				}
					passport.authenticate('local')(req, res, () => {
					res.statusCode = 200;
					res.setHeader('Content-Type', 'application/json')
					res.json({ success: true, status: 'Registro exitoso'}) 
				});
			}
	  	});
	} catch(e) {
		res.json(createError(500, `Error: ${e}`))
		next(e)
	}
});

usersRouter.route('/login')
.options( cors(corsOptionsDelegate), (req: Request, res: Response) => {res.sendStatus(200) })
.post( cors(), passport.authenticate('local'), (req: Request, res: Response, next: NextFunction) => {
	try {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json')
		//@ts-ignore
		res.json({success: true, status: "You are authenticated", session_id: req.sessionID})
	} catch(e){
		res.json(createError(500, `Error: ${e}`))
		next(e)
	}
});

export default usersRouter;