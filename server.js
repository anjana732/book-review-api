import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.route.js';
import bookRoutes from './routes/book.route.js';
import reviewRoutes from './routes/review.route.js'

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

connectDB()
.then(()=>{
    app.use('/api/auth', authRoutes);
    app.use('/api/books', bookRoutes);
    app.use('/api/review', reviewRoutes);
    app.listen(PORT, ()=>{
        console.log(`Server is running on ${PORT}`);
    })

    
})
.catch(()=>{
    console.log("DB connection failed");
})


