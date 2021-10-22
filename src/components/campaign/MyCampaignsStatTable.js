import React, { useEffect, useState, useContext} from "react";
import { OrderService } from '../../services/OrderService.js'
// reactstrap components
import { Row, Col, Container, Button, Table, Spinner, Progress, Modal } from "reactstrap";
import { WizardContext, actionTypes } from '../campaign-wizard/WizardContext.js'
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { AuthContext } from '../../oath/AuthContext.js'


// Core Components

const MyCampaignsStatTable = ({ }) => {
    const [errorMessage, setErrorMessage] = useState("");
    const [campaigns, setCampaigns] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOrderLoadingID, setIsOrderLoadingID] = useState(null);
    const [state, dispatch] = useContext(WizardContext);
    const location = useLocation();
    const history = useHistory();
    const [isAdmin, setIsAdmin] = useState(false);
    const [isOperator, setIsOperator] = useState(false);
    const [user, setAuthUser, isLogined, setAuthIsLogined, token, setAuthToken]  = useContext(AuthContext);
    
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deleteCampaignId, setDeleteCampaignId] = useState(undefined);

    const [shareModalOpen, setShareModalOpen] = useState(false);
    const [shareCampaignLink, setShareCampaignLink] = useState("");

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
        if(isLogined === true) {
            get_orders();
        }
    }, [location]);

    const get_orders = () => {
        let service = new OrderService();
        setIsLoading(true);

        service.getAllOrders().then((res) => {
            setCampaigns(res.data);
            setIsLoading(false);
        });
    }

    const toggleSureDeleteModal = () => {
        setDeleteModalOpen(!deleteModalOpen)
    }

    const deleteCampaign = () => {
        if(deleteCampaignId != undefined) {
            toggleSureDeleteModal();

            setDeleteCampaignId(undefined);
            get_orders();
        }
        
    }

    const deleteCampaignSure = (orderid) => {
        setDeleteCampaignId(orderid);
        toggleSureDeleteModal();

    }

    const statesTransalte = (status) => {
        switch (status) {
            case "NEW": return "חדש"
            case "COMPLETED": return "הסתיים"
            case "INPROGRESS": return "בהפצה"
            default: return status
        }
    }

    const showCampaignStat = (item) => {
        history.push({ pathname: "/campaign/statistics", state: { campaign: item } });
    }

    const toggleShareModal = () => {
        setShareModalOpen(!shareModalOpen)
    }

    const copyToClipboard = (text) => {
        if ('clipboard' in navigator) {
            navigator.clipboard.writeText(text);
        } else {
            document.execCommand('copy', true, text);
        }
        toggleShareModal()
    }

    const getShareLink = (orderid) => {
        let service = new OrderService();
        
        service.getOrdersInvite(orderid).then((res) => {
            let link = window.location.origin + "/share/" + res.data.code
            setShareCampaignLink(link);
            toggleShareModal();
            
        });
    }

    return (
        <>
            <div className="tables-2 mb-5">
                <Container fluid>
                    <Row>
                        <Col className="mx-auto text-center" lg="7" md="6">
                            <h3 style={{ marginTop: "120px" }} className="display-3"> {isLoading ? <Spinner color="" type="border" size="lg"></Spinner> : <></>} קמפיינים פעילים </h3>
                            {campaigns.length == 0 ?
                                <p className="lead">
                                    אין קמפיינים פעילים עבורך
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
                                        <th>תאריך התחלה</th>
                                        <th>נמענים</th>
                                        <th>קצב התקדמות</th>
                                        <th>סטאטוס</th>
                                        <th>שם קמפיין</th>
                                        <th>מס קמפיין</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {campaigns.map((item, index) => {
                                        return (<tr key={String(index)}>
                                            <td>
                                                {/* {isAdmin ?
                                                    <Button
                                                        color="danger"
                                                        onClick={(e) => deleteCampaignSure(item["id"])}
                                                        size="sm"
                                                    >
                                                        {isOrderLoadingID == item["id"] ? <Spinner color="" type="grow" size="sm"></Spinner> : <></>}
                                                        {isOrderLoadingID == item["id"] ? "טוען" : "מחק"}

                                                    </Button>
                                                    : <></>
                                                } */}

                                                {isAdmin || isOperator ?
                                                    <Button
                                                        color="primary"
                                                        onClick={(e) => getShareLink(item["id"])}
                                                        size="sm"
                                                    >
                                                        {isOrderLoadingID == item["id"] ? <Spinner color="" type="grow" size="sm"></Spinner> : <></>}
                                                        {isOrderLoadingID == item["id"] ? "טוען" : "שתף"}

                                                    </Button>
                                                    : <></>
                                                }
                                                <Button
                                                    color="success"
                                                    onClick={(e) => showCampaignStat(item)}
                                                    size="sm"
                                                >
                                                    {isOrderLoadingID == item["id"] ? <Spinner color="" type="grow" size="sm"></Spinner> : <></>}
                                                    {isOrderLoadingID == item["id"] ? "טוען" : "מידע נוסף"}

                                                </Button>
                                            </td>
                                            {/* <td>{item["update_date"]}</td> */}
                                            <td>{item["start_date"]}</td>
                                            <td>{item["total_counter"]}</td>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <span className="completion mr-2">{item['progress']}%</span>
                                                    <div>
                                                        <Progress color="success" max="100" value={item['progress']}></Progress>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{statesTransalte(item["status"])}</td>
                                            <td>{item["name"]}</td>
                                            <td>{item["id"]}</td>

                                        </tr>)
                                    })
                                    }
                                </tbody>
                            </Table>

                        </Col>
                    </Row>
                </Container>
            </div>
        

            <Modal
                isOpen={deleteModalOpen}
                toggle={toggleSureDeleteModal}
                    className="modal-sm"
                    modalClassName=" bd-example-modal-sm"
            >
                <div className="modal-header">
                    <h5 className="modal-title float-right" id="exampleModalLabel">
                        אישור מחיקה
                    </h5>
                    <button
                        aria-label="Close"
                        className="close"
                        onClick={toggleSureDeleteModal}
                        type="button"
                    >
                        <span aria-hidden={true}>×</span>
                    </button>
                </div>
                <div className="modal-body bg-secondary">
                    <h2>אתה ממש בטוח?</h2>
                    <h4>לחץ על מחיקה על מנת למחוק קמפיין</h4>

                    <Button className="float-right" color="danger" type="button" onClick={deleteCampaign}>
                        מחיקה
                    </Button>
                    
                </div>
            </Modal>

            <Modal
                isOpen={shareModalOpen}
                toggle={toggleShareModal}
                    className="modal-dialog-centered"
            >
                <div className="modal-header">
                    <h5 className="modal-title float-right">
                        שיתוף
                    </h5>
                    <button
                        aria-label="Close"
                        className="close"
                        onClick={toggleShareModal}
                        type="button"
                    >
                        <span aria-hidden={true}>×</span>
                    </button>
                </div>
                <div className="modal-body bg-secondary">
                    <h4>לינק לשיתוף קמפיין</h4>
                    <h6>{shareCampaignLink}</h6>
                    <Button
                        style={{
                            marginLeft:
                              "10px"
                          }}
                        color="success"
                        className="float-right" type="button" 
                        onClick={(e) => copyToClipboard(shareCampaignLink)}
                 
                    >
                        העתק וסגור
                    </Button>
                    <Button className="float-right" color="default" type="button" onClick={toggleShareModal}>
                        סגור
                    </Button>
                    
                </div>
            </Modal>
        </>
    );
}

export default MyCampaignsStatTable;
