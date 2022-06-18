
# Be A Foodie: Restaurant List

 Manage a own restaurants' list by web application.

![enter image description here](https://raw.githubusercontent.com/yaahsin/Restaurant_page/main/views/A1_%E9%A4%90%E5%BB%B3%E6%B8%85%E5%96%AE_final.png)

  

## Features

 - [ ] List item
 - [ ] Use the search bar to look for desired restaurants by name or categoriy.
 - [ ] CRUD operations:  Add, read, edit or delete restaurants in(to) the list
 - [ ] Authentication: user need to register to acquire permission to enter the homepage (register, login, FB register and login)
 - [ ] Secure passwords with hash function
  
  

## Installing
1. Open terminal.
2. Cloning the repository

```shell
// HTTPS
git clone https://github.com/yaahsin/Restaurant_page.git
```
3. Move to the folder `cd Restaurant_page`
4. Type in `npm install`
5. Create FB login App at https://developers.facebook.com/
6. Please see .env.example  to create your own environment variable.
7. Command `npm run dev` to start the server 
8. Command `npm run seed` to run seeder 
9. If `server is running on port 3000`, visit http://localhost:3000.

**Built With**

- Node.js v16.14.2
- express v4.16.4
- express-handlebars v3.0.0
- express-session v1.17.1
- body-parser v1.20.0
- bcryptjs v2.4.3
- connect-flash v0.1.1
- method-override v3.0.0
- dotenv v8.2.0
- passport v0.4.1
- passport-facebook v3.0.0
- passport-local: v1.0.0
- mongoose v5.9.7
- MongoDB database
- Bootstrap v5.1.3
- popper v2.9.1
- font-awesome v6.1.1
