const Product = require('../models/product');
const User = require('../models/user');

exports.getAddProduct = (req, res, next) => {
  
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
    product: null,
    isAuthenticated: req.session.isLogedIn,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const user =req.user;
  console.log(user);
  
  user.createProduct({
    title: title,
    imageUrl: imageUrl,
    price: price,
    description: description

  }).then(() => res.redirect('/admin/products')).catch(err => console.log(err));



};

exports.getEditProduct = (req, res, next) => {
  const editingMod = req.query.edit
  if (editingMod != "true") {
    res.redirect('/')
  }

  const prodId = req.params.productId
  // console.log(req.user);
  req.user.getProducts({where:{id: prodId}}).then((products) => {
    const product = products[0]
    if(!product){
      res.redirect('/')
    }
    res.render('admin/edit-product', {
      pageTitle: 'Update Product',
      path: '/admin/edit-product',
      editing: editingMod,
      product: product,
      isAuthenticated: req.session.isLogedIn,

    });
  }).catch(err => console.log(err))



};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId
  const title = req.body.title
  const imageUrl = req.body.imageUrl
  const description = req.body.description
  const price = req.body.price
  // console.log(prodId,title,imageUrl,description,price);


  Product.update(
    { title: title, imageUrl: imageUrl, description: description, price: price },
    {
      where: {
        id: prodId,
      },
    },
  ).then(() => res.redirect('/admin/products')).catch(err => console.log(err))

}


exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId
  // console.log(productId);



  Product.destroy({
    where: {
      id: productId,
    },
  }).then(() => res.redirect('/admin/products')).catch(err => console.log(err))

}


exports.getProducts = (req, res, next) => {

  req.user.getProducts().then((products) => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products',
      isAuthenticated: req.session.isLogedIn,
    });
  }).catch((err) => {
    console.log(err);

  })


};
