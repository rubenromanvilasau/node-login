const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User=require('../models/user');

passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser( async(id,done)=>{
    const user=await User.findById(id);
    done(null,user.id); 
});

passport.use('local-signup',new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done)=>{

     const user = await User.findOne({email: email});
   
    // console.log(user);

    if(user){
        return done(null, false, req.flash('signupMessage','El email ya existe'));
    }
    else if(password.length > 32 || password.length<8  ){
        return done(null,false,req.flash('passwordLengthMessage','La contraseña debe tener al menos 8 caracteres (hasta 32 caracteres)'));
    }   
    else{
            const newUser=new User();
            newUser.email=email;
            newUser.password=newUser.encryptPassword(password);
            await newUser.save();
            done(null, newUser);  
    }
    
    }
));
passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true   
},async (req, email, password,done )=>{
    const user=  await User.findOne({email: email});
    if(!user){
        return done(null,false, req.flash('signinMessage', 'Usuario no encontrado'));
    } 
    if(!user.comparePassword(password)){
        return done(null,false, req.flash('signinMessage', 'La clave ingresada es incorrecta'));
    }
    
    
    done(null, user);   
}));