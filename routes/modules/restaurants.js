// routes/modules
const express = require('express')
const Restaurant = require('../../models/Restaurant')
const router = express.Router()
const RestaurantList = require('../../models/Restaurant')


// route setting 新增餐廳頁面
router.get("/new", (req, res) => {
  res.render("new")
})

// 直接在表單當中將需求之格式定好後, 存入資料庫
router.post("/", (req, res) => {
  const userId = req.user._id
  const { name, name_en, category, image, location, phone, google_map, rating, description, } = req.body
  RestaurantList.create({
    name, name_en, category, image, location, phone, google_map,
    rating: Number(rating),
    description, userId
  })
    .then(() => res.redirect("/"))
    .catch(err => console.log(err))
})

router.get('/:restaurantId', (req, res) => {
  const userId = req.user._id
  // 把obj丟進變數的old school寫法
  // const restaurantId = req.params.restaurantId
  // ES6的寫法 Destructuring assignment
  const restaurantId = req.params.id

  RestaurantList.findOne({ restaurantId, userId })
    .lean()
    .then(restaurantData => res.render('show', { restaurantData }))
    .catch(err => console.log(err))
})

// route setting 編輯餐廳頁面
router.get('/:restaurantId/edit', (req, res) => {
  const userId = req.user._id
  const restaurantId = req.params.id

  RestaurantList.findOne({ restaurantId, userId })
    .lean()
    .then((restaurantData) => res.render('edit', { restaurantData }))
    .catch(error => console.log(error))
})

// 這邊要檢查findOne and update有沒有成功
router.put('/:restaurantId', (req, res) => {
  const userId = req.user._id
  const restaurantId = req.params.id
  RestaurantList.findOneAndUpdate({ restaurantId, userId }, req.body)
    .then(() => res.redirect(`/restaurants/${restaurantId}`))
    .catch(err => console.log(err))
})

// route setting 刪除功能
router.delete('/:restaurantId', (req, res) => {
  const userId = req.user._id
  const restaurantId = req.params.id

  RestaurantList.findOne({ restaurantId, userId })
    .then(restaurantData => restaurantData.remove())
    .then((restaurantData) => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router