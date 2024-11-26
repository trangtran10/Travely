import express from 'express';


const postsRouter = express.Router();

import getURLPreview from '../utils/urlPreviews.js';

postsRouter.post('/', async (req, res) => {
    try {
        const { username, url, description } = req.body;

        const newPost = new req.models.Post({
            username,
            url,
            description,
            created_date: new Date().toISOString()
        });

        await newPost.save();
        res.json({ status: 'success' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', error: error.message });
    }
});


postsRouter.get('/', async (req, res) => {
    try {
        const posts = await req.models.Post.find();

        const postData = await Promise.all(
            posts.map(async (post) => {
                try {
                    const htmlPreview = await getURLPreview(post.url);
                    console.log(post.username);
                    return {
                        username: post.username,
                        description: post.description,
                        htmlPreview
                    };
                } catch (error) {
                    console.error(`Error generating preview for ${post.url}:`, error);
                    return {
                        username: post.username,
                        description: post.description,
                        htmlPreview: `Error: ${error.message}`
                    };
                }
            })
        );

        res.json(postData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', error: error.message });
    }
});


export default postsRouter;