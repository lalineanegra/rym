import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
const Schema = mongoose.Schema;
//import passportLocalMongoose from 'passport-local-mongoose';
//let passportLocalMongoose = require('passport-local-mongoose');
import { PassportLocalSchema } from 'mongoose';

const UserSchema = new Schema ({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    }
})

UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', UserSchema as PassportLocalSchema);

export default User;