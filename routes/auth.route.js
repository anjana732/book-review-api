import express from 'express';

import { signup, login, refreshAccessToken } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/refresh-token', refreshAccessToken);

export default router;