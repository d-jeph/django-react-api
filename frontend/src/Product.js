import React, { Component } from 'react';
import {connect} from 'react-redux';

class Product extends Component {
  render() {
  return (
    <div>
     <table><tbody>
     <tr> 
     <td>{this.props.product.name}</td> 
     <td>{this.props.product.supplier}</td>
     <td><button>Edit</button></td> 
      <td><button onClick={()=>this.props.dispatch({type:'DELETE_PRODUCT',id:this.props.product.id})}>
       Delete</button></td>
      </tr>
      </tbody>
     </table>
    </div>
  );
 }
}
export default connect()(Product);