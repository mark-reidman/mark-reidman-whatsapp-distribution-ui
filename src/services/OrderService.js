import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_API_URL;
const IS_DEV_MODE = true;

export class OrderService {
    constructor() {
      this.createNewOrder = this.createNewOrder.bind(this);
      this.updateNewOrder = this.updateOrder.bind(this);
    }
  
    async createNewOrder(order) {
        try {
            const res = await axios.post(SERVER_URL + '/order/new', order, {withCredentials: !IS_DEV_MODE})
            return res;
        } catch(e) {
            console.log(e)
        }
    }

    async updateOrder(order) {
        try {
            const res = await axios.post(SERVER_URL + '/order/update', order, {withCredentials: !IS_DEV_MODE})
            return res;
        } catch(e) {
            console.log(e)
        }
    }

    async getOrder(order_id) {
        try {
            const res = await axios.get(SERVER_URL + '/order/' + order_id, {withCredentials: !IS_DEV_MODE})
            return res;
        } catch(e) {
            console.log(e)
        }
    }

    async getAllOrders() {
        try {
            const res = await axios.get(SERVER_URL + '/order/all', {withCredentials: !IS_DEV_MODE})
            return res;
        } catch(e) {
            console.log(e)
        }
    }

    async getOrdersCount() {
        try {
            const res = await axios.get(SERVER_URL + '/order/all/total', {withCredentials: !IS_DEV_MODE})
            return res;
        } catch(e) {
            console.log(e)
        }
    }


  }