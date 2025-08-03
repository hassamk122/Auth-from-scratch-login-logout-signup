const {getUser} = require('../service/auth');


async function restrictToLoggedInUserOnly(request,response,next){
       if (request.path === '/login' || request.path === '/signup') return next();
    const userUid = request.cookies.uid;
    if(!userUid){
        return response.redirect('/login');
    }

    const user = getUser(userUid);
    if(!user){
        return response.redirect('/login');
    }

    request.user = user;
    next();
}

module.exports = {
    restrictToLoggedInUserOnly,
}