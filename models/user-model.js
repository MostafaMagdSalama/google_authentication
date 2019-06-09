const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const UserSchema=new Schema({
    username:String,
    google_id:String,
    photo:String
});
module.exports=mongoose.model('users1',UserSchema);