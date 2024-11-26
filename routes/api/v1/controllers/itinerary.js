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
      res.status(201).json({
        success: true, 
        message: 'Itinerary created!',
        data: newItinerary,
      });
  } catch (error){
    console..error('Error creating itinerary:', error);
    res.status(500).json({
      success: fale, 
      message: 'Failed to create itinerary',

    });
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
                    };

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
