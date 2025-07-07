const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minlength:3
    },
    profilePic:{
        type:String,
        default:''
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    password: {
        type: String,
    },
    profile_name: {
        type: String,
        default: ''
    },
    googleId: {
        type: String, // ✅ THIS FIELD
        unique: true,
        sparse: true, // ✅ So that it's optional (only for Google users)
    },
    about: {
        type: String,
        default: ''
    },
    quote: {
        type: String,
        default: ''
    },
    interactions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'  
        }]
},{timestamps:true});

userSchema.pre('save' , async function(next) {
    if(!this.isModified('password'))
        return next();
    try{
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password,salt);
        next();
    } catch(err){
        next(err);
    }
});


userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword,this.password);
};


module.exports = mongoose.model('User',userSchema);