const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};

exports.getProduct = (req, res, next) => {
  const productId = req.params.Id
  Product.findById(productId,prod=>{
    res.render('shop/product-detail',{
      product: prod,
      pageTitle:prod.title,
      path: `/products`
    })
  })
  
  
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};

exports.getCart = (req, res, next) => {

  Cart.getCart((cart)=>{
      Product.fetchAll(products => {
        const cartproducts = [] 
        for(prod of products){
          const cartProductData = cart.products.find(p=>p.id === prod.id)

          if(cartProductData){
            cartproducts.push({productData : prod,qty:cartProductData.qty})
            
          }
        }
       
        
        res.render('shop/cart', {
          path: '/cart',
          pageTitle: 'Your Cart',
          products:cartproducts,
          totalPrice:cart.totalPrice
          
        });
      })
  })
  
};

exports.postCart = (req, res, next) => {
  const productId = req.body.productId
  Product.findById(productId,(product)=>{
    Cart.addProduct(productId, product.price)
  })
  res.redirect('/cart') 
  
}

exports.deleteCartItem = (req, res, next) => {
  Cart.deleteProduct(req.body.productId, req.body.price)
 
  
  res.redirect('/cart')
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
