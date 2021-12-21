import mysql from 'mysql';
import bcrypt from 'bcrypt';
import config from '../../config/config';
import APPError from '../helper/AppError';

const connectionPool = mysql.createPool({
  connectionLimit: 10,
  host: config.mysqlHost,
  user: config.mysqlUserName,
  password: config.mysqlPass,
  database: config.mysqlDatabase
});

/*  Profile GET 取得  */
const selectProfile = () => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        connection.query( // Profile撈取所有欄位的值組
          `SELECT
            *
          FROM
            profile`
          , (error, result) => {
            if (error) {
              console.error('SQL error: ', error);
              reject(error); // 寫入資料庫有問題時回傳錯誤
            } else {
              resolve(result); // 撈取成功回傳 JSON 資料
            }
            connection.release();
          }
        );
      }
    });
  });
};

/* Profile  POST 新增 */
const createProfile = (insertValues) => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        connection.query('INSERT INTO profile SET ?', insertValues, (error, result) => { // Profile資料表寫入一筆資料
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else if (result.affectedRows === 1) {
            resolve(`新增成功！ Profile_id: ${result.insertId}`); // 寫入成功回傳寫入id
          }
          connection.release();
        });
      }
    });
  });
};

const selectUserLogin = (insertValues) => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        connection.query( // User撈取所有欄位的值組
          'SELECT * FROM profile WHERE user_email = ?',
          insertValues.user_email, (error, result) => {
            if (error) {
              console.error('SQL error: ', error);
              reject(error); // 寫入資料庫有問題時回傳錯誤
            } else if (Object.keys(result).length === 0) {
              reject(new APPError.LoginError1()); // 信箱尚未註冊
            } else {
              const dbHashPassword = result[0].user_password; // 資料庫加密後的密碼
              const userPassword = insertValues.user_password; // 使用者登入輸入的密碼
              bcrypt.compare(userPassword, dbHashPassword).then((res) => { // 使用bcrypt做解密驗證
                if (res) {
                  resolve(result[0]); // 登入成功
                } else {
                  reject(new APPError.LoginError2()); // 登入失敗 輸入的密碼有誤
                }
              });
            }
            connection.release();
          }
        );
      }
    });
  });
};

export default {
  selectProfile,
  createProfile,
  selectUserLogin
};

