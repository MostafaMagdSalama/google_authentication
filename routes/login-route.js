const express=require('express');
const passport =require('passport');
const router=express.Router();
const check=(req,res,next)=>{
    if(req.user){
next();
    }
    else{
        res.redirect('/');
    }   
}
router.get('/',(req,res)=>{
   // console.log(req.user.photo);
    
    res.render('login');
});
router.get('/google',passport.authenticate('google',{
    scope:['profile']
}));
router.get('/auth/google/redirect',passport.authenticate('google'),(req,res)=>{
   res.redirect('/profile');
}
    );
    router.get('/profile',check,(req,res)=>{
res.render('profile',{name:{f1:req.user.username,f2:req.user.photo}});
    });
    router.get('/logout',(req,res)=>{
     req.logout();
     res.redirect('/');
            })
module.exports=router;