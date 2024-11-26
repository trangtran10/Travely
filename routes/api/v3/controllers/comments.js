import express from 'express';

const commentRouter = express.Router();

// GET "/api/v3/comments" - Get comments for the given post
commentRouter.get("/", async (req, res) => {
    try {
        let postID = req.query.postID;

        // Find all comments for the given postID
        let comments = await req.models.Comment.find({ post: postID });

        // Return comments as JSON
        res.json(comments);
    } catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).json({ status: "error", error: error.message });
    }
});

// POST "/api/v3/comments" - Save a comment on the given post
commentRouter.post("/", async (req, res) => {
    try {
        if (!req.session.isAuthenticated) {
            return res.status(401).json({
                status: "error",
                error: "not logged in"
            });
        }

        const { newComment, postID } = req.body;
        const username = req.session.account.username;

        // Create and save a new comment
        let comment = new req.models.Comment({
            username: username,
            comment: newComment,
            post: postID,
            created_date: new Date()
        });

        await comment.save();

        res.json({ status: "success" });
    } catch (error) {
        console.error("Error saving comment:", error);
        res.status(500).json({ status: "error", error: error.message });
    }
});



export default commentRouter;