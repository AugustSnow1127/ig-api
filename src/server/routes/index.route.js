import express from 'express';
// Router
import profile from './profile.route';
import posts from './posts.route';

// import config from './../../config/config';

const router = express.Router();


/* GET localhost:[port]/api page. */
// router.get('/', (req, res) => {
//   res.send(`此路徑是: localhost:${config.port}/api`);
// });

/** profile Router */
router.use('/profile', profile);
router.use('/posts', posts);

export default router;
