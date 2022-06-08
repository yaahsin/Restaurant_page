// models/seeds
const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const RestaurantList = require('../Restaurant')
const User = require('../user')
const db = require('../../config/mongoose')

// 取得上上一層目錄的json檔資料
const restaurantList = require('../../restaurant.json').results
const SEED_USER = [{
  email: 'user1@example.com',
  password: '12345678'
},
{
  email: 'user2@example.com',
  password: '12345678'
}]

db.once('open', () => {
  console.log('running restaurantSeeder script...')
  const saltRounds = 10
  SEED_USER.forEach(item => {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(item.password, salt, (err, hash) => {
        // Store hash in your password DB.
        return User.create({
          email: item.email,
          password: hash
        })
          .then(user => {
            const userId = user._id
            if (user.email === 'user1@example.com') {
              for (let i = 0; i < 3; i++) {
                let { name, name_en, category, image, location, phone, google_map, rating, description, } = restaurantList[i]
                RestaurantList.create({
                  name, name_en, category, image, location, phone, google_map,
                  rating: Number(rating),
                  description, userId
                })
              }
            } else {
              for (let i = 3; i < 6; i++) {
                let { name, name_en, category, image, location, phone, google_map, rating, description, } = restaurantList[i]
                RestaurantList.create({
                  name, name_en, category, image, location, phone, google_map,
                  rating: Number(rating),
                  description, userId
                })
              }
            }
          })
          .catch(err => console.log(err))
      })
    })
  })
  console.log('restaurantSeeder done!')
})
