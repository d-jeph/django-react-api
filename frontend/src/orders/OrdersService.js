import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class ordersService{

    // constructor(){}


    getOrders() {
        const url = `${API_URL}/api/orders/`;
        return axios.get(url).then(response => response.data);
    }  
    getOrdersByURL(link){
        const url = `${API_URL}${link}`;
        return axios.get(url).then(response => response.data);
    }
    getOrder(pk) {
        const url = `${API_URL}/api/orders/${pk}`;
        return axios.get(url).then(response => response.data);
    }
    deleteOrder(order){
        const url = `${API_URL}/api/orders/${order.pk}/`;
        return axios.delete(url);
    }
    createOrder(order){
        const url = `${API_URL}/api/orders/create/`;
        return axios.post(url,order);
    }
    updateOrder(product){
        const url = `${API_URL}/api/orders/${product.pk}/`;
        return axios.put(url,product);
    }

    getHqs(){
        const url = `${API_URL}/api/orders/hqs/`;
        return axios.get(url).then(response => response.data);
    }
}