import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const OrderModal= ()=> {
  return(
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
                <td key={i}>{i+1}</td>
                <td key={i}>{od.product.name}</td>
                <td key={i}>{od.product_quantity}</td>
            </tr>)}
            </tbody>
            </table>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={this.toggle}>Close</Button>
              </ModalFooter>
            </Modal>
    )
}

export default OrderModal;