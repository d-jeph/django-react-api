import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class ProductsService{

    // constructor(){}


    getProducts() {
        const url = `${API_URL}/api/products/`;
        return axios.get(url).then(response => response.data);
    }

    getSuppliers() {
        const url = `${API_URL}/api/suppliers/`;
        return axios.get(url).then(response => response.data);
    }
    
    getProductsByURL(link){
        const url = `${API_URL}${link}`;
        return axios.get(url).then(response => response.data);
    }
    getProduct(pk) {
        const url = `${API_URL}/api/products/${pk}`;
        return axios.get(url).then(response => response.data);
    }
    deleteProduct(product){
        const url = `${API_URL}/api/products/${product.pk}/`;
        return axios.delete(url);
    }
    createProduct(product){
        const url = `${API_URL}/api/products/`;
        return axios.post(url,product);
    }
    updateProduct(product){
        const url = `${API_URL}/api/products/update/${product.pk}/`;
        return axios.put(url,product);
    }
}