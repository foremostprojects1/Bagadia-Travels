import mongoose from "mongoose";

const userModel = new mongoose.Schema({
    email:{
        type:'string',
        required: true,
    },
    password:{
        type:String,
        required:true
    }
});

export default mongoose.model('User', userModel);
