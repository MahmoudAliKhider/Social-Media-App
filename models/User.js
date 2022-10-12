const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username:{
        type:String,
        require:true,
        min:3,
        max:16,
        unique:true
    },
    email:{
        type:String,
        require:true,
        max:16,
    },
    password:{
        type:String,
        require:true,
        min:6,
       
    },
    profilePicture:{
        type:String,
        default:""
    },
    coverPicture:{
        type:String,
        default:""
    },
    followers:{
        type:Array,
        default:[]
    },
    followings:{
        type:Array,
        default:[]
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    desc:{
        type:String,
        max:150,
    },
    city:{
        type:String,
        max:50,
    },form:{
        type:String,
        max:50,
    },
    relationships:{
        type:Number,
        enum:[1,2,3]
    }
},{timestamps:true})

module.exports =mongoose.model('User',UserSchema);