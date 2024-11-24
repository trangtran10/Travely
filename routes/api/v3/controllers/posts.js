import express from 'express';

const postsRouter = express.Router();

import getURLPreview from '../utils/urlPreviews.js';

postsRouter.post('/', async (req, res) => {
    try {
        // Check if the user is authenticated
        if (!req.session.isAuthenticated) {
            return res.status(401).json({
                status: "error",
                error: "not logged in"
            });
        }

        const { url, description } = req.body;
        const username = req.session.account.username; // Get the username from session

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
        const { username } = req.query;

        // Query for posts, optionally filtering by username
        const query = username ? { username } : {};
        const posts = await req.models.Post.find(query);

        const postData = await Promise.all(
            posts.map(async (post) => {
                try {
                    const htmlPreview = await getURLPreview(post.url);
                    return {
                        username: post.username,
                        description: post.description,
                        likes: post.likes,
                        id: post._id,
                        htmlPreview
                    };

                    // username: String,
                    // url: String,
                    // description: String,
                    // like: [String],
                    // created_date: Date
                } catch (error) {
                    console.error(`Error generating preview for ${post.url}:`, error);
                    return {
                        username: post.username,
                        description: post.description,
                        likes: `Error: ${error.message}`,
                        id: `Error: ${error.message}`,
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

postsRouter.post('/like', async (req, res) => {
    try {
        if (!req.session.isAuthenticated) {
            return res.status(401).json({
                status: "error",
                error: "not logged in"
            });
        }

        let postID = req.body.postID;
        let username = req.session.account.username;

        // console.log(req.body.postID);

        const post = await req.models.Post.findById(postID);
        if (!post) {
            return res.status(404).json({ status: 'error', error: 'Post not found' });
        }

        if (!post.likes.includes(username)) {
            post.likes.push(username);
            await post.save();
        }

        res.json({ status: 'success' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', error: error.message });
    }

    postsRouter.post('/unlike', async (req, res) => {
        try {
            if (!req.session.isAuthenticated) {
                return res.status(401).json({
                    status: "error",
                    error: "not logged in"
                });
            }
    
            const postID = req.body.postID;
            const username = req.session.account.username;
            console.log(postID);
    
            const post = await req.models.Post.findById(postID);
            if (!post) {
                return res.status(404).json({ status: 'error', error: 'Post not found' });
            }
    
            const index = post.likes.indexOf(username);
            if (index !== -1) {
                post.likes.splice(index, 1);
                await post.save();
            }
    
            res.json({ status: 'success' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: 'error', error: error.message });
        }
    });
    

    postsRouter.delete('/', async (req, res) => {
        try {
            if (!req.session.isAuthenticated) {
                return res.status(401).json({
                    status: "error",
                    error: "not logged in"
                });
            }
    
            const { postID } = req.body;
            const username = req.session.account.username;
    
            const post = await req.models.Post.findById(postID);
            if (!post) {
                return res.status(404).json({ status: 'error', error: 'Post not found' });
            }
    
            if (post.username !== username) {
                return res.status(401).json({
                    status: 'error',
                    error: "you can only delete your own posts"
                });
            }
    
            await req.models.Comment.deleteMany({ post: postID });
            await req.models.Post.deleteOne({ _id: postID });
    
            res.json({ status: 'success' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: 'error', error: error.message });
        }
    });
    

});

export default postsRouter;
