import express, { Request, Response, NextFunction} from 'express';
import createError from 'http-errors';
import cors from 'cors';
import { corsOptionsDelegate } from './cors'
import fetch from 'node-fetch';

let charactersRouter = express.Router();
const rymUrl = process.env.RYM_URL; 

charactersRouter.route('/')
.options( cors(corsOptionsDelegate), (req: Request, res: Response) => {res.sendStatus(200); })
.get( cors(), async (req: Request, res: Response, next: NextFunction) => {
  //res.json({ title: 'Express' });
  try {
    let characters = await fetch(`${rymUrl}character/`)
    let char = await characters.json()
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json')
    res.json(char)
    
  } catch(e) {
    res.json(createError(500, `Error: ${e}`))
    next(e)
  }
});

charactersRouter.route('/:characterId')
.options( cors(corsOptionsDelegate), (req: Request, res: Response) => {res.sendStatus(200); })
.get( cors(), async (req: Request, res: Response, next: NextFunction) => {

  const queryCharacter = parseInt(req.params.characterId);
  if (queryCharacter !== undefined && queryCharacter !== null){
    try {
      let character = await fetch(`${rymUrl}character/${queryCharacter}`)
      let char = await character.json()
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json')
      res.json(char)

    } catch(e) {
      res.json(createError(500, `Error: ${e}`))
      next(e)
    }
  } else {
    res.json(createError(500, `Error: parameter must be an integer!`));
    next();
  }
})

export default charactersRouter;