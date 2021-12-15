import bcrypt from 'bcrypt';
import profileModule from '../modules/profile.module';

/**
 * profile 資料表
 */

/*  profile GET 取得  */
const profileGet = (req, res) => {
  profileModule.selectProfile().then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};

/* profile  POST 新增 */
const profilePost = (req, res) => {
  // 取得新增參數
  const insertValues = {
    id: req.body.id,
    username: req.body.username,
    fullname: req.body.fullname,
    user_email: req.body.user_email,
    user_password: bcrypt.hashSync(req.body.user_password, 10) // 密碼加密
  };
  profileModule.createProfile(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};

const userLogin = (req, res, next) => {
  // 取得帳密
  const insertValues = req.body;
  profileModule.selectUserLogin(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { next(err); }); // 失敗回傳錯誤訊息
};

const test = (req, res) => {
  res.send('測試');
};


export default {
  test,
  profileGet,
  profilePost,
  userLogin
};
