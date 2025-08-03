const express = require("express");
const path = require('path');
const cookieParser = require('cookie-parser');
const {restrictToLoggedInUserOnly} = require('./middlewares/auth');


// connecting to db
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/user-auth')
.then(()=>{
    console.log("connected to mongoDB");
})
.catch((err)=>{
    console.error("Can't connected to Db");
});

// routes
const userRouter = require('./routes/user');
const staticRouter = require('./routes/staticRouter');


const  app = express();


// middlewares
app.set('view engine','ejs');
app.set('views',path.resolve('./views'));

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser())

app.use('/user',userRouter);
app.use('/',restrictToLoggedInUserOnly,staticRouter);



app.listen(4000,()=>{
    console.log('App listening at port 4000');
})