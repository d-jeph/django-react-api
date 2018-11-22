import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class SuppliersService{

    // constructor(){}


    getSuppliers() {
        const url = `${API_URL}/api/suppliers/`;
        return axios.get(url).then(response => response.data);
    }  
    getSuppliersByURL(link){
        const url = `${API_URL}${link}`;
        return axios.get(url).then(response => response.data);
    }
    getSupplier(pk) {
        const url = `${API_URL}/api/suppliers/${pk}`;
        return axios.get(url).then(response => response.data);
    }
    deleteSupplier(supplier){
        const url = `${API_URL}/api/suppliers/${supplier.pk}/`;
        return axios.delete(url);
    }
    createSupplier(supplier){
        const url = `${API_URL}/api/suppliers/`;
        return axios.post(url,supplier);
    }
    updateSupplier(supplier){
        const url = `${API_URL}/api/suppliers/${supplier.pk}/`;
        return axios.put(url,supplier);
    }
}