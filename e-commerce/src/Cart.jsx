import { useEffect, useState } from "react"
import axios from "axios"
import "./App.css"
import Navbar from "./Navbar"

const Cart = () => {

    const [products,setProducts] = useState([])

    const handleSaveLater = async (productId)=>{
        const response = await axios.get(`/wishlist/${productId}`)
        console.log(response.data)
    }
  
    const handleCart = async (productId) => {
        console.log("Inside remove from cart function")
      const response = await axios.get(`/removeFromCart/${productId}`)
      console.log(response.data)
    }
  

    useEffect(()=>{

        const fetchWishList = async () => {
            try{
                const response = await axios.get("/cart")
                console.log(response.data)
                setProducts(response.data)
            }
            catch{
                console.log("error")
            }
        } 

        fetchWishList();

    },[])

    return (
        <div>
            <Navbar/>
            <h2 style={{'margin-top': '59px','margin-left':'4.5%'}}>My Cart!</h2>
           <div className='products-page' style={{'margin-left':'4%'}}>
           {products.map(product => (
                <div className='product-container'>
                <img src={product.image} alt={product.product} style={{'marginBottom':'52px'}}></img>
                <div className='product-heading-price'>
                <h1 style={{'fontSize':'1.5rem'}}>{product.product}</h1>
                <h3 style={{'fontSize':'1.5rem'}}>${product.price}</h3>
                </div>
                <button className='wishlist-button' onClick={()=>handleSaveLater(product._id)}>Save for Later</button>
                <button className='cart-button' onClick={() => handleCart(product._id)}>Remove from Cart</button>
              </div>
            ))}
           </div>
        </div>
    )
}

export default Cart