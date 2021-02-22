import React, { useEffect, useState, useContext } from "react";
import {OrderService} from '../../services/OrderService.js'
// reactstrap components
import {Row, Col, Container, Button, Table, Spinner } from "reactstrap";
import {WizardContext, actionTypes} from '../campaign-wizard/WizardContext.js'
import { useHistory } from "react-router-dom";

// Core Components

const MyCampaignsTable = ({ }) => {
    const [errorMessage, setErrorMessage] = useState("");
    const [campaigns, setCampaigns] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOrderLoadingID, setIsOrderLoadingID] = useState(null);
    const [state, dispatch] = useContext(WizardContext);

    const history = useHistory();

    useEffect(() => {
        let service = new OrderService();
        setIsLoading(true);

        service.getAllOrders().then((res) => { 
            setCampaigns(res.data);
            setIsLoading(false);
        });
     },[]);
    
     const statesTransalte = (status) => {
        switch (status) {
            case "NEW": return "חדש"
            default: return status
        }
     }

     const continueCampaign = (item) => {
        dispatch({type: actionTypes.setCampaignId, payload: item["id"], triggerUpdate:false })
        dispatch({type: actionTypes.setcampaignField, payload: item["field"], triggerUpdate:false })
        dispatch({type: actionTypes.setCampaignStatus, payload: item["status"], triggerUpdate:false })
        dispatch({type: actionTypes.setCampaignName, payload: item["name"], triggerUpdate:false })
        dispatch({type: actionTypes.setCampaignMessage, payload: item["message"], triggerUpdate:false })
        dispatch({type: actionTypes.setCampaignStartDate, payload: new Date(item["start_date"]), triggerUpdate:false })
        dispatch({type: actionTypes.setCampaignOwnerEmail, payload: item["owner_email"], triggerUpdate:false })
        dispatch({type: actionTypes.setCampaignPhoneType, payload: item["phone_type"], triggerUpdate:false })
        dispatch({type: actionTypes.setCampaignPhoneNumber, payload: item["phone_number"], triggerUpdate:false })
        dispatch({type: actionTypes.setCampaignPhoneKey, payload: item["phone_key"], triggerUpdate:false })
        dispatch({type: actionTypes.setCampaignTotalCost, payload: item["total_cost"], triggerUpdate:false })
        dispatch({type: actionTypes.setCampaignSignature, payload: item["signature"], triggerUpdate:false })
        dispatch({type: actionTypes.setCampaignPaymentMethod, payload: item["payment_method"], triggerUpdate:false })
        dispatch({type: actionTypes.setCampaignPaymentId, payload: item["payment_id"], triggerUpdate:false })
        dispatch({type: actionTypes.setCampaignTestNumberOne, payload: item["test_number_one"], triggerUpdate:false })
        dispatch({type: actionTypes.setCampaignTestNumberTwo, payload: item["test_number_two"], triggerUpdate:false })
        dispatch({type: actionTypes.setCampaignTestNumberThree, payload: item["test_number_three"], triggerUpdate:false })

        let service = new OrderService();
        setIsOrderLoadingID(item["id"]);

        service.getOrderDistributionLists(item["id"]).then((res) => { 
            let filePhoneLists = [];
            let copyPasteLists = [];
            
            res.data.map((lst) => {
                if (lst["list_type"] == "files"){
                    filePhoneLists.push({"fileType": lst["file_type"] ,"fileName": lst["file_name"], "column": lst["file_column"], "data": lst["phones"], "id": lst["id"]})
                }
                else if(lst["list_type"] == "copyPaste") {
                    copyPasteLists.push({"data": lst["phones"], id: lst["id"]})
                }
            });
            let distributionList = {"copyPaste": copyPasteLists, "files": filePhoneLists};
            
            dispatch({type: actionTypes.setDistributionList, payload: distributionList, triggerUpdate:false })
            setIsOrderLoadingID(null);
            history.push({pathname: "/new-campaign"});
        });

        // load all campaign data as it formed in JS 
        // store it in context
        // open wizard + navigate to last page page
     }


    return (
        <>
    <div className="tables-2 mb-5">
        <Container fluid>
          <Row>
            <Col className="mx-auto text-center" md="6">
                <h3 className="display-3"> {isLoading ? <Spinner color="" type="border" size="lg"></Spinner> : <></>} קמפיינים פעילים </h3>
                 { campaigns.length > 0 ?
                    <p className="lead">
                        המשך מהיכן שהפסקת בפעם האחרונה
                    </p>
                    :
                    <p></p>
                }
            </Col>
          </Row>
          <Row>
            <Col className="mx-auto" md="8">
                
                <Table className="table-pricing align-center" responsive>
                    <thead className="text-primary">
                        <tr className="bg-primary text-white">
                            <th></th>
                            <th>תאריך עידכון</th>
                            <th>תאריך התחלה</th>
                            <th>נמענים</th>
                            <th>סטאטוס</th>
                            <th>מס קמפיין</th>
                            <th>שם קמפיין</th>
                        </tr>
                    </thead>
                    <tbody>
                        {campaigns.map((item, index) => {
                            return (<tr key={String(index)}>
                                        <td>
                                            <Button
                                            color="success"
                                            onClick={(e) => continueCampaign(item)}
                                            size="sm"
                                            >
                                                {isOrderLoadingID == item["id"] ? <Spinner color="" type="grow" size="sm"></Spinner> : <></>}
                                                {isOrderLoadingID == item["id"] ? "טוען" : "המשך"  }
                                            
                                            </Button>
                                        </td>
                                        <td>{item["update_date"]}</td>
                                        <td>{item["start_adte"]}</td>
                                        <td>{item["phones_count"]}</td>
                                        <td>{statesTransalte(item["status"])}</td>
                                        <td>{item["id"]}</td>
                                        <td>{item["name"]}</td>
                                        
                            </tr>)
                        })
                        }
                    </tbody>
                </Table>
                
            </Col>
          </Row>
        </Container>
      </div>
    </>
    );
}

export default MyCampaignsTable;
