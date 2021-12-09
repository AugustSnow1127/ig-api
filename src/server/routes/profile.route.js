import express from 'express';
import profileCtrl from '../controllers/profile.controller';

const router = express.Router();

router.route('/')
  .get(profileCtrl.profileGet) /** 取得 profile 所有值組 */
  .post(profileCtrl.profilePost); /** 新增 profile 值組 */


export default router;
