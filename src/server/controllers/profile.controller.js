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
  const insertValues = req.body;
  profileModule.createProfile(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};

const test = (req, res) => {
  res.send('測試');
};


export default {
  test,
  profileGet,
  profilePost
};
