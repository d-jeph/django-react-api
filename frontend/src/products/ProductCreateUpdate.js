import React, { Component } from 'react';
import  ProductsService  from  './ProductsService';
import { Redirect } from 'react-router'

const  productsService  =  new  ProductsService();

class ProductCreateUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToIndex: false,
            selectedSupplier:"",
            suppliersList:[]
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
      }

      componentDidMount(){
        const { match: { params } } = this.props;
        productsService.getSuppliers().then((c)=>{
          this.setState({
            suppliersList:c
          })
         
        })

        if(params && params.pk && !isNaN(parseInt(params.pk)))
        {
          productsService.getProduct(params.pk).then((c)=>{
            this.refs.name.value = c.name;
            //this.refs.supplier.value = c.supplier.id;
            if(c.supplier!= null){
              this.setState({
                selectedSupplier:c.supplier.id
             })
            }
            
           
          })
        }
      }
      handleChange(event) {
        this.setState({selectedSupplier: event.target.value});
      }

      handleCreate(){
        productsService.createProduct(
          {
            "name": this.refs.name.value
        }          
        ).then((result)=>{
          alert("Product created!");
          this.setState({
                redirectToIndex: true,
                notify:true
            })
        }).catch(()=>{
          alert('There was an error! Please re-check your form.');
        });
      }
      handleUpdate(pk){
        productsService.updateProduct(
          {
            "pk": pk,
            "name": this.refs.name.value,
            "supplier": this.state.selectedSupplier
        }          
        ).then((result)=>{
          //console.log(result);
          alert("Product updated!");
           this.setState({
                redirectToIndex: true,
                notify:true
            })
        }).catch(()=>{
          alert('There was an error! Please re-check your form.');
        });
      }
      handleSubmit(event) {
        const { match: { params } } = this.props;

        if(params && params.pk){
          this.handleUpdate(params.pk);
        }
        else
        {
          this.handleCreate();
        }

        event.preventDefault();
      }

      render() {
        const redirectToIndex = this.state.redirectToIndex;
        if (redirectToIndex === true) {
            return <Redirect to="/" />
        }
        return (
                  <div className="container">
                  <h3 className="mb-4" >Product</h3>
                  <form onSubmit={this.handleSubmit}>

                  <div className="form-group row">
                  <label className="col-sm-2 col-form-label">Product Name</label>
                  <div className="col-sm-10">
                    <input type="text" required className="form-control" ref="name" placeholder="name"/>
                  </div>
                  </div>

                  <div className="form-group row">
                    <label  className="col-sm-2 col-form-label">Supplier</label>
                    <div className="col-sm-10">
                      {/* <input className="form-control" type="text" ref='hq' /> */}
                    <select className="form-control" ref="supplier" required value={this.state.selectedSupplier} onChange={this.handleChange}>
                    <option value="" > -- Select --</option>
                    {this.state.suppliersList.map(({id,name})=>
                      <option value={id} key={id} > {name} </option>
                  
                  )}
                  
                    </select>
                    </div>
                  </div>


                  <input className="btn btn-primary pull-right" type="submit" value="Submit" />
                  </form>
                  </div>
        );
      }  
}

export default ProductCreateUpdate;