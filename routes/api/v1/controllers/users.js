import express from 'express';

const usersRouter = express.Router();

// GET /api/v3/users/myIdentity - Returns information about the logged-in user
usersRouter.get('/myIdentity', (req, res) => {
    if (req.session.isAuthenticated) {
        // User is logged in, return user information

        console.log(req.session.account.name);
        console.log(req.session.account.username);


        res.json({
            status: "loggedin",
            userInfo: {
                name: req.session.account.name,
                username: req.session.account.username
            }
        });
    } else {
        // User is not logged in, return loggedout status
        res.json({ status: "loggedout" });
    }
});

export default usersRouter;