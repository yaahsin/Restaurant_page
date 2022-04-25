// app.js
// require packages used in the project
const express = require('express')
const app = express()
const port = 3000

// require handlebars in the project
const exphbs = require('express-handlebars')

// 用目錄方式選，加上「./」 和 副檔名
// 不然node.js會當成模組
const restaurantList = require('./restaurant.json')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 設定 Express 路由以提供靜態檔案
app.use(express.static('public'))

// setting static files

// routes setting
// past the movie data into 'index' partial template
app.get('/', (req, res) => {
  // res.send('this is a test')
  res.render('index', { restaurants: restaurantList.results })
})

// 點進去的單一項目
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant: restaurant })
})

// routes setting 搜尋頁面
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.trim().toLowerCase()) || restaurant.category.includes(keyword.trim())
  })
  res.render('index', { restaurants: restaurants, keyword: keyword })
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})