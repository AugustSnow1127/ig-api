import postsModule from '../modules/posts.module';

/**
 * posts 資料表
 */

/*  posts GET 取得  */
const postsGet = (req, res) => {
  postsModule.selectPosts().then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};

/* posts  POST 新增 */
const postsPost = (req, res) => {
  // 取得新增參數
  const insertValues = req.body;
  postsModule.createPosts(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};

const test = (req, res) => {
  res.send('測試');
};


export default {
  test,
  postsGet,
  postsPost
};
