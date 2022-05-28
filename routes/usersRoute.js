var express = require('express');
var router = express.Router();
const usersController = require('../controllers/users.controller');
const { isAuth } = require('../services/auth.service');
const handleErrorAsync = require('../services/handleErrorAsync');

// 取得個人資料
router.get('/profile',isAuth, handleErrorAsync(usersController.getQuery));
//router.get('/', handleErrorAsync(usersController.get));

// 取得 -單筆
//router.get('/:id', handleErrorAsync(usersController.getQuery));

// 新增
//router.post('/', handleErrorAsync(usersController.create));

// 刪除 -全部
//router.delete('/', handleErrorAsync(usersController.delete));

// 刪除 -單筆
//router.delete('/:id', handleErrorAsync(usersController.deleteQuery));

// 編輯 -單筆
//router.patch('/:id', handleErrorAsync(usersController.editQuery));

// 編輯 -單筆(重設密碼)
//router.patch('/:id/resetPassword', handleErrorAsync(usersController.resetPassword));
//更新個人資料
router.patch('/profile',isAuth, handleErrorAsync(usersController.updateProfile));
//註冊
router.post('/sign_up', handleErrorAsync(usersController.sign_up));
//登入
router.post('/sign_in', handleErrorAsync(usersController.singin));
//重設密碼
router.post('/updatePassword',isAuth, handleErrorAsync(usersController.resetPassword));




module.exports = router;
