import mongoose from "mongoose";

const Schema = mongoose.Schema;

const cartSchema = new Schema({
     userId : {
        type : String,
     },

    items: [{
        productId: {
            type: String,
        },
        name: String,
        rating:String,
        image:String,
        quantity : Number,
        price: Number,
        //amount : Number,
    }], 
   
    bill: {
        type: Number,
        required: true,
        default: 0
    },
    active: {
        type: Boolean,
        default: true
      },
      modifiedOn: {
        type: Date,
        default: Date.now
      }
},
{timestamps : true})

export default mongoose.model("CartItem" , cartSchema)