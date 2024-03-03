import { useEffect, useState } from "react"
import axios from "axios"
import './App.css';
import Navbar from './Navbar'
axios.defaults.withCredentials = true;
const Wishlist = () => {

    const [products,setProducts] = useState([])

    const handleWishlist = async (productId)=>{
        const response = await axios.get(`/wishlist/${productId}`,{
            withCredentials: true,
        })
        console.log(response.data)
    }
  
    const handleCart = async (productId) => {
      const response = await axios.get(`/cart/${productId}`)
      console.log(response.data)
    }
  

    useEffect(()=>{

        const fetchWishList = async () => {
            try{
                const response = await axios.get("/wishlist")
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
            <h2 style={{'margin-top': '59px','margin-left':'4.5%'}}>My Wishlist!</h2>
           <div  className='products-page' style={{'margin-left':'4%'}}>
           {products.map(product => (
                <div className='product-container'>
                <img src={product.image} alt={product.product} style={{'marginBottom':'52px'}}></img>
                <div className='product-heading-price'>
                <h1 style={{'fontSize':'1.5rem'}}>{product.product}</h1>
                <h3 style={{'fontSize':'1.5rem'}}>${product.price}</h3>
                </div>
                <button className='wishlist-button' onClick={()=>handleWishlist(product._id)}>Remove from Wishlist</button>
                <button className='cart-button' onClick={() => handleCart(product._id)}>Add to Cart</button>
              </div>
            ))}
           </div>
        </div>
    )
}

export default Wishlist