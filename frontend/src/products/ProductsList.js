import  React, { Component } from  'react';
import  ProductsService  from  './ProductsService';
import 'react-toastify/dist/ReactToastify.css';

const  productsService  =  new  ProductsService();


class  ProductsList  extends  Component {
    constructor(props) {
        super(props);
        this.state  = {
            products: [],
            notify:false,
            selectedSupplier: 1
        };
        this.handleDelete  =  this.handleDelete.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({selectedSupplier: event.target.value});
      }

    componentDidMount() {
    var  self  =  this;
    productsService.getProducts().then(function (result) {
        console.log(result);
        self.setState({ products:result})
    });
    }
	
	handleDelete(e,pk){
    var  self  =  this;
    productsService.deleteProduct({pk : pk}).then(()=>{
        var  newArr  =  self.state.products.filter(function(obj) {
            return  obj.pk  !==  pk;
        });
        self.setState({products: newArr});
        alert("Product deleted!");

    });
	}

	render() {

    return (
        <div  className="products--list">
             <a  className="nav-item nav-link btn btn-info text-center"  href="/products">Add New Product</a>
            <table  className="table">
            <thead  key="thead">
            <tr>
                <th>#</th>
                <th>Product</th>
                <th>Supplier</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {this.state.products.map( (c,i)  =>
                <tr  key={c.id}>
                <td key={i} >{c.id}  </td>
                <td key={i}>{c.name}</td>
                <td key={i}>{c.supplier==null? <i>"Unknown"</i> :c.supplier.name}</td>
                <td key={i}>
                <a class='btn btn-primary mr-1' href={"/products/" + c.id+"/"}> Update</a>
                <button class='btn btn-danger mr-1' onClick={(e)=>  this.handleDelete(e,c.id) }> Delete</button>
                </td>
            </tr>)}
            </tbody>
            </table>
        </div>
        );
  }

}
export  default  ProductsList;