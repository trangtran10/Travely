import express from 'express';
const postItinerary = express.Router();

postItinerary.post('/', async (req, res) => {
  try{
      const{destination, airline, summary, photo} = req.body;

      const newItinerary = new models.Itinerary ({
        destination, 
        airline, 
        summary, 
        photo,
      });

      await newIttinerary.save();
  } catch
});
