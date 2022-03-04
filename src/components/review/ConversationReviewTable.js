import React, { useEffect, useState, useContext} from "react";
import { OrderService } from '../../services/OrderService.js';
import { LeadService } from '../../services/LeadService.js';

// reactstrap components
import { Row, Col, Container, Button, Table, Spinner, Progress, Modal, Input, FormGroup, ButtonToggle, ButtonGroup} from "reactstrap";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
// import Label from "reactstrap/lib/Label";
import { AuthContext } from '../../oath/AuthContext.js'

// Core Components

const ConversationReviewTable = (props) => {
    const [user, setAuthUser, isLogined, setAuthIsLogined, token, setAuthToken]  = useContext(AuthContext);
    
    const [errorMessage, setErrorMessage] = useState("");
    const [conversations, setConversations] = useState([]);
    const [campaigns, setCampaigns] = useState([]);
    const [isLoading, setIsLoading] = useState(false);    
    const location = useLocation();
    const history = useHistory();
    const [isAdmin, setIsAdmin] = useState(false);
    const [isOperator, setIsOperator] = useState(false);
    const [campaignId, setCampaignId] = useState(undefined);

    const radios = [
        { name: "חיובי", value: false },
        { name: "ניטרלי", value: null },
        { name: "שלילי", value: true }
      ];
      
    useEffect(() => {
        if (user != null) {
            for (let index = 0; index < user.roles.length; ++index) {
                const element = user.roles[index];
                if (element == "ADMIN") {
                    setIsAdmin(true)
                }
                if (element == "OPERATOR") {
                    setIsOperator(true)
                }
            }
        }
        else{
            console.log("not logged in")
        }
        if(isLogined === true) {
            get_campaigns();
        }

    }, [location, user]);


    const setCampaignIdDropDown = (e) => {
        setCampaignId(e.target.value);
        get_conversations(e.target.value);
    }

    const selectIsNegativeSentimentCheckbox = (value, msg) => {
        msg["is_negative_sentiment"] = value
        setConversations(conversations => [...conversations])
        
        let service = new LeadService();
        service.updateMessageSentiment(msg["id"], msg["is_negative_sentiment"])
    }

    const get_conversations = (campaign_id) => {
        let service = new LeadService();
        setIsLoading(true);

        service.getLeadsForReview(campaign_id).then((res) => {

            setConversations(res.data);
            setIsLoading(false);
        });
    }

    const get_campaigns = () => {
        let service = new OrderService();
        setIsLoading(true);

        service.getAllOrdersSimple().then((res) => {
            setCampaigns(res.data);
            setIsLoading(false);
        });
    }

    const approveLead = (lead_id) => {      
        let service = new LeadService();
        debugger;
        service.updateLeadNeedReview(lead_id, false).then((res)=>{
            if(res.data == true){
                service.updateLeadReadyToSend(lead_id, true)
                // setConversations(conversations => [...conversations])
                get_conversations(campaignId);
            }
        });
    }

    const declineLead = (lead_id) => {
        let service = new LeadService();
        service.updateLeadNeedReview(lead_id, false).then((res)=>{
            if(res.data == true){
                service.updateLeadReadyToSend(lead_id, false)
                // setConversations(conversations => [...conversations])
                get_conversations(campaignId);
            }
        });
    }

    const showCampaignStat = (item) => {
        history.push({ pathname: "/campaign/statistics", state: { campaign: item } });
    }


    return (
        <Container fluid>
            <Row>
                <Col className="mx-auto text-center" lg="7" md="3">
                    <h3 className="display-3"> {isLoading ? <Spinner color="" type="border" size="lg"></Spinner> : <></>} בקרת לידים </h3>
                    <FormGroup>
                        <Input
                            data-trigger=""
                            id="campaign-tag"
                            name="campaign-tag"
                            value={campaignId}
                            onChange={setCampaignIdDropDown}
                            type="select"
                        >
                            <option placeholder="please select">בחר קמפיין</option>
                            {campaigns.map((item, index) => {
                                return (<option value={item["id"]}>{item["id"] + " - " + item["name"]}</option>)
                            })
                        }
                        </Input>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col className="mx-auto text-center" lg="7" md="3">
                    {conversations.length == 0 ?
                        <p className="lead">
                            אין לידים פעילים עבורך
                        </p>
                        :
                        <Table className="align-center" responsive >
                        <thead className="text-primary">
                            <tr className="bg-primary text-white">
                                <th>אישור ליד</th>
                                <th>הודעות</th>
                                <th>מס ליד</th>
                                <th>תאריך</th>
                            </tr>
                        </thead>
                        <tbody>
                            {conversations.map((item, index) => {
                                return (<tr key={String(index)}>
                                    <td style={{verticalAlign: "middle"}}>
                                        <Button
                                            color="warning"
                                            onClick={(e) => declineLead(item["lead"]["id"])}
                                            size="sm"
                                            style={{marginRight: "0"}}
                                        >
                                            דחה
                                        </Button>
                                        <br/>
                                        <br/>
                                        <Button
                                            color="success"
                                            onClick={(e) => approveLead(item["lead"]["id"])}
                                            size="sm"
                                        >
                                            אשר
                                        </Button>
                                    </td> 
                                    <td>
                                        <Table responsive>
                                            <thead>
                                            <tr>
                                                <th>סנטימנט</th>
                                                <th>טקסט</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {item["messages"].map((msg, index) => {
                                                return (
                                                    <tr key={String(index)}>
                                                    <td>
                                                        <ButtonGroup>
                                                            {radios.map((radio, index) => (
                                                            <Button
                                                                color={msg["is_negative_sentiment"] == radio.value ? "primary" : "secondary"}
                                                                size="sm"
                                                                onClick={() => selectIsNegativeSentimentCheckbox(radio.value, msg)}                                                                        
                                                            >
                                                                {radio.name}
                                                            </Button>
                                                            ))}
                                                        </ButtonGroup> 
                                                    </td>
                                                    <td style={{ verticalAlign:"middle", whiteSpace:"normal"}}>{msg["message_txt"]}</td>
                                                    </tr>
                                                )})
                                            }
                                            </tbody>
                                        </Table>
                                    </td>
                                    <td>{item["lead"]["id"]}</td>
                                    <td>{item["lead"]["create_date"].split(" ")[0]}<br/>{item["lead"]["create_date"].split(" ")[1]} </td>
                                </tr>)
                            })
                            }
                        </tbody>
                    </Table>
                    }
                </Col>
            </Row>
        </Container>
    );
}

export default ConversationReviewTable;
