import express from 'express';
import { createBook, getBooks, getBookById } from '../controllers/book.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/', verifyToken, createBook);
router.get('/', getBooks);
router.get('/:id',getBookById);

export default router;