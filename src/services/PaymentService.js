import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_API_URL;
const IS_DEV_MODE = true;

export class PaymentService {
    constructor() {
      this.checkPromotioncode = this.checkPromotioncode.bind(this);
      this.getPromotionStatus = this.getPromotionStatus.bind(this);
    }
  
    async checkPromotioncode(code) {
        try {
            const res = await axios.get(SERVER_URL + '/payment/promo/check/' + code, {withCredentials: !IS_DEV_MODE})
            return res;
        } catch(e) {
            console.log(e)
        }
    }

    async getPromotionStatus(code) {
        try {
            const res = await axios.post(SERVER_URL + '/payment/promo/' + code, {withCredentials: !IS_DEV_MODE})
            return res;
        } catch(e) {
            console.log(e)
        }
    }
  }