// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

const RestaurantList = require('../../models/Restaurant')

// routes setting
// past the data into 'index' partial template
router.get('/', (req, res) => {
  RestaurantList.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

// 匯出路由模組
module.exports = router