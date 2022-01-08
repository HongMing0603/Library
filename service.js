// 業務模塊
// 連接index.art跟data.json

const data = require('./data.json')
const path = require('path');
const fs = require('fs');
const { stringify } = require('querystring');
// 自動生成圖書編號
// 讀取編號的最大值
let maxBookCode = ()=>{
    let arr = [];
    data.forEach((item)=>{
        arr.push(item.id)
   })
   return Math.max.apply(null,arr)
}
// 把內存數據寫入文件
let writeDataToFile = (res)=>{
    // 把內存中的數據寫入文建
    fs.writeFile(path.join(__dirname,'data.json'),JSON.stringify(data,null,4),(err)=>{
        if(err){
            res.send('server error');
        }
        // 文件寫入成功之後跳轉到主頁面
        res.redirect('/')
    });
}

exports.showIndex = (req,res) => {
    // index是模板art的名稱
    res.render('index',{list : data})
}
// 跳轉到添加圖書的葉面
exports.toAddBook = (req,res) => {
    res.render('addBook',{})
}
// 添加圖書並保存數據
exports.addBook = (req,res) =>{
    // 獲取表單數據
    let info = req.body;
    let book = {};
    for(let key in info){
        book[key] = info[key]
    }
    book.id = maxBookCode() + 1;
    data.push(book);
    // 把內存中的數據寫入文建
    writeDataToFile(res);
}

// 跳轉到編輯頁面
exports.toEditBook = (req,res) =>{
    let id = req.query.id;
    let book = null;
    data.forEach((item)=>{
        if(id == item.id){
            book  = item;
            return;
        }
    })
    res.render('editBook',book);
}
// 編輯圖書更新數據
exports.editBook = (req,res) =>{
    let info = req.body;
    data.forEach((item)=>{
        if(info.id == item.id){
            for(let key in info){
                item[key]=info[key]
            }
            return;
        }
    })
    // 把內存中的數據寫入文建
    writeDataToFile(res);
}

// 刪除圖書信息
exports.deleteBook = (req,res)=>{
    let id = req.query.id;
    data.forEach((item,index)=>{
        if(id ==item.id){
            // 刪除數組的一項數據
            data.splice(index,1)
        }
        return;

    })
    // 寫入data.json
    writeDataToFile(res);
}