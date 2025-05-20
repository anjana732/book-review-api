import express from 'express';
import { createBook, getBooks, getBookById } from '../controllers/book.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/', verifyToken, createBook);
router.get('/', getBooks);
router.get('/:id',getBookById);

export default router;