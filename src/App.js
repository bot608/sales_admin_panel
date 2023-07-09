import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import Login from './Login';
import ProductListing from './ProductListing';
import ProductCreate from './ProductCreate';
import ProductEdit from './ProductEdit';
import BrandCreate from './BrandCreate';
import AddCustomer from './AddCustomer';

function App() {
  
  return (
    <div className="App">
      
      <h1 style ={{textAlign:"center"}}>Sales App Admin Panel</h1>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Login/>}></Route>
          <Route path='product' exact element={<ProductListing />}></Route>
          <Route path='customer/create' exact element={<AddCustomer />}></Route>
          <Route path='product/create' exact element={<ProductCreate />}></Route>
          <Route path='product/create/brand' exact element={<BrandCreate />}></Route>
          <Route path='product/edit/:id' exact element={<ProductEdit />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );

}

export default App;
