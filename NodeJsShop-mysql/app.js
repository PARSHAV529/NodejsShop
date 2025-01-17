const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const sequelize = require("./util/db");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const Order = require("./models/order");
const cartItem = require("./models/cart_item");
const orderItem = require("./models/order-item");
const session = require("express-session");
const csrf = require("csurf");
// var MSSQLStore = require('connect-mssql')(session);
const SequelizeStore = require('connect-session-sequelize')(session.Store);



const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");
const { constants } = require("buffer");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
const { Connection } = require('tedious');
const csrfProtection = csrf();

const sessionStore = new SequelizeStore({ db: sequelize });
app.use(session({secret:'ejhfhbhfhviuwfviji3riuvr',resave:false,saveUninitialized:false,store:sessionStore}));
sessionStore.sync();
app.use(csrfProtection);
app.use((req,res,next)=>{
  if(!req.session.user){
return next();
  }
  User.findByPk(req.session.user.id).then(user => {
    // console.log(user);
    
   req.user=user
next()
    
  }).catch(err => {
    console.log(err);

  })

})

app.use((req,res,next)=>{
  res.locals.isAuthenticated=req.session.isLoggedIn;
  res.locals.csrfToken=req.csrfToken();
  next();
})


app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

Product.belongsTo(User,{constraints:true,onDelete:"CASCADE"});
User.hasMany(Product)
User.hasOne(Cart);
Cart.belongsTo(User)
Cart.belongsToMany(Product,{through:cartItem});
Product.belongsToMany(Cart,{through:cartItem})
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product,{through:orderItem});
Product.belongsToMany(Order,{through:orderItem})


sequelize
  // .sync({force:true})
  .sync()
  .then((res) => {
    // return User.findByPk(1)
   
  }).then(user=>{
    // if(!user){
    //    return User.create({name:"parshav",email:"parshav@gmail.com"})
    // }
    return user
  }).then(user=>{
    // return user.createCart();
  }).then((res) => {
    app.listen(3001);

  })
  .catch((err) => {
    console.log(err);
    //  error(err);
  });
