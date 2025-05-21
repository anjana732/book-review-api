import express from 'express';
import { createReview, updateReview, deleteReview } from '../controllers/review.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/:id/reviews', verifyToken, createReview);
router.put('/:id',verifyToken, updateReview);
router.delete('/:id', verifyToken, deleteReview);

export default router;

