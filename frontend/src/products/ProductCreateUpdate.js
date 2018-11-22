import React, { Component } from 'react';
import  ProductsService  from  './ProductsService';
import { Redirect } from 'react-router'

const  productsService  =  new  ProductsService();

class ProductCreateUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToIndex: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
      }

      componentDidMount(){
        const { match: { params } } = this.props;
        if(params && params.pk)
        {
          productsService.getProduct(params.pk).then((c)=>{
             console.log('REFS', this.refs.name);
            this.refs.name.value = c.name;
            this.refs.supplier.value = c.supplier;
           
          })
        }
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
            "supplier": this.refs.supplier.value
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
          <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>
              Product Name:</label>
              <input className="form-control" type="text" ref='name' />

            <label>
              Supplier:</label>
              <input className="form-control" type="number" ref='supplier'/>

            <input className="btn btn-primary" type="submit" value="Submit" />
            </div>
          </form>
        );
      }  
}

export default ProductCreateUpdate;