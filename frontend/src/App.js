import  React, { Component } from  'react';
import { BrowserRouter } from  'react-router-dom'
import { Route } from  'react-router-dom'
import  ProductsList  from  './products/ProductsList'
import  ProductCreateUpdate  from  './products/ProductCreateUpdate'
import  SuppliersList  from  './suppliers/SuppliersList'
import  SupplierCreateUpdate  from  './suppliers/SupplierCreateUpdate'
import  OrdersList  from  './orders/OrdersList'
import  OrderCreateUpdate  from  './orders/OrderCreateUpdate'
import  './App.css';


const  BaseLayout  = () => (
<div  className="container-fluid">
    <nav  className="navbar navbar-expand-lg navbar-light bg-light">
        <a  className="navbar-brand"  href="/">Django React App</a>
        <button  className="navbar-toggler"  type="button"  data-toggle="collapse"  data-target="#navbarNavAltMarkup"  aria-controls="navbarNavAltMarkup"  aria-expanded="false"  aria-label="Toggle navigation">
        <span  className="navbar-toggler-icon"></span>
    </button>
    <div  className="collapse navbar-collapse"  id="navbarNavAltMarkup">
        <div  className="navbar-nav">
            <a  className="nav-item nav-link"  href="/suppliers/">Suppliers</a>
            <a  className="nav-item nav-link"  href="/">Products</a>
            <a  className="nav-item nav-link"  href="/orders/">Orders</a>
            
        </div>
    </div>
    </nav>
    <div  className="content">
        <Route  path="/"  exact  component={ProductsList}  />
        <Route  path="/products/:pk"  component={ProductCreateUpdate}  />
        <Route exact path="/products/" component={ProductCreateUpdate}  />
        <Route exact path="/suppliers/" component={SuppliersList}  />
        <Route  path="/suppliers/:pk" component={SupplierCreateUpdate} />
        <Route exact path="/orders/" component={OrdersList}  />
        <Route  path="/orders/:pk" component={OrderCreateUpdate} />
    </div>
</div>
)


class  App  extends  Component {

render() {
    return (
    <BrowserRouter>
        <BaseLayout/>
    </BrowserRouter>
    );
}
}
export  default  App;