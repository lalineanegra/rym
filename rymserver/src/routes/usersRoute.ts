import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import passport from 'passport';
import createError from 'http-errors';

import { corsOptionsDelegate } from './cors'
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
				return res.json(createError(422, value.error));
			}
		}
		//@ts-ignore
		User.register( new User({username: req.body.username, 
			firstname: req.body.firstname, 
			lastname: req.body.lastname, email: req.body.email}), 
			req.body.password, (err:any, user: any) => {
			if (err){
				res.statusCode = 400 ;
				res.setHeader('Content-Type', 'application/json')
				res.json({err: `There was an error ${err}`})
			}
			else {
				if(req.body.firstname){
					user.firstname = req.body.firstname
				}
				if(req.body.lastname){
					user.lastname = req.body.lastname
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
		res.status(500).send(e);
	}
});

usersRouter.route('/login')
.options(cors(corsOptionsDelegate), (req: Request, res: Response) => {res.sendStatus(200) })
.post(cors(), passport.authenticate('local'), (req: Request, res: Response, next: NextFunction) => {
	try {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json')
		//@ts-ignore
		res.json({success: true, status: "You are authenticated", session_id: req.sessionID})
	} catch(e){
		res.json(createError(500, `Error: ${e}`))
	}
});

usersRouter.route('/logout')
.options(cors(corsOptionsDelegate), (req: Request, res: Response) => {res.sendStatus(200); })
.get(cors(), (req: Request, res: Response, next: NextFunction) => {
	if (req.session) {
		req.session.destroy(function(err) {
			console.log('session destroyed')
		})
		res.clearCookie('session-id')
		res.redirect('/login');
	}
	else {
		let err = createError(404, 'Inicia sesión!');
		next(err);
	}
})

export default usersRouter;