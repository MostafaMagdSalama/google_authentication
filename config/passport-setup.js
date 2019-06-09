const passport=require('passport');
const User=require('../models/user-model');
const GoogleStrategy=require('passport-google-oauth20');
const s=require('../secret');
passport.serializeUser((user,done)=>{
done(null,user.id);
});
passport.deserializeUser((id,done)=>{
    User.findById(id).then(user=>{
        done(null,user);
    });
   
    });


passport.use(
    new GoogleStrategy({
callbackURL:s.callbackURL,
clientID:s.clientID,
clientSecret:s.clientSecret
},(AT,RT,profile,done)=>{
console.log(profile.photos[0].value);


User.findOne({google_id:profile.id}).then(user=>{
    if(user)
    {
console.log('the user in exist in the database');
done(null,user);

    }
    else{
        new User({
            username:profile.displayName,
            google_id:profile.id,
            photo:profile.photos[0].value
            }).save().then(data=>{
                console.log('the user data is : '+data);
                done(null,data);
            });
            
    }
})
}
));