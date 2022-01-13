const express= require('express');
const req = require('express/lib/request');
const router=express.Router();
const passport = require('passport');

router.get('/',(req,res)=>{
   res.render('index');
});

router.get('/signup',(req,res)=>{
    res.render('signup');
});

router.post('/signup',passport.authenticate('local-signup',{
    successRedirect: '/profile',
    failureRedirect: '/signup',
    passReqToCallback: true
}));

router.get('/signin',(req,res)=>{
    res.render('signin');
});

router.post('/signin', passport.authenticate('local-signin',{
    successRedirect: '/profile' ,
    failureRedirect: '/signin',
    passReqToCallback: true
}));

router.get('/profile', isAuthenticated,(req,res)=>{
    res.render('profile');
});

router.get('/logout',(req,res,next)=>{
    req.logout();
    req.flash('logoutMessage','Ha cerrado sesión correctamente');
    res.redirect('/');    
});

function isAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('profileAccessMessage','Por favor inicie sesión para ver esta página');
    res.redirect('/signin');  
};

module.exports = router;