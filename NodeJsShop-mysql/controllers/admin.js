const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
    product: null
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null,title, imageUrl, description, price);
  product.save();
  res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
  const editingMod = req.query.edit
if(editingMod!="true") {
  res.redirect('/')
}

const prodId = req.params.productId
Product.findById(prodId,(product)=>{
  res.render('admin/edit-product', {
    pageTitle: 'Update Product',
    path: '/admin/edit-product',
    editing: editingMod,
    product: product

  });
})
  
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId
  const title = req.body.title
  const imageUrl = req.body.imageUrl
  const description = req.body.description
  const price = req.body.price
  // console.log(prodId,title,imageUrl,description,price);
  

  const updateProduct = new Product(prodId, title,imageUrl, description, price)
  updateProduct.save()
  res.redirect('/admin/products')
}


exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId
  console.log(productId);
  
  Product.deleteById(productId)
  res.redirect('/admin/products')
}


exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};
