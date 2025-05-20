import { Review } from '../models/review.model.js';

export const createReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const bookId = req.params.id;
        const userId = req.user.userId;

        const review = await Review.create({ book: bookId, user: userId, rating, comment });

        res.status(201).json(review);
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ message: 'You already reviewed this book' });
        }
        res.status(500).json({ message: 'Failed to create review', error: err.message });
    }
};

export const updateReview = async (req, res) => {
    try {
        const reviewId = req.params.id;
        const userId = req.user.userId;

        const review = await Review.findById(reviewId);
        if (!review) return res.status(404).json({ message: 'Review not found' });

        if (review.user.toString() !== userId)
            return res.status(403).json({ message: 'Not allowed to update this review' });

        const { rating, comment } = req.body;
        if (rating) review.rating = rating;
        if (comment) review.comment = comment;
        await review.save();

        res.status(200).json(review);
    } catch (err) {
        res.status(500).json({ message: 'Failed to update review', error: err.message });
    }
};

export const deleteReview = async (req, res) => {
    try {
        const reviewId = req.params.id;
        const userId = req.user.userId;

        const review = await Review.findById(reviewId);
        if (!review) return res.status(404).json({ message: 'Review not found' });

        if (review.user.toString() !== userId)
            return res.status(403).json({ message: 'Not allowed to delete this review' });

        await Review.findByIdAndDelete(reviewId);
        res.status(200).json({ message: 'Review deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete review', error: err.message });
    }
};
