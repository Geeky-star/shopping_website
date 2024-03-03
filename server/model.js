const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const productSchema = mongoose.Schema({
    product:String,
    price:Number,
    description:String,
    benefits:Array,
    image:String
})

const wishlistSchema = mongoose.Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: "products_collections"
    }
    ,
    userId: {
       type: Schema.Types.ObjectId,
       ref:"amazon_users"
    }
})

const cartSchema = mongoose.Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: "products_collections"
    },
    
    userId: {
       type: Schema.Types.ObjectId,
       ref:"amazon_users"
    }
})

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const Products = mongoose.model("products_collections",productSchema)
const Wishlist = mongoose.model("wishlist_collections",wishlistSchema)
const Cart = mongoose.model("cart_collections",cartSchema)
const User = mongoose.model("amazon_users",userSchema)

module.exports = {Products,Wishlist,Cart,User}