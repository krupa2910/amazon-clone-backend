import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new Schema({

    // id:String,
    // image:String,
    // rating : String,
    // title:String,
    // price:Number,
    // description:String,
    
    id : {
        type:String,
        required : true,
        unique : true,
    },
    title : {
        type : String,
        required : true,
    },
    description: {
        type : String,
        required : true,
    },
    rating : {
        type : String,
        required : true,
    },
    quantity : {
        type: Number,
        required: true,
        //min: [1, 'Quantity can not be less then 1.'],
        default: 1
    },
    price : {
        type : Number,
        required : true,
    },
    category : {
        type :String,
        required : true,  
    },
    image : {
        type : String,
        required : true
    },
    date_added: {
        type: Date,
        default: Date.now
    },

})
export default mongoose.model("Products",productSchema);

//title,description,rating,price,discount,brand,image