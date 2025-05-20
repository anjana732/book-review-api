import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    comment :{
        type: String
    }
},{timestamps: true});

reviewSchema.index({book: 1, user: 1}, {unique: true});

export const Review = mongoose.model('Review', reviewSchema);

