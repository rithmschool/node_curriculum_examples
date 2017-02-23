exports.loginRequired = function(req,res,next){
    if(!req.session.user_id){
        req.flash('error', 'Please log in!')
        res.redirect('/users/login')
    } else {
        next();
    }
}

exports.ensureCorrectUser = function(req,res,next){
    if(req.session.user_id !== req.params.id){
        req.flash('error', 'Unauthorized!')
        res.redirect('/users')
    }
}