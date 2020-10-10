import passport from 'passport';
//let LocalStrategy = require('passport-local').Strategy;
import { Strategy as LocalStrategy } from 'passport-local';

import User from './models/usersModel';

module.exports.local = passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

