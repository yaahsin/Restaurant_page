// app.js
// require packages used handlebars body-parser in the project
const express = require('express')
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

// 引用路由器
const routes = require('./routes')
require('./config/mongoose')

const app = express()

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 設定 Express 路由以提供靜態檔案
app.use(express.static('public'))

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))

// 打算使用put及delete，取代本來http的語法
// 注意要放在route前面，不然就不能override了
app.use(methodOverride('_method'))

// 將 request 導入路由器
app.use(routes)

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
