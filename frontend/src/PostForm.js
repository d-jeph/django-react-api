import React, {Component} from 'react';
import {connect} from 'react-redux';

class ProductPostForm extends Component {
	handleSubmit = (e) => {
		e.preventDefault();
		const name = this.getName.value;
		const supplier = this.getSupplier.value;
		const data = {
			id: new Date(),
			name,
			supplier
		}
		this.props.dispatch({
			type: 'ADD_PRODUCT',
			data
		});
		this.getName.value = '';
		this.getSupplier.value = '';
	}
	render() {
		return ( <div><h1> Create Post</h1> 
			<form onSubmit = {this.handleSubmit}>
			<input required type = "text"ref = {(input) => this.getName = input}
			placeholder = "Product name" />
			<br/><br/>
			<input required type = "number"ref = {(input) => this.getSupplier = input}
			placeholder = "Supplier id"/>
			<br/> <br/>
			<button> Post </button> 
			</form> 
			</div>
		);
	}
}

export default connect()(ProductPostForm);
// export default ProductPostForm;