require('dotenv').config();
const mongoose=require('mongoose');
const {mongodb}=require('./keys');

mongoose.connect(process.env.DB_URI,{useNewUrlParser:true})
    .then(()=>{console.log('DATABASE IS CONNECTED'); })
    .catch(()=>{console.error(err)});