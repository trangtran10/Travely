import express from 'express';


const urlsRouter = express.Router();


import getURLPreview from '../utils/urlPreviews.js';


// const router = express.Router();


urlsRouter.get('/preview', async (req, res) => {
    let url = req.query.url; // Expecting URL as a query parameter

    try {
        const previewHTML = await getURLPreview(url);
        res.type("html");
        res.send(previewHTML);
    } catch (error) {
        console.error("Error fetching URL preview:", error);
        res.status(500).send("Failed to fetch URL preview.");
    }
});

export default urlsRouter;