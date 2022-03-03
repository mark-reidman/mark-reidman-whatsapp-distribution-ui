import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_API_URL;
const IS_DEV_MODE = true;

export class LeadService {
  
    async getLeadsForReview(order_id) {
        try {
            const res = await axios.get(SERVER_URL + '/leads/campaign/' + order_id + "/review", {withCredentials: !IS_DEV_MODE})
            return res;
        } catch(e) {
            console.log(e)
        }
    }

    async updateLeadNeedReview(lead_id, need_review) {
        try {
            const res = await axios.post(SERVER_URL + '/leads/need_review', {"leadid": lead_id, "need_review": need_review}, {withCredentials: !IS_DEV_MODE})
            return res;
        } catch(e) {
            console.log(e)
        }
    }

    async updateLeadReadyToSend(lead_id, ready_to_send) {
        try {
            const res = await axios.post(SERVER_URL + '/leads/ready_to_send', {"leadid": lead_id, "ready_to_send": ready_to_send}, {withCredentials: !IS_DEV_MODE})
            return res;
        } catch(e) {
            console.log(e)
        }
    }

    async updateMessageSentiment(message_id, is_negative_sentiment) {
        try {
            const res = await axios.post(SERVER_URL + '/leads/message_sentiment', {"messageid": message_id, "is_negative_sentiment": is_negative_sentiment}, {withCredentials: !IS_DEV_MODE})
            return res;
        } catch(e) {
            console.log(e)
        }
    }
  }