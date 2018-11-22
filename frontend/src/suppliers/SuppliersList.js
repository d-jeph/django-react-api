import  React, { Component } from  'react';
import  SuppliersService  from  './SuppliersService';
import 'react-toastify/dist/ReactToastify.css';

const  suppliersService  =  new  SuppliersService();

class  SuppliersList  extends  Component {
    constructor(props) {
        super(props);
        this.state  = {
            suppliers: [],
            notify:false,
            //redirectToIndex: false
        };
        this.handleDelete  =  this.handleDelete.bind(this);
    }

    componentDidMount() {
    var  self  =  this;
    suppliersService.getSuppliers().then(function (result) {
        console.log(result);
        self.setState({ suppliers:result})
    });
    }
	
	handleDelete(e,pk){
    var  self  =  this;
    suppliersService.deleteSupplier({pk : pk}).then(()=>{
        var  newArr  =  self.state.suppliers.filter(function(obj) {
            return  obj.pk  !==  pk;
        });
        self.setState({suppliers: newArr});
        alert("supplier deleted!");

    });
	}

	render() {

    return (
        <div  className="suppliers--list">
             <a  className="nav-item nav-link btn btn-info text-center"  href="/suppliers/new">Add New Supplier</a>
            <table  className="table">
            <thead  key="thead">
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {this.state.suppliers.map( (c,i)  =>
                <tr  key={c.id}>
                <td key={ i} >{c.id}  </td>
                <td key={ i}>{c.name}</td>
                <td key={ i}>
                <a class='btn btn-primary mr-1' href={"/suppliers/" + c.id+"/"}> Update</a>
                <button class='btn btn-danger mr-1' onClick={(e)=>  this.handleDelete(e,c.id) }> Delete</button>
                </td>
            </tr>)}
            </tbody>
            </table>
        </div>
        );
  }

}
export  default  SuppliersList;