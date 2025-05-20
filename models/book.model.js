import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    description: {
        type:String
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{timestamp: true});

export const Book =  mongoose.model('Book', bookSchema);