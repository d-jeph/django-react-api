import React, { Component } from 'react';
import { connect } from 'react-redux';
import Product from './Product';

class AllProduct extends Component {
  render() {
    return (
    <div>
      <h1>All Products</h1>
      {this.props.products.map((product) => <Product key={product.id} product={product} />)}
    </div>
    );
   }
}

const mapStateToProps = (state) => {
    return {
        products: state
    }
}
export default connect(mapStateToProps)(AllProduct);