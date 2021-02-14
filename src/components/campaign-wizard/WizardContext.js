import React, { useReducer, createContext } from "react";
import {OrderService} from '../../services/OrderService.js'

export const WizardContext = React.createContext();


const initialState = {
    campaignId: null,
    campaignField: "",
    campaignStatus: "NEW",
    campaignName: "",
    distributionList: {},
    campaignMessage: "",
    campaignStartDate: null,
    campaignOwnerEmail: null,
    campaignPhoneType: null,
    campaignPhoneNumber: null,
    campaignPhoneKey: null,
    campaignTotalCost: 0.0,
    campaignSignature: null,
    campaignPaymentMethod: null,
    campaignPaymentId: null,
    campaignTestNumberOne: null,
    campaignTestNumberTwo: null,
    campaignTestNumberThree: null
};

export const actionTypes = {
    setCampaignId: 'setCampaignId',
    setcampaignField: 'setcampaignField',
    setCampaignStatus: 'setCampaignStatus',
    setCampaignName: 'setCampaignName',
    setDistributionList: 'setDistributionList',
    setCampaignMessage: 'setCampaignMessage',
    setCampaignStartDate: 'setCampaignStartDate',
    setCampaignOwnerEmail: 'setCampaignOwnerEmail',
    setCampaignPhoneType: 'setCampaignPhoneType',
    setCampaignPhoneNumber: 'setCampaignPhoneNumber',
    setCampaignPhoneKey: 'setCampaignPhoneKey',
    setCampaignTotalCost: 'setCampaignTotalCost',
    setCampaignSignature: 'setCampaignSignature',
    setCampaignPaymentMethod: 'setCampaignPaymentMethod',
    setCampaignPaymentId: 'setCampaignPaymentId',
    setCampaignTestNumberOne: "setCampaignTestNumberOne",
    setCampaignTestNumberTwo: "setCampaignTestNumberTwo",
    setCampaignTestNumberThree: "setCampaignTestNumberThree",
  }

// return {
//   setCampaignStatus: state.contacts.filter(
//     contact => contact.id !== action.payload
//   )
// };

const orderService = new OrderService()

const reducer = (state, action) => {
    console.log(action)
    console.log(state)
    let new_state = {}
    switch (action.type) {
        case actionTypes.setCampaignId:
            new_state = {...state, 
                campaignId: action.payload
            };
            break;
        case actionTypes.setcampaignField:
            new_state = {...state, 
                campaignField: action.payload
            };
            break;
        case actionTypes.setCampaignStatus:
            new_state =  {...state, 
                campaignStatus: action.payload
            };
            break;
        case actionTypes.setCampaignName:
            new_state =  {...state, 
                campaignName: action.payload
            };
            break;
        case actionTypes.setDistributionList:
            new_state =  {...state, 
                distributionList: action.payload
            };
            break;
        case actionTypes.setCampaignMessage:
            new_state =  {...state, 
                campaignMessage: action.payload
            };
            break;
        case actionTypes.setCampaignStartDate:
            new_state =  {...state, 
                campaignStartDate: action.payload
            };
            break;
        case actionTypes.setCampaignOwnerEmail:
            new_state =  {...state, 
                campaignOwnerEmail: action.payload
            };
            break;
        case actionTypes.setCampaignPhoneType:
            new_state =  {...state, 
                campaignPhoneType: action.payload
            };
            break;
        case actionTypes.setCampaignPhoneNumber:
            new_state =  {...state, 
                campaignPhoneNumber: action.payload
            };
            break;
        case actionTypes.setCampaignPhoneKey:
            new_state =  {...state, 
                campaignPhoneKey: action.payload
            };
            break;
        case actionTypes.setCampaignTotalCost:
            new_state =  {...state, 
                campaignTotalCost: action.payload
            };
            break;  
        case actionTypes.setCampaignSignature:
            new_state =  {...state, 
                campaignSignature: action.payload
            };
            break;
        case actionTypes.setCampaignPaymentMethod:
            new_state =  {...state, 
                campaignPaymentMethod: action.payload
            };
            break;  
        case actionTypes.setCampaignPaymentId:
            new_state =  {...state, 
                campaignPaymentId: action.payload
            };
            break;
        case actionTypes.setCampaignTestNumberOne:
            new_state =  {...state, 
                campaignTestNumberOne: action.payload
            };
            break;
        case actionTypes.setCampaignTestNumberTwo:
            new_state =  {...state, 
                campaignTestNumberTwo: action.payload
            };
            break;
        case actionTypes.setCampaignTestNumberThree:
            new_state =  {...state, 
                campaignTestNumberThree: action.payload
            };
            break;                                                                    
      default:
        new_state = state;
        console.log("Unrecognized reduce operation: " + action.type)
    }

    if (new_state.campaignId !== null && new_state.campaignId !== undefined) {
        orderService.updateOrder(new_state);
    }
    return new_state;
};

 export const WizardContextProvider = props => {
    const [state, dispatch] = useReducer(reducer, initialState);
  
    return (
      <WizardContext.Provider value={[state, dispatch]}>
        {props.children}
      </WizardContext.Provider>
    );
};
