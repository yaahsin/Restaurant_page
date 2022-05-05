// models/seeds

const RestaurantList = require('../Restaurant')
const db = require('../../config/mongoose')

// 取得上上一層目錄的json檔資料
const restaurantList = require('../../restaurant.json').results

db.once('open', () => {
  console.log('running restaurantSeeder script...')

  // 將檔案restaurantList.json以Restaurant的schema設定create進db裡面
  // 所以必須先在models裡面, 建立一個Restaurant.js設定schema
  // 檔案非按照順序排進去, 因為是非同步運行, 先到者先進資料庫
  RestaurantList.create(restaurantList)
    .then(() => {
      console.log('restaurantSeeder done!')
      db.close() // 不設定關掉的話, 不知道會怎樣子
    })
    .catch(err => console.log(err))
})
