const productReducer = (state = [], action) => {
	switch(action.type) {
    case 'ADD_PRODUCT':
      return state.concat([action.data]);
    case 'DELETE_PRODUCT':
      return state.filter((product)=>product.id !== action.id);
    default:
      return state;
  }

}
export default productReducer;