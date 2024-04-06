import express from 'express';

import { getMessages, sendMessage } from '../controllers/message.controller.js';
import { JWTvalidator } from '../middleware/jwt-validator.js';

const router = express.Router();

router.get('/:username', JWTvalidator, getMessages);
router.post('/send/:username', JWTvalidator, sendMessage);

export default router;
