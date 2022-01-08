// 圖書管理系統 -入口文件

const express = require('express');
const template = require('art-template');
const bodyParser = require('body-parser');
const router = require('./router.js')
const path = require('path')
const app = express();
// 啟動靜態資源服務
app.use('/www',express.static('public'))

// 設置模板引擎
// 設置模板引擎路徑
app.set('views',path.join(__dirname,'views'));
// 設定後綴
app.set('view engine','art');
// 設定兼容的包
app.engine('art',require('express-art-template'));

// 處理請求參數
app.use(bodyParser.urlencoded({extended : false}));
// 處理json格式的參數
app.use(bodyParser.json());


// 啟動服務器功能
app.use(router)

app.listen(3000,()=>{
    console.log('running....');
})


