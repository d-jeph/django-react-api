import  React, { Component } from  'react';
import  OrdersService  from  './OrdersService';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Redirect } from 'react-router'

const  ordersService  =  new  OrdersService();


class  OrdersList  extends  Component {
    constructor(props) {
        super(props);
        this.state  = {
            orders: [],
            modal: false,
            order_detail:[],
            order_id:null,
            redirectToIndex: false
        };
        this.handleDelete  =  this.handleDelete.bind(this);
        this.toggle = this.toggle.bind(this);
    }

      toggle() {
        this.setState({
          modal: !this.state.modal
        });
      }

    componentDidMount() {
    var  self  =  this;
    ordersService.getOrders().then(function (result) {
        console.log(result);
        self.setState({ orders:result})
    });
    }
    handleModal(e,pk,order_detail){
        this.setState({
            order_detail:order_detail,
            order_id:pk
        });
        this.toggle();
    }
	
	handleDelete(e,pk){
    var  self  =  this;
    ordersService.deleteOrder({pk : pk}).then(()=>{
        //return self.state.filter((product)=>product.pk !== pk);
        var  newArr  =  self.state.orders.filter(function(obj) {
            return  obj.pk  !==  pk;
        });
    this.setState({orders: newArr,redirectToIndex: true});
    alert("order deleted!");
    });
	}

	render() {
        const redirectToIndex = this.state.redirectToIndex;
        if (redirectToIndex === true) {
            window.location.reload();
        }
    return (
        <div  className="orders--list">
             <a  className="nav-item nav-link btn btn-info text-center"  href="/orders/new">Create New Order</a>
            <table  className="table">
            <thead  key="thead">
            <tr>
                <th>#</th>
                <th>Order Date</th>
                <th>Headquarter</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {this.state.orders.map((c,i)  =>
                <tr  key={c.id}>
                <td key={ i} >{i+1}  </td>
                <td key={ i}>{c.order_date_human}</td>
                <td key={ i}>{ c.headquarter==null ? <i>"Unknown"</i>:c.headquarter.name}</td>
                <td key={ i}>
                
                <button class='btn btn-success mr-1' onClick={(e)=>  this.handleModal(e,c.id,c.order_detail) }> Order Detail</button>
                <button class='btn btn-danger mr-1' onClick={(e)=>  this.handleDelete(e,c.id) }> Delete</button>
                </td>
            </tr>)}
            </tbody>
            </table>

            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
              <ModalHeader toggle={this.toggle}>Order Detail for Order No: {this.state.order_id} </ModalHeader>
              <ModalBody>
                 <table  className="table">
            <thead  key="thead">
            <tr>
                <th>#</th>
                <th>Product</th>
                <th>Product Quanity</th>
            </tr>
            </thead>
            <tbody>
            {this.state.order_detail.map((od,i)  =>
                <tr  key={od.id}>
                <td key={ i}>{i+1}</td>
                <td key={ i}>{od.product==null ?<i>"Unknown"</i>:od.product.name}</td>
                <td key={ i}>{od.product_quantity}</td>
            </tr>)}
            </tbody>
            </table>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={this.toggle}>Close</Button>
              </ModalFooter>
            </Modal>

           
        </div>
        );
  }

}
export  default  OrdersList;