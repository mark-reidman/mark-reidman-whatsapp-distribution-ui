import axios from 'axios';

const SERVER_URL = 'http://localhost:3000';
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
  }