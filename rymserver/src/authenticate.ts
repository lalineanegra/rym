import passport from 'passport';
//let LocalStrategy = require('passport-local').Strategy;
//import { Strategy as LocalStrategy } from 'passport-local';

import User from './models/usersModel';

// CHANGE: USE "createStrategy" INSTEAD OF "authenticate"
export default passport.use(User.createStrategy());
 
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



//Another
// import express, { Request, Response, NextFunction } from 'express';
// import createError from 'http-errors';
// import jwt from 'jsonwebtoken';
// function authenticateToken(req: Request, res: Response, next: NextFunction){
//     const authHeader = req.headers['authorization']
//     const token =authHeader && authHeader.split(' ')[1]
//     if (token == null) return createError(401, 'unauthorized')

//     jwt.verify(token, process.env.SECRET_TOKEN!, (err, user) => {
//         if (err) return createError(403, 'unauthorized')
//         req.user = user;
//         next();
//     })
// }

//Another
// import {Strategy as LocalStrategy} from 'passport-local';
// import bcrypt from 'bcrypt';

//function initialize(passport: any, getUserByUsername: any){
    //     const authenticateUser = async (username: string, password: string, done) => {
    //         const user = getUserByUsername(username);
    //         if (user == null){
    //             return done(null, false, {message: "no user with that email"} )
    //         }
    
    //         try {
    //             if (await bcrypt.compare(password, user.password)){
    //                 return done(null, user);
    //             } else {
    //                 return done(null, false, {message: "Incorrect password"});
    //             }
    //         } catch (error) {
    //             return done(error);
    //         }
    //     }
    //     passport.use(new LocalStrategy({usernameField: 'username'}), 
    //     authenticateUser)
    //     passport.serializeUser((user, done) => {
    
    //     })
    //     passport.serializeUser((id, done) => {
            
    //     })
    // }
    
    // export default initialize;

//export default authenticateToken;