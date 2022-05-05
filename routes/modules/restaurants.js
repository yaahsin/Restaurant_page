// routes/modules
const express = require('express')
const router = express.Router()
const RestaurantList = require('../../models/Restaurant')

// route setting 新增餐廳頁面
// 無法使用restaurants + new /restaurants/new
// restaurant需改成其他字詞才可以
router.get("/new", (req, res) => {
  res.render("new")
})

// 直接在表單當中將需求之格式定好後, 存入資料庫
router.post("/", (req, res) => {
  const restaurant = req.body
  Restaurant.create(restaurant)
    .then(() => res.redirect("/"))
    .catch(err => console.log(err))
})



router.get('/:restaurantId', (req, res) => {
  // 把obj丟進變數的old school寫法
  // const restaurantId = req.params.restaurantId
  // ES6的寫法 Destructuring assignment
  const { restaurantId } = req.params

  RestaurantList.findById(restaurantId)
    .lean()
    .then(restaurantData => res.render('show', { restaurantData }))
    .catch(err => console.log(err))
})

// route setting 編輯餐廳頁面
router.get('/:restaurantId/edit', (req, res) => {
  const { restaurantId } = req.params

  RestaurantList.findById(restaurantId)
    .lean()
    .then((restaurantData) => res.render('edit', { restaurantData }))
    .catch(error => console.log(error))
})

router.put('/:restaurantId', (req, res) => {
  const { restaurantId } = req.params
  RestaurantList.findByIdAndUpdate(restaurantId, req.body)
    .then(() => res.redirect(`/restaurants/${restaurantId}`))
    .catch(err => console.log(err))
})

// route setting 刪除功能
router.delete('/:restaurantId', (req, res) => {
  const { restaurantId } = req.params

  RestaurantList.findById(restaurantId)
    .then(restaurantData => restaurantData.remove())
    .then((restaurantData) => res.redirect('/'))
    .catch(error => console.log(error))
})


module.exports = router