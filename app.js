// app.js
// require packages used in the project
const express = require('express')
const app = express()
const port = 3000

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
  // console.log(restaurantList)
})

// 用目錄方式選，加上「./」 和 副檔名
// 不然node.js會當成模組
const restaurantList = require('./models/Restaurant')

// require handlebars in the project
const exphbs = require('express-handlebars')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 設定 Express 路由以提供靜態檔案
app.use(express.static('public'))

// 引用 body-parser
const bodyParser = require('body-parser')
const Restaurant = require('./models/Restaurant')
// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))

// routes setting
// past the movie data into 'index' partial template
app.get('/', (req, res) => {
  restaurantList.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

// 點進去的單一項目
app.get("/restaurants/:restaurantId", (req, res) => {
  // 把obj丟進變數的old school寫法
  // const restaurantId = req.params.restaurantId
  // ES6的寫法 Destructuring assignment
  const { restaurantId } = req.params

  Restaurant.findById(restaurantId)
    .lean()
    .then(restaurantData => res.render("show", { restaurantData }))
    .catch(err => console.log(err))
})

// routes setting 搜尋頁面
// app.get('/search', (req, res) => {
//   const keyword = req.query.keyword
//   const restaurants = restaurantList.filter(restaurant => {
//     return restaurant.name.toLowerCase().includes(keyword.trim().toLowerCase()) || restaurant.category.includes(keyword.trim())
//   })
//   res.render('index', { restaurants: restaurants, keyword: keyword })
// })

// route setting 新增餐廳頁面
// 無法使用兩層目錄 /restaurants/new
app.get("/restaurantsNew", (req, res) => {
  res.render("new")
})

// 直接在表單當中將需求之格式定好後, 存入資料庫
app.post("/restaurants", (req, res) => {
  Restaurant.create(req.body)
    .then(() => res.redirect("/"))
    .catch(err => console.log(err))
})

// route setting 編輯餐廳頁面
app.get('/restaurants/:restaurantId/edit', (req, res) => {
  const { restaurantId } = req.params

  Restaurant.findById(restaurantId)
    .lean()
    .then((restaurantData) => res.render('edit', { restaurantData }))
    .catch(error => console.log(error))
})

app.post('/restaurants/:restaurantId/edit', (req, res) => {
  const { restaurantId } = req.params
  Restaurant.findByIdAndUpdate(restaurantId, req.body)
    .then(() => res.redirect(`/restaurants/${restaurantId}`))
    .catch(err => console.log(err))
})


// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})