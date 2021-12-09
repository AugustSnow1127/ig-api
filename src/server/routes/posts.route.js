import express from 'express';
import postsCtrl from '../controllers/posts.controller';

const router = express.Router();

router.route('/')
  .get(postsCtrl.postsGet) /** 取得 posts 所有值組 */
  .post(postsCtrl.postsPost); /** 新增 posts 值組 */


export default router;
