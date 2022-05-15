// app.js
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

const Restaurant = require('./models/Restaurant')

const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
// 連線狀態
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 設定 Express 路由以提供靜態檔案 & 請求需透過 body-parser 進行前置處理
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

// routes setting 首頁
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

// route setting 新增餐廳頁面
// 此段需擺在detail route前面，否則會變成new(string)丟進:restaurantId
// 不合理現象導致file crash but reason why?
app.get("/restaurants/new", (req, res) => {
  return res.render('new')
})

// 直接在表單當中將需求之格式定好後, 存入資料庫
app.post("/restaurants", (req, res) => {
  Restaurant.create(req.body)
    .then(() => res.redirect("/"))
    .catch(err => console.log(err))
})

// routes setting 點進去的單一項目
app.get('/restaurants/:restaurantId', (req, res) => {
  // ES6的寫法 Destructuring assignment
  const { restaurantId } = req.params

  Restaurant.findById(restaurantId)
    .lean()
    .then((restaurantData) => res.render("show", { restaurantData }))
    .catch(error => console.log(error))
})

// routes setting 搜尋頁面
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  Restaurant.find()
    .lean()
    .then(restaurants => {
      // 將資料篩選, 分別比對名字和分類, 將結果存成變數
      const FilterRestaurants = restaurants.filter(
        restaurant =>
          restaurant.name.toLowerCase().includes(keyword.trim().toLowerCase()) || restaurant.category.includes(keyword.trim())
      )
      //渲染結果回樣版
      res.render('index', { restaurants: FilterRestaurants })
    })
    .catch(err => console.log(err))
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})