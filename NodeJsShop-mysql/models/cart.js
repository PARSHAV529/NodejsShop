const fs = require('fs');
const path = require('path');
const Product = require('./product');
const { json } = require('body-parser');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);

module.exports = class Cart {
    static addProduct(id,price){
        fs.readFile(p,(err,fileContent) => {
          let cart={products:[],totalPrice:0}

          if(!err){
              cart= JSON.parse(fileContent)
          }

          const existingProductIndex = cart.products.findIndex(product => product.id===id)
          const existingProduct = cart.products[existingProductIndex]
          let updatedProduct ;

          if(existingProduct){
            updatedProduct = {...existingProduct}
            updatedProduct.qty = updatedProduct.qty +1 
            cart.products=[...cart.products]
            cart.products[existingProductIndex]=updatedProduct

          }else{
            updatedProduct={id:id,qty:1}
            cart.products=[...cart.products,updatedProduct]

          }
          cart.totalPrice= cart.totalPrice+ +price
          fs.writeFile(p,JSON.stringify(cart),err => console.log(err))
        })
    }

    static deleteProduct(id,price){
      fs.readFile(p,(err,fileContent) => {
            if(err) {
              return
            }

            const updatedCart = {...JSON.parse(fileContent)}
            const product = updatedCart.products.find(product => product.id==id)

            if(!product){
              return
            }

            updatedCart.products = updatedCart.products.filter(product => product.id !== id)

            console.log(product.qty,price);
            

            updatedCart.totalPrice = updatedCart.totalPrice - (price * product.qty)


           fs.writeFile(p,JSON.stringify(updatedCart),err => console.log(err))
      })
    }

    static getCart(cb){
      fs.readFile(p,(err,fileContent) => {
        const cart = JSON.parse(fileContent)
        if(err){
          cb([])

        }else{
          cb(cart)
        }
      })
    }
}