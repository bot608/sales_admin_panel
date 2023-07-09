import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const ProductCreate = () => {

   const token  =localStorage.getItem("token");
    
    const[id,idchange]=useState("");
    const[name,namechange]=useState("");
    const[quantity,setQuantity]=useState();
    const[mrp,setMrp]=useState("");
    const[brand,setBrand]=useState("");
    const [price,setPrice] =useState("");
    const[stock,setStock]=useState();
    const[validation,valchange]=useState(false);
    const [errorQuantity,seterrorQuantity]= useState(false);
    const [errorMrp,seterrorMrp]= useState(false);
    
    


    const navigate=useNavigate();

    useEffect(() => {
        if(!token){
            navigate("/");
        }
    }, [])
    

    const handlesubmit=(e)=>{
      e.preventDefault();
      const body = {
        name:name,
        quantity:quantity,
        brand:brand,
        mrp:mrp,
        selling_price:price,
        stock:stock,
      }
      fetch("http://localhost:5000/api/product/create",{
        method:"POST",
        headers:{"content-type":"application/json","token":"Bearer "+token},
        body:JSON.stringify(body)
      }).then((res)=>{
        alert('Saved successfully.')
        navigate('/');
      }).catch((err)=>{
        console.log(err.message)
      })

    }
    const handleQuantity = (e)=>{
        const value  = Number(e.target.value);
        if(value){
            setQuantity(e.target.value);
            seterrorQuantity(false)
        }else{
            setQuantity();
            seterrorQuantity(true);
        }

    }
    const handleMrp = (e)=>{
        const val  = Number(e.target.value);
        if(val){
            setMrp(val);
            seterrorMrp(false)
        }else{
            setMrp();
            seterrorMrp(true);
        }
    }
    return (
        <div>

            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <form className="container" onSubmit={handlesubmit}>

                        <div className="card" style={{"textAlign":"left"}}>
                            <div className="card-title" style ={{textAlign:"center"}}>
                                <h2>Product Create</h2>
                                
                            </div>
                            <div className="card-body">

                                <div className="row">

                                <div className="divbtn" style={{marginBottom:"10px"}}>
                        <Link to="/product/create/brand" className="btn btn-success">Add Brand(+)</Link>
                    </div>
                   
                                    <div className="col-lg-12" >
                                        
                                        <div className="form-group">
                                            <label>Name</label>
                                            <input placeholder="Product Name" required value={name} onMouseDown={e=>valchange(true)} onChange={e=>namechange(e.target.value)} className="form-control"></input>
                                        {name.length==0 && validation && <span className="text-danger">Enter the name</span>}
                                        </div>
                                    </div>

                                    <div className="col-lg-12" style={{marginTop:"20px"}}>
                                        <div className="form-group">
                                            <label>Quantity (in grams or kgs)</label>
                                            <div style={{display:"flex",justifyContent:"space-evenly"}}>
                                            <input placeholder="example - 250 gram or 1 kg" value={quantity} onChange={e=>handleQuantity(e)} className="form-control"></input>
                                           
                                            <select>
                                                <option>Kg</option>
                                                <option>grams</option>
                                            </select>
                                            </div>
                                            { errorQuantity && <span className="text-danger">Please Enter a Valid Number!</span>}
                                        </div>
                                    </div>

                                    <div className="col-lg-12" style={{marginTop:"20px"}}>
                                        <div className="form-group">
                                            <label>MRP</label>
                                            <input placeholder="Maximum Retail Price" value={mrp} onChange={e=>handleMrp(e)} className="form-control"></input>
                                            { errorMrp && <span className="text-danger">Please Enter a Valid Number!</span>}
                                        </div>
                                    </div>

                                    <div className="col-lg-12" style={{marginTop:"20px"}}>
                                    <div className="form-group">
                                            <label>Brand</label>
                                            <div>                                            
                                                <select style={{width:"100%" ,border:"1px solid grey"}}>
                                                    <option>Brands</option>
                                                    <option>Brands</option>
                                                </select>
                                            </div>
                                    </div>
                                    </div>
                                    <div className="col-lg-12" style={{marginTop:"20px"}}>
                                    <div className="form-group">
                                            <label>Price</label>
                                            <input  placeholder="Selling Price" value={price} onChange={e=>setPrice(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>
                                    <div className="col-lg-12" style={{marginTop:"20px"}}>
                                    <div className="form-group">
                                            <label>In Stock</label>
                                            <input placeholder="Stock Available" value={stock} onChange={e=>setStock(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>

                                    <div className="col-lg-12" style={{marginTop:"20px"}}>
                                        <div className="form-group">
                                           <button className="btn btn-success" type="submit">Add Product</button>
                                           <Link to="/" className="btn btn-danger">Back</Link>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </form>

                </div>
            </div>
        </div>
    );
}

export default ProductCreate;