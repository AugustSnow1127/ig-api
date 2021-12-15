import express from 'express';
import profileCtrl from '../controllers/profile.controller';

const router = express.Router();

router.route('/')
  .get(profileCtrl.profileGet); /** 取得 profile 所有值組 */

router.route('/signUp')
  .post(profileCtrl.profilePost); /** 新增 User 值組 */

router.route('/login')
  .post(profileCtrl.userLogin);

export default router;
