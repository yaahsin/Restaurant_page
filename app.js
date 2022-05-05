// app.js
// require packages used in the project
// require handlebars in the project
// 引用 body-parser
const express = require('express')
const mongoose = require('mongoose')
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

// 用目錄方式選，加上「./」 和 副檔名
// 不然node.js會當成模組
const RestaurantList = require('./models/Restaurant')

// 引用路由器
const routes = require('./routes')

const app = express()

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection


db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
  // console.log(restaurantList)
})

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')


// 設定 Express 路由以提供靜態檔案
app.use(express.static('public'))

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))

// 將 request 導入路由器
app.use(routes)

// 打算使用put及delete，取代本來http的語法
app.use(methodOverride('_method'))


// routes setting 搜尋頁面
app.get('/search', (req, res) => {
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

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
