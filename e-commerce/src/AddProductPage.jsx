const { useState } = require("react");

const AddProduct = () => {
    const [productName,setProductName] = useState('')
    const [productPrice,setProductPrice] = useState('')
    const [productDescription,setProductDescription] = useState('')
    const [productImage,setProductImage] = useState('')

    async function handleLogin(e) {
        e.preventDefault();
        try{
         const response = await axios.post('/login', {
                'email': email,
                'password': password
            },
            {
              withCredentials: true,
          },{
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            alert('Login Successful!');
            console.log("response - ",response.data)
        }
        catch(e){
            alert('Some error')
        }

    }

    return (
        <div>
               <Navbar/>
             <form onSubmit={handleLogin}>
  <div style={{'display':'flex','flexDirection':'column','marginTop':'20px'}}>
    <label for="staticEmail2">Product Name</label>
    <input type="text" id="staticEmail2" value={email} placeholder="Email" onChange={e=>setEmail(e.target.value)}>
    </input>
  </div>
  <div style={{'display':'flex','flexDirection':'column'}}>
    <label for="inputPassword2">Password</label>
    <input type="password" id="inputPassword2" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}></input>
  </div>
  <div style={{'display':'flex','flexDirection':'column','marginTop':'20px'}}>
    <label for="staticEmail2">Product Name</label>
    <input type="text" id="staticEmail2" value={email} placeholder="Email" onChange={e=>setEmail(e.target.value)}>
    </input>
  </div>
  <div style={{'display':'flex','flexDirection':'column','marginTop':'20px'}}>
    <label for="staticEmail2">Product Name</label>
    <input type="file" id="staticEmail2" value={email} placeholder="Email" onChange={e=>setEmail(e.target.value)}>
    </input>
  </div>
  <div>
    <button type="submit" className="login-btn">Login</button>
  </div>
</form>
        </div>
    )
}