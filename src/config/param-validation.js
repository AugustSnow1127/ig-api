// param-validation.js
import Joi from 'joi';

export default {
  // POST /api/user
  createUser: {
    body: {
      user_name: Joi.string().required(), // 字串＋必填
      user_fullname: Joi.string().required(), // 字串＋必填
      user_mail: Joi.string().email().trim().required(), // 限定email格式並移除多餘空白
      user_password: Joi.string().regex(/[a-zA-Z0-9]{6,30}$/).required() // 最小長度6最大30，只允許英文大小寫和數字
    }
  }
};