// 路由模塊

const express = require('express')
const router = express.Router();
const service = require('./service')
// 渲染主業
router.get('/',service.showIndex)
// 添加圖書
router.get('/toAddBook',service.toAddBook)
// 添加圖書(提交表單)
router.post('/addBook',service.addBook)
// 跳轉到編輯圖書信息頁面
router.get('/toEditBook',service.toEditBook)
// 編輯圖書提交表單
router.post('/editBook',service.editBook)
// 刪除圖書信息
router.get('/deleteBook',service.deleteBook);
module.exports = router;


