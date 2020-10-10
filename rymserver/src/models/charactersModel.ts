import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let Character = new Schema ({
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

export default Character;