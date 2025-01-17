const Sequelize = require('sequelize')
const sequelize = require('../util/db')


const Product = sequelize.define('product', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,

    },
    title: Sequelize.STRING,
    price:{
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    imageUrl:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    description:{
        type: Sequelize.STRING,
        allowNull: false,
    }


})

module.exports = Product
















// without sequelize 

//  const db = require('../util/db')
// const Cart = require('./cart')


// module.exports = class Product {
//   constructor(id, title, imageUrl, description, price) {
//     this.id = id;
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this.price = price;
//   }

//   save() {

//     return db.execute("INSERT INTO nodejsshop.products (title, description, price, imageUrl) VALUES (?,?,?,?)",
//       [this.title, this.description, this.price, this.imageUrl]
//     )

//   }

//   static fetchAll(cb) {
//     return db.execute('SELECT * FROM products')


//   }

//   static findById(id) {

//     return db.execute('SELECT * FROM products where products.id = ?',[id])
//   }

//   static deleteById(id) {

//   }
// };
