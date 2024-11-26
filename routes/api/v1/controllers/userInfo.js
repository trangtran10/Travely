import express from 'express';

const userInfoRouter = express.Router();

// POST: Save or update user info
userInfoRouter.post('/', async (req, res) => {
    try {
        if (!req.session.isAuthenticated) {
            return res.status(401).json({ status: 'error', error: 'Not logged in' });
        }

        const { favoriteIceCream } = req.body;
        const username = req.session.account.username;

        if (!favoriteIceCream) {
            return res.status(400).json({ status: 'error', error: 'Missing favoriteIceCream field' });
        }

        let userInfo = await req.models.newUserInfo.findOne({ username });
        if (!userInfo) {
            userInfo = new req.models.newUserInfo({ username });
        }

        userInfo.FavorateIceCream = favoriteIceCream;
        await userInfo.save();

        res.status(200).json({ status: 'success', message: 'User info saved successfully' });
    } catch (error) {
        console.error('Error saving user info:', error);
        res.status(500).json({ status: 'error', error: error.message });
    }
});

// GET: Retrieve user info
userInfoRouter.get('/', async (req, res) => {
    try {
        const { username } = req.query;

        if (!username) {
            return res.status(400).json({ status: 'error', error: 'Missing username parameter' });
        }

        const userInfo = await req.models.newUserInfo.findOne({ username });

        if (!userInfo) {
            return res.status(404).json({ status: 'error', error: 'User info not found' });
        }

        res.status(200).json({ status: 'success', userInfo });
    } catch (error) {
        console.error('Error retrieving user info:', error);
        res.status(500).json({ status: 'error', error: error.message });
    }
});

export default userInfoRouter;
