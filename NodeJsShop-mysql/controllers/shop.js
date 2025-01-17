const Product = require('../models/product');
const User = require('../models/user');

const Cart = require('../models/cart');
exports.getProducts = (req, res, next) => {
  Product.findAll().then(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products',
      isAuthenticated: req.session.isLogedIn,
    })

  }).catch(err => console.log(err))



};

exports.getProduct = (req, res, next) => {
  const productId = req.params.Id
  Product.findByPk(productId).then(product => {
    console.log(product);
    
    res.render('shop/product-detail', {
      product: product,
      pageTitle: product.title,
      path: `/products`,
      isAuthenticated: req.session.isLogedIn,
    })
  }).catch(err => console.log(err))


}

exports.getIndex = (req, res, next) => {

  Product.findAll().then(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
      isAuthenticated: req.session.isLogedIn,
    });

  }).catch(err => console.log(err))


};

exports.getCart = (req, res, next) => {


  req.user.getCart().then(cart => {
    // console.log(req.user);
    
    // console.log(cart);

    return cart.getProducts().then(products => {
      // console.log(products);
      
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products,
        isAuthenticated: req.session.isLogedIn,
        // totalPrice:cart.totalPrice
      })
    }).catch(err => console.log(err))
  }).catch(err => console.log(err))



};

exports.postCart = (req, res, next) => {
  const productId = req.body.productId
  let fetchCart
  let newQuantity = 1;
console.log(productId);


  req.user.getCart().then(cart => {
    console.log(cart);
    
    fetchCart = cart
    return cart.getProducts({ where: { id: productId } }).then(products => {
      console.log(products);
      
      let product;
      if (products.length > 0) {
        product = products[0]
      }
      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        
        return product
      }
      return Product.findByPk(productId)
    }).then(product => {
      return fetchCart.addProduct(product, { through: { quantity: newQuantity } })
    }).then(() => {
      res.redirect('/cart')
    }).catch(err => console.log(err))
  }).catch(err => console.log(err))

}

exports.deleteCartItem = (req, res, next) => {
  req.user.getCart().then(cart=>{
    const productId = req.body.productId

   return cart.getProducts({where:{id:productId}})
   
  }).then(products=>{
    const product = products[0]
    return product.cartItem.destroy()

  }).then(()=>{
    res.redirect('/cart')
  }).catch(err => console.log(err));
  


}
exports.postOrder = (req, res, next) => {
  let fetchCart
  req.user.getCart().then(cart=>{
    fetchCart = cart;
    return cart.getProducts().then(products=>{
      return User.build(req.session.user).createOrder().then(order=>{
        return order.addProducts(products.map(product=>{
          product.orderItem = {quantity:product.cartItem.quantity}
          return product
        }))
      }).then(result=>{
        fetchCart.setProducts(null).then(result=>{
          res.redirect('/orders')
        }).catch(err=>console.log(err))
      }).catch(err => console.log(err));
    }).catch(err => console.log(err));
  }).catch(err => console.log(err));

}
exports.getOrders = (req, res, next) => {
  req.user.getOrders({include:['products']}).then(
    oreder=>{
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        oreder: oreder,
        isAuthenticated: req.session.isLogedIn,
      });
    }
  ).catch(err=>console.log(err)
  )
  
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout',
    isAuthenticated: req.session.isLogedIn,
  });
};
