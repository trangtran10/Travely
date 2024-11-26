import express from 'express';
const  router = express.Router();

import postItinerary from './controllers/itinerary.js';

router.use('/itineraries', postItinerary);

export default router;