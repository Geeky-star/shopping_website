import {Link} from "react-router-dom";
import './App.css';
import logo from './logo.png';

const Navbar = () =>{
    return (
        <div>
<nav class="navbar navbar-expand-lg" style={{'height':'143px','backgroundColor':'#f6f7f8 !important'}}>
  <div className="navbar-logo" style={{'margin': '28px 0px 25px 25px !important'}}>
  <img src={logo} style={{'height':'140px','width':'160px','border-radius':'50%'}}></img>
  </div>
  <div class="container-fluid">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup" style={{'marginLeft':'700px'}}>
      <div class="navbar-nav">
        <Link to='/'>What's New</Link>
        <Link to='/'>Home</Link>
        <Link to='/wishlist'>Wishlist</Link>
        <Link to='/cart'>Cart</Link>
        <Link to='/signup'>Sign Up</Link>
         <Link to='/login'>Login</Link>
         <ion-icon name="cart-outline" style={{ 'fontSize': '30px' }}></ion-icon>
      </div>
    </div>
    
  </div>
</nav>
        </div>
    )
}

export default Navbar;