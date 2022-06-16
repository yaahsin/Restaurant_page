// models/seeds
const bcrypt = require('bcryptjs')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Restaurant = require('../Restaurant')
const User = require('../user')
const db = require('../../config/mongoose')

// 取得上上一層目錄的json檔資料
const restaurantList = require('../../restaurant.json').results

const SEED_USER = [{
  name: 'user1',
  email: 'user1@example.com',
  password: '12345678',
  InitialList: [1, 2, 3]
},
{
  name: 'user2',
  email: 'user2@example.com',
  password: '12345678',
  InitialList: [4, 5, 6]
}]

db.once('open', () => {
  console.log('running')
  // 待全部做完 (回傳一個新陣列)
  Promise.all(SEED_USER.map(SEED_USER =>
    // 前處理密碼
    bcrypt.genSalt(10)
      .then(salt => bcrypt.hash(SEED_USER.password, salt))
      .then(hash => User.create({ name: SEED_USER.name, email: SEED_USER.email, password: hash }))
      .then(user => {
        const userId = user._id
        // 抓出目標餐廳清單
        const restaurants = restaurantList.filter(restaurant => SEED_USER.InitialList.includes(restaurant.id))
        // 寫入userId標記
        restaurants.forEach(restaurant => restaurant.userId = userId)
        // 將其建立進個人餐廳清單
        return Restaurant.create(restaurants)
      })
  ))
    .then(() => {
      console.log('done')
      process.exit()
    })
    .catch(err => console.log(err))
})