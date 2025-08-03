const User = require('../models/user');

const {v4:uuidv4} = require('uuid');

const {setUser,getUser} = require('../service/auth')

async function handleUserSignUp(request,response){
    const {password,email,name} = request.body;

    await User.create({
        password,
        email,
        name,
    });
    return response.redirect('/login');
}


async function handleUserLogin(request,response){
    const {password,email} = request.body;
    const user = await User.findOne({password,email});
    if(!user){
        return response.render('login',{
            error:'Invalid Credentails'
        })
    }
    const sessionId = uuidv4();
    setUser(sessionId,user);
    response.cookie('uid',sessionId);

    return response.redirect('/');
}

module.exports ={
    handleUserSignUp,
    handleUserLogin
}