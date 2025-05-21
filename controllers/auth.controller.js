import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';

//Sign up functionality implemented

export const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existing = await User.findOne({ email });
        if (existing) {
            console.log("User already exists");
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashed = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, email, password: hashed });

        console.log("New user created:", newUser);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error("Signup error:", err); 
        res.status(500).json({ error: 'Signup failed' });
    }
};

//Login functionality implemented
export const login = async (req, res) =>{
    try{
        const {email, password} = req.body;

        const user = await User.findOne({email});

        if(!user) return res.send(401).json({message: 'User doesn\'t exist'})
        const isMatch = await bcrypt.compare(password, user.password);  
        
        if(!isMatch) return res.status(401).json({message: 'Invalid Credential'});

        const accessToken = jwt.sign(
            {userId: user._id, email: user.email},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: process.env.ACCESS_TOKEN_EXPIRY}
        );

        const refreshToken = jwt.sign(
            {userId: user._id, email:user.email },
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: process.env.REFRESH_TOKEN_EXPIRY}
        );

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({accessToken});
    }catch(err){
        res.send(500).json({error: 'Login failed'});
    }
};

// code to regenerate access token using refresh token

export const refreshAccessToken = (req, res) => {
    try{
        const token = req.cookies.refreshToken;
        if(!token) return res.status(401).json({message: 'No refresh token provided'});

        const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

        const accessToken = jwt.sign(
            {userId: decoded.userId, email: decoded.email},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: process.env.ACCESS_TOKEN_EXPIRY}

        );

        res.status(200).json({accessToken});
    }catch(err){
        console.log("Refresh token error", err);
        return res.status(403).json({message: 'Invalid or expired refresh token'})
    }
}