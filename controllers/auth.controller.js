import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';

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

export const login = async (req, res) =>{
    try{
        const {email, password} = req.body;

        const user = await User.findOne({email});

        if(!user) return res.send(401).json({message: 'User doesn\'t exist'})
        const isMatch = await bcrypt.compare(password, user.password);  
        
        if(!isMatch) return res.status(401).json({message: 'Invalid Credential'});

        const token = jwt.sign(
            {userId: user._id, email: user.email},
            process.env.JWT_SECRET,
            {expiresIn: '15m'}
        );

        res.status(200).json({token});
    }catch(err){
        res.send(500).json({error: 'Login failed'});
    }
};