
# Be A Foodie: Restaurant List

Quickly explore the restaurants by web application.

![Home page]()  

## Features

 - Use the search bar to look for desired restaurants by name or categories.
 -  Eight restaurants are available to be explored by default.
 - Add more restaurants to the list: click 新增餐廳 button and enter the details then click 儲存變更 button to save.
 - Details can be reach by clicking the image and 介紹 button.
 - Edit restaurant information: click 編輯 button at home page or detail page then click 儲存變更 button to save.
 - Remove the restaurant from the list: click 刪除button at home page or detail page.


## Installing

  

1. Open terminal.

2. Cloning the repository

```shell
// HTTPS

git clone https://github.com/yaahsin/Restaurant_page.git

```

3. Move to the folder `cd Restaurant_page`

4. Type in `npm install`

5. Create environment variable「MONGODB_UR」 to connect your database:

Terminal: 
```shell
set "MONGODB_URI= <MongoDB URI>"
```

6. Command `npm run dev`  to start the server

7. If `server is running on port 3000`, visit http://localhost:3000.


**Built With**
- Node.js v16.14.2
- express v4.16.4
- express-handlebars v3.0.0
- body-parser v1.20.0
- mongoose v5.9.7
- MongoDB database
- Bootstrap v5.1.3
- popper v2.9.1
- font-awesome v6.1.1
