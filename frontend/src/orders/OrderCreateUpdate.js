import React, { Component } from 'react';
import  OrdersService  from  './OrdersService';
import  ProductsService  from  '../products/ProductsService';
import { Redirect } from 'react-router'

const  ordersService  =  new  OrdersService();
const  productsService  =  new  ProductsService();

class OrderCreateUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToIndex: false,
            productSelect:[],
            hqSelect:[]

        }

        this.handleSubmit = this.handleSubmit.bind(this);
      }

      componentDidMount(){
        var  self  =  this;
        const { match: { params } } = this.props;
        if(params && params.pk && !isNaN(parseInt(params.pk)))
        {
          ordersService.getOrder(params.pk).then((c)=>{
            this.refs.hq.value = c.headquarter.name;
           
          })
        }

        productsService.getProducts().then(function (result) {
          self.setState({ productSelect:result})
        });

        ordersService.getHqs().then(function (result) {
          self.setState({ hqSelect:result})
        });

      }

      handleCreate(){
        console.log(this.refs.hq.value);
        ordersService.createOrder(
          {
            "headquarter": this.refs.hq.value,
            "products":[
              {product_id:this.refs.product.value,
              product_quantity:this.refs.product_quantity.value
            }
            ]
          }          
        ).then((result)=>{
          alert("order created!");
          this.setState({
                redirectToIndex: true,
                notify:true
            })
        }).catch(()=>{
          alert('There was an error! Please re-check your form.');
        });
      }
      handleUpdate(pk){
        ordersService.updateOrder(
          {
            "pk": pk,
            "name": this.refs.name.value,
            "supplier": this.refs.supplier.value
        }          
        ).then((result)=>{
          //console.log(result);
          alert("order updated!");
           this.setState({
                redirectToIndex: true
            })
        }).catch(()=>{
          alert('There was an error! Please re-check your form.');
        });
      }
      handleSubmit(event) {
        const { match: { params } } = this.props;

        if(params && params.pk && !isNaN(parseInt(params.pk))){
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
            return <Redirect to="/orders/" />
        }
        return (
          <div className="container">
          <h3 className="mb-4" >New Order</h3>
          <form onSubmit={this.handleSubmit}>
           <div className="form-group row">
            <label  className="col-sm-2 col-form-label">Headquarter</label>
            <div className="col-sm-10">
               {/* <input className="form-control" type="text" ref='hq' /> */}
               <select className="form-control" ref="hq" required id="exampleFormControlSelect2">
            <option value="" > -- Select --</option>
            {this.state.hqSelect.map(({id,name})=>
              <option value={id} key={id} > {name} </option>
           
          )}
           
            </select>
            </div>
          </div>
          <div className="form-group row">
          <label className="col-sm-2 col-form-label">Product</label>
          <div className="col-sm-5">
            <select className="form-control" ref="product" required id="exampleFormControlSelect2">
            <option value="" > -- Select --</option>
            {this.state.productSelect.map(({id,name})=>
              <option value={id} key={id} > {name} </option>
           
          )}
           
            </select>
          </div>
           <div className="col-sm-5">
            <input type="number" min="0" required className="form-control" id="inputPassword" ref="product_quantity" placeholder="Quantity"/>
          </div>
        </div>


          <input className="btn btn-primary pull-right" type="submit" value="Submit" />
          </form>
          </div>
        );
      }  
}

export default OrderCreateUpdate;