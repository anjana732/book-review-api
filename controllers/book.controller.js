import {Book} from '../models/book.model.js';
import { Review } from '../models/review.model.js';

export const createBook = async (req, res) => {
    try{
        const {title, author, genere, description} = req.body;
        const createdBy = req.user.userId;

        const book = await Book.create({title, author, genre, description});
        res.status(201).json(book);
    }catch(err){
        res.status(500).json({message: 'Failed to create book', error: err.message});
    }
};

export const getBooks = async(req, res) =>{
    try{
        const {author, genre, page = 1, limit = 10} = req.query;
        const filter = {};

        if(author) filter.author = new RegExp(author, i);
        if(genre) filter.genre = new RegExp(genre, i);

        const books = await Book.find(filter)
                        .skip((page -1) * limit)
                        .limit(Number(limit))
                        .sort({createdAt: -1});

        const total = await Book.countDocuments(filter);

        res.status(200).json({
            total,
            page: Number(page),
            limit: Number(limit),
            books
        });
    }catch(err){
        res.status(500).json({message: 'Failed to fetch books', error: err.message });
    }
};

export const getBookById = async (req, res) => {
    try {
        const { id } = req.params;
        const { page = 1, limit = 5 } = req.query;

        const book = await Book.findById(id).populate('createdBy', 'username email');
        if (!book) return res.status(404).json({ message: 'Book not found' });

        const reviews = await Review.find({ book: id })
            .populate('user', 'username email')
            .skip((page - 1) * limit)
            .limit(Number(limit));

        const avg = await Review.aggregate([
            { $match: { book: book._id } },
            { $group: { _id: '$book', avgRating: { $avg: '$rating' } } }
        ]);

        res.status(200).json({
            book,
            averageRating: avg[0]?.avgRating || 0,
            reviews
        });
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch book details', error: err.message });
    }
};