import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name : {
        type : String,
        required :true,
    },
    email : {
        type : String,
        require:true,
        unique:true,
    },
    phone : {
        type : String,
        require : true,
        unique : true ,
    },
    password : {
        type : String,
        required:true,
        minlength : 6
    },
    token : {
        type : String,
        require : true , 
        unique : true
    },
    type : {
        type : String,
        require : true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
      },
   
},
{
    timestamps : true
}
)

export default mongoose.model("User",userSchema);
//By default mongo store User as users