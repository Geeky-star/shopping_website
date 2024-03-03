const express = require("express");
require('dotenv').config();
const app = express()
const cors = require('cors');
const {Products,Wishlist,Cart,User} = require("./model")

const mongoose = require('mongoose');
const { ObjectId } = require("mongodb");
const PORT = 3001;
const jwt = require('jsonwebtoken');

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const jwtSecret = 'fasfjhgkjhjk'
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const corsOptions = {
    credentials: true,
    origin: 'http://localhost:3000', // Allow requests from your React app
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization',
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

const MONGO_URL = process.env.MONGOURL

app.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}`)
})

const connectToDatabase = async ()=>{
    try{
        await mongoose.connect(MONGO_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("connected to mongodb")
    }
    catch(err){
        console.log("error ${err")
    }
}

connectToDatabase();

app.get("/",async (req,res)=>{
    try{
          const products = await Products.find()
          console.log(products)
          return res.status(200).json(products)
    }
    catch(err){
        console.log("some error occured")
    }
})

app.get("/wishlist/:productId",async (req,res) => {

    const productId = req.params.productId
    const {token} = req.cookies;
    try{

        if(token){
            jwt.verify(token,jwtSecret,{},async (err,user) => {
                if(err) throw err;
                const productToAdd = new Wishlist({
                    productId:productId,
                    userId: user._id
                   })
    
                   await productToAdd.save()
                   return res.json({message:"Product added successfully to the Wishlist."})
            })
           
    
            
        }
        else{
            return res.json(null)
        }

         }catch(err){
        console.log(err)
    }
})


app.get("/cart/:productId",async (req,res) => {

    const productId = req.params.productId;
    const {token}  = req.cookies;
    try{

        if(token){
            jwt.verify(token,jwtSecret,{},async (err,user) => {
                if(err) throw err;
                const productToAdd = new Cart({
                    productId:productId,
                    userId: user._id
                   })
               
    
                   await productToAdd.save()
                   return res.json({message:"Product added successfully to the Cart."})
            })
          }}
          catch(err){
        console.log(err)
    }
})

app.get("/wishlist",async (req,res) => {
    try{
        const { token } = req.cookies;
        jwt.verify(token, jwtSecret, {}, async (err, user) => {
            if (err) throw err;
            const wishlist = await Wishlist.find({userId:user._id})
          let result = []

          await Promise.all(wishlist.map(async (element) => {
            const item = await Products.findById(element.productId);
            result.push(item);
        }));


        console.log("response - ",result)
          return res.send(result)
        })

          

          
    }
    catch{
        console.log("error")
    }
})

app.get("/cart", async (req,res) => {
    const {token} = req.cookies
    try{

        jwt.verify(token,jwtSecret,{}, async (err,user) => {
           if(err) throw err;
        
           const cartItems = await Cart.find({userId:user._id})
           let result = []

          await Promise.all(cartItems.map(async (element) => {
            const item = await Products.findById(element.productId);
            result.push(item);
        }));

           res.json(result)
        })
    }
    catch{
        console.log("error")
    }
})

app.get("/removeFromCart/:productId", async (req,res) => {
    const productId = req.params.productId
    try{
        const result = await Cart.findByIdAndDelete(productId)
       return res.status(200).send({message:"Item removed from Cart Successfully!"})
    }
    catch{
        console.log("error")
    }
})

app.post("/register", async (req,res) => {
    const {email,password} = req.body;
    console.log(req.body,email,password)
    try{
    
        const userDoc = await User.create({
          email:  email,
           password: password
        })

    console.log("result - ",userDoc)
    return res.status(200).send({ message: "Registration Successful!" });
      
    }
    catch(err){
        console.log(err)
    }
})

app.post("/login", async (req,res) => {
    const {email,password} = req.body;

    try{
       const userDetails = await User.find({email})
       console.log(userDetails[0].password,password)
       if(userDetails){
        if(userDetails[0].password === password){
            const user = {email:userDetails[0].email,id:userDetails[0]._id}
            console.log(user)
            jwt.sign(user,jwtSecret,{},(err,token) => {
                if (err) throw err;
                res.cookie('token', token, { httpOnly: true }).json(user);
            })
             }
        else{
            return res.status(200).json({message:"Wrong password. Try again!",data:false})
        }
       }
       else{
        return res.status(200).json({message:"User not found!",data:false})
       }
    }
    catch(err){
        console.log(err)
    }
})