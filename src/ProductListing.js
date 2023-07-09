import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ProductListing = () => {
    const token = localStorage.getItem("token");
    const [product,setProducts] = useState(null)
    const navigate = useNavigate();
    const LoadEdit = (id) => {
        navigate("http://localhost:3000/product/edit/" + id);
    }
    const Removefunction = (id) => {
        if (window.confirm('Do you want to remove?')) {
            fetch("http://localhost:5000/api/product/" + id, {
                method: "DELETE",
                headers:{"token":"Bearer "+token}
            }).then((res) => {
                alert('Removed successfully.')
                window.location.reload();
            }).catch((err) => {
                console.log(err.message)
            })
        }
    }




    useEffect(() => {
        if(!token){
            navigate("/");
        }else{
            fetch("http://localhost:5000/api/product",{
            method:"GET",
            headers:{"token":"Bearer "+token}
          }).then((res) => {
            return res.json();
        }).then((resp) => {
            setProducts(resp.Products);
            console.log(resp.Products);
        }).catch((err) => {
            console.log(err.message);
        })

        }
        
    }, [])
    const Logout = ()=>{
        localStorage.removeItem("token");
        navigate("/");
    }
    return (
        <div className="container" style = {{marginTop:"40px"}}>
            <div className="card">
                <div className="card-title" style ={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:20}}>
                    <h2>Product Listing</h2>
                    <button onClick ={Logout}>Logout</button>
                </div>
                <div className="card-body">
                    <div className="divbtn" style={{marginBottom:"10px"}}>
                        <Link to="/product/create" className="btn btn-success">Add New Product (+)</Link>
                    </div>
                    <div className="divbtn" style={{marginBottom:"10px"}}>
                        <Link to="/customer/create" className="btn btn-success">Add Customer(+)</Link>
                    </div>
                    <table className="table table-bordered">
                        <thead className="bg-dark text-white">
                            <tr>
                                <td>Name</td>
                                <td>Quantity</td>
                                <td>MRP</td>
                                <td>Brand</td>
                                <td>Selling Price</td>
                                <td>Stock</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>

                            {product &&
                                product?.map(item => (
                                    <tr key={item._id}>
                                        <td>{item.name}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.mrp}</td>
                                        <td>{item.brand}</td>
                                        <td>{item.selling_price}</td>
                                        <td>{item.stock}</td>
                                        <td><Link to = {`/product/edit/${item._id}`}><a  className="btn btn-success">Edit</a></Link>
                                            <a onClick={() => { Removefunction(item._id) }} className="btn btn-danger">Remove</a>
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
}

export default ProductListing;