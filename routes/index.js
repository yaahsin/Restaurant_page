// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 引入 home 模組程式碼
const home = require('./modules/home')
// 引入 restaurants 模組程式碼
const restaurants = require('./modules/restaurants')

// 將網址結構符合字串開頭的request, 導向對應模組
router.use('/', home)
router.use('/restaurants', restaurants)


// 匯出路由器
module.exports = router