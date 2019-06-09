const passport=require('passport');
const User=require('../models/user-model');
const GoogleStrategy=require('passport-google-oauth20');

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
callbackURL:'/auth/google/redirect',
clientID:'425304980667-nmvug4ct64ho8d60qcocu5nd9a6esns4.apps.googleusercontent.com',
clientSecret:'7vh2-euCPHiqf86kiuYmP8Iz'
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