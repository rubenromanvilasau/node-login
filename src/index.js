const express= require('express');
const path= require('path');
const engine=require('ejs-mate');
const morgan =require('morgan');
const passport = require('passport');
const session=require('express-session');
const flash=require('connect-flash');

//Initializations
const app = express();
require('./database');
require('./passport/local-auth');

//Settings
app.set('port', process.env.PORT || 3000);
app.set('views',path.join(__dirname,'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');

//Static files
app.use(express.static(path.join(__dirname, 'public')));


//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret:'secretSession',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


app.use((req,res,next)=>{
   res.locals.signupMessage= req.flash('signupMessage');
   res.locals.signinMessage= req.flash('signinMessage'); 
   res.locals.logoutMessage= req.flash('logoutMessage');
   res.locals.passwordLengthMessage=req.flash('passwordLengthMessage');
   res.locals.profileAccessMessage=req.flash('profileAccessMessage');
   next();
});

//Routes
app.use(require('./routes/index.js'));

//Server running
app.listen(app.get('port'), ()=>{
    console.log('Server running on port: ' ,app.get('port'));
});