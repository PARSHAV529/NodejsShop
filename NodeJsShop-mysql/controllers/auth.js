const { where } = require("sequelize");
const User = require("../models/user");
const bcrypt = require("bcryptjs");


exports.getLogin = (req, res, next) => {
  // const isLogedIn = req.get('Cookie').split('=')[0].trim() === 'true'

  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: req.session.isLogedIn,

  });
}
exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    isAuthenticated: false
  });
};

exports.postSignup =async (req, res, next) => {
  const email = req.body.email
  const password = req.body.password
  const confirmPassword = req.body.confirmPassword
  const hash=await bcrypt.hash(password, 10)

  User.findOne({where:{ email: email}}).then(user => {
    if(user){
      res.redirect('/signup')
    }
    User.create({
      email: email,
      password: hash
    })
    
  }).then(()=>{
    res.redirect('/login')
  }).catch(err => {
    res.redirect('/')
  })
};

exports.postLogin = (req, res, next) => {
  // res.setHeader('Set-cookie', 'isLogedIn:true')
  const email = req.body.email
  const password = req.body.password
  User.findOne({where:{email:email}}).then(user => {
    bcrypt.compare(password, user.password).then(doMatch=>{
      
      if(doMatch){
        req.session.user = user.toJSON();
        req.session.isLogedIn = true
       return req.session.save((err)=>{
          console.log(err);
          user.createCart()
          res.redirect('/')
      }
      
      )
     

    }
        res.redirect('/login')
      

    }).catch(err=>{
      res.redirect('/login')
    })
   
   
  }).catch(err => {
    console.log(err);
    res.redirect('/login')
  })
  
}
exports.postLogout = (req, res, next) => {
 
  req.session.destroy(err=>{
    console.log(err);
   
    
    res.redirect('/');
    
  })
}



