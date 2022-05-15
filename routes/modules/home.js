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

router.get('/order_asc', (req, res) => {
  RestaurantList.find()
    .lean()
    .sort({ name: 'asc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

router.get('/order_desc', (req, res) => {
  RestaurantList.find()
    .lean()
    .sort({ name: 'desc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

router.get('/order_category', (req, res) => {
  RestaurantList.find()
    .lean()
    .sort({ category: 'asc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

router.get('/order_location', (req, res) => {
  RestaurantList.find()
    .lean()
    .sort({ location: 'asc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

// routes setting 搜尋頁面
router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  // 撈出所有資料
  RestaurantList.find()
    .lean()
    .then(restaurants => {
      // 將資料篩選, 分別比對名字和分類, 將結果存成變數
      const FilterRestaurants = restaurants.filter(
        restaurant =>
          restaurant.name.toLowerCase().includes(keyword.trim().toLowerCase()) || restaurant.category.includes(keyword.trim())
      )
      res.render('index', { restaurants: FilterRestaurants })
    })

    .catch(err => console.log(err))
})

// 匯出路由模組
module.exports = router