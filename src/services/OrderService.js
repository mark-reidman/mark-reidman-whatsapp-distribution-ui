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

    async notify(order) {
        try {
            const res = await axios.post(SERVER_URL + '/order/notify', order, {withCredentials: !IS_DEV_MODE})
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

    async getOrderCost(order_id) {
        try {
            const res = await axios.get(SERVER_URL + '/order/' + order_id + "/cost", {withCredentials: !IS_DEV_MODE})
            return res;
        } catch(e) {
            console.log(e)
        }
    }

    async getOrderDistributionLists(order_id) {
        try {
            const res = await axios.get(SERVER_URL + '/order/' + order_id + "/distributionlist", {withCredentials: !IS_DEV_MODE})
            return res;
        } catch(e) {
            console.log(e)
        }
    }

    async getAllDistributionLists() {
        try {
            const res = await axios.get(SERVER_URL + '/order/alldistributionlist', {withCredentials: !IS_DEV_MODE})
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
            console.error(e)
        }
    }

    async getAllOrdersSimple() {
        try {
            const res = await axios.get(SERVER_URL + '/order/all/simple', {withCredentials: !IS_DEV_MODE})
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

    async sendTestMessage(order) {
        try {
            const res = await axios.post(SERVER_URL + '/order/test', order, {withCredentials: !IS_DEV_MODE})
            return res;
        } catch(e) {
            console.log(e)
        }
    }

    async getOrdersStat(order_id) {
        try {
            const res = await axios.get(SERVER_URL + '/order/' + order_id  + '/statistics', {withCredentials: !IS_DEV_MODE})
            return res;
        } catch(e) {
            console.log(e)
        }
    }

    async getOrdersStatAgg(order_id, agg) {
        try {
            const res = await axios.get(SERVER_URL + '/order/' + order_id  + '/statistics/' + agg, {withCredentials: !IS_DEV_MODE})
            return res;
        } catch(e) {
            console.log(e)
        }
    }

    async getOrdersInvite(order_id) {
        try {
            const res = await axios.get(SERVER_URL + '/order/' + order_id  + '/invite', {withCredentials: !IS_DEV_MODE})
            return res;
        } catch(e) {
            console.log(e)
        }
    }

    async assignOrderByInviteLink(code) {
        try {
            const res = await axios.get(SERVER_URL + '/order/invite/' + code, {withCredentials: !IS_DEV_MODE})
            return res;
        } catch(e) {
            console.log(e)
        }
    }

    async stop_campaign(campaign_id) {
        try {
            const res = await axios.post(SERVER_URL + '/cron/stop/' + campaign_id, {}, {withCredentials: !IS_DEV_MODE})
            return res;
        } catch(e) {
            console.log(e)
        }
    }

    async start_campaign(campaign_id) {
        try {
            const res = await axios.post(SERVER_URL + '/cron/start/' + campaign_id, {}, {withCredentials: !IS_DEV_MODE})
            return res;
        } catch(e) {
            console.log(e)
        }
    }

    async delete_campaign(campaign_id) {
        try {
            const res = await axios.post(SERVER_URL + '/cron/delete/' + campaign_id, {} ,{withCredentials: !IS_DEV_MODE})
            return res;
        } catch(e) {
            console.log(e)
        }
    }
  }
