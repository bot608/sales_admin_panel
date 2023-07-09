import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const ProductEdit = () => {
    const token = localStorage.getItem("token");
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setproduct] = useState({});

    useEffect(() => {
        if(!token){
            navigate("/");
        }else{
            fetch("http://localhost:5000/api/product/" + id,{
            method:"GET",
            headers:{"token":"Bearer "+token},
          }).then((res) => {
            return res.json();
        }).then((resp) => {
            console.log(resp);
            setProductId(resp.Product._id);
            setName(resp.Product.name);
            setQuantity(resp.Product.quantity);
            setMrp(resp.Product.mrp);
            setBrand(resp.Product.brand);
            setPrice(resp.Product.selling_price);
            setStock(resp.Product.stock);

        }).catch((err) => {
            console.log(err.message);
        })

        }

        
    }, []);

    const [productid,setProductId] = useState("");
    const[name,setName]=useState("");
    const[quantity,setQuantity]=useState("");
    const[mrp,setMrp]=useState("");
    const[brand,setBrand]=useState("");
    const [price,setPrice] =useState("");
    const[stock,setStock]=useState();
    const[validation,valchange]=useState(false);
    


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

      fetch("http://localhost:5000/api/product/"+productid,{
        method:"PUT",
        headers:{"token":"Bearer "+token},
        body:JSON.stringify(body)
      }).then((res)=>{
        alert('Saved successfully.')
        navigate('/');
      }).catch((err)=>{
        console.log(err.message)
      })

    }
    return ( 
        <div>

        <div className="row">
            <div className="offset-lg-3 col-lg-6">
                <form className="container" onSubmit={handlesubmit} >

                    <div className="card" style={{"textAlign":"left"}}>
                        <div className="card-title">
                            <h2>Product Edit</h2>
                        </div>
                        <div className="card-body">

                        <div className="row">


                            <div className="col-lg-12" >
                                <div className="form-group">
                                    <label>Name</label>
                                    <input placeholder="Product Name" required value={name} onChange={e=>setName(e.target.value)} className="form-control"></input>
                                
                                </div>
                            </div>

                            <div className="col-lg-12" style={{marginTop:"20px"}}>
                                <div className="form-group">
                                    <label>Quantity (in grams or kgs)</label>
                                    <input placeholder="example - 250 gram or 1 kg" value={quantity} onChange={e=>setQuantity(e.target.value)} className="form-control"></input>
                                </div>
                            </div>

                            <div className="col-lg-12" style={{marginTop:"20px"}}>
                                <div className="form-group">
                                    <label>MRP</label>
                                    <input placeholder="Maximum Retail Price" value={mrp} onChange={e=>setMrp(e.target.value)} className="form-control"></input>
                                </div>
                            </div>

                            <div className="col-lg-12" style={{marginTop:"20px"}}>
                            <div className="form-group">
                                    <label>Brand</label>
                                    <input placeholder="Brand Name" value={brand} onChange={e=>setBrand(e.target.value)} className="form-control"></input>
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
                                <button className="btn btn-success" type="submit">Save Product</button>
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
 
export default ProductEdit;