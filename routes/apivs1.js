import express from 'express';
var router = express.Router();

import postItinerary from './controllers/itinerary.js';



router.use('/posts', postItinerary);

export default router;