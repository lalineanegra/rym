import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import passportLocalMongoose from 'passport-local-mongoose';
//let passportLocalMongoose = require('passport-local-mongoose');


let User = new Schema ({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    }
})

User.plugin(passportLocalMongoose)

export default mongoose.model('User', User);