import express from 'express';
import { JWTvalidator } from '../middleware/jwt-validator.js';
import {
    acceptRequest,
    getRequests,
    getUsersForSidebar,
    rejectRequest,
    sendContactRequest,
} from '../controllers/user.controller.js';

const router = express.Router();

router.use(JWTvalidator);

router.get('/', getUsersForSidebar);
router.get('/requests', getRequests);
router.post('/add/:username', sendContactRequest);
router.post('/accept/:username', acceptRequest);
router.post('/reject/:username', rejectRequest);

export default router;
