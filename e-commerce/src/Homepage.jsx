import { useEffect, useState } from 'react';
import './App.css';
import mainImg from './mainImg.png'
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3001'
axios.defaults.withCredentials = true;

const HomePage = () => {
    const [productsList, setProducts] = useState([]);
  useEffect(() => {

    const fetchProductsData = async () => {
      try {
        const response = await axios.get(axios.defaults.baseURL)
        setProducts(response.data);
        console.log(response.data)
      }
      catch (err) {
        console.log("error")
      }
    }

    fetchProductsData();
},[]);

const handleWishlist = async (productId)=>{
    const response = await axios.get(`/wishlist/${productId}`)
    console.log(response.data)
}

const handleCart = async (productId) => {
  const response = await axios.get(`/cart/${productId}`)
  console.log(response.data)
}


    return (<div>
      <img src={mainImg}></img>
      <h3 style={{'margin-top':'100px','margin-left':'4.5%','margin-bottom':'1.2%'}}>Products for You!</h3>
<div className='products-page' style={{'margin-left':'4%'}}>
        {productsList.map(product => (
          <div className='product-container'>
            <img src={product.image} alt={product.product} style={{'marginBottom':'52px'}}></img>
            <div className='product-heading-price'>
            <h1 style={{'fontSize':'1.5rem'}}>{product.product}</h1>
            <h3 style={{'fontSize':'1.5rem'}}>${product.price}</h3>
            </div> 
            <button className='wishlist-button' onClick={()=>handleWishlist(product._id)}>Add to Wishlist</button>
            <button className='cart-button' onClick={() => handleCart(product._id)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
    )
}

export default HomePage;