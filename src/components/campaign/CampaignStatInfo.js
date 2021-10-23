import React, { useEffect, useState, useContext } from "react";
import { OrderService } from '../../services/OrderService.js'
// reactstrap components
import { Row, Col, Container, Button, Table, Spinner, Progress } from "reactstrap";
import { WizardContext, actionTypes } from '../campaign-wizard/WizardContext.js'
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Card, CardBody, CardImg, CardImgOverlay, CardTitle, CardText } from "reactstrap";
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import NumberFormat from 'react-number-format';

const CampaignStatInfo = ({ }) => {
    const [errorMessage, setErrorMessage] = useState("");
    const [campaign, setCampaign] = useState([]);
    const [campaignStat, setCampaignStat] = useState(undefined);

    const [isLoading, setIsLoading] = useState(false);
    const [isOrderLoadingID, setIsOrderLoadingID] = useState(null);
    const [state, dispatch] = useContext(WizardContext);
    const location = useLocation();
    const history = useHistory();

    const [hoverData, setHoverData] = useState(null);
    const [chartOptions, setChartOptions] = useState();


    useEffect(() => {
        let service = new OrderService();
        setIsLoading(true);

        if (location.state != undefined) {
            setCampaign(location.state.campaign)

            service.getOrdersStat(location.state.campaign.id).then((res) => {
                setCampaignStat(res.data);
                setIsLoading(false);
            });

            service.getOrdersStatAgg(location.state.campaign.id, "HH").then((res) => {
                
                res.data.series.forEach(function (series, index) {
                    series.data.forEach(function (arr, index) {
                    arr[0] = Date.parse(arr[0]);
                  });
                });
                    
                setChartOptions(res.data);
            });
        }
    }, [location]);


    const statesTransalte = (status) => {
        switch (status) {
            case "NEW": return "חדש"
            default: return status
        }
    }


    return (
        <>
            <div className="tables-2 mb-5">
                <Container >
                    <Row>
                        <Col className="mx-auto text-center" lg="7" md="6">
                            <h3 style={{ marginTop: "120px" }} className="display-3"> {isLoading ? <Spinner color="" type="border" size="lg"></Spinner> : <></>}
                                {campaign["name"]}
                            </h3>
                        </Col>
                    </Row>
                    {campaignStat != undefined ?
                    <Row>
                        <Col lg="3">
                            <Card className="bg-primary campaignStatInfoBox">
                                <div className="content">
                                    <CardTitle className="h6 text-white mb-2">סה״כ רשומות</CardTitle>
                                    <CardText className="h3 text-white font-weight-bold">
                                    <NumberFormat
                                        value={campaign["total_counter"]}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        renderText={(value, props) => <span {...props}>{value}</span>}
                                    />
                                        
                                    </CardText>
                                </div>
                            </Card>
                        </Col>
                        <Col lg="3" >
                            <Card className="bg-primary campaignStatInfoBox">
                                <div className="content">
                                    <CardTitle className="h6 text-white mb-2">הודעות ראשונות שנשלחו</CardTitle>
                                    <CardText className="h3 text-white font-weight-bold">
                                    <NumberFormat
                                        value={campaignStat["total_sent_messages"]}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        renderText={(value, props) => <span {...props}>{value}</span>}
                                    />
                                    </CardText>
                                </div>
                            </Card>
                        </Col>
                        <Col lg="3" >
                            <Card className="bg-primary campaignStatInfoBox">
                                <div className="content">
                                    <CardTitle className="h6 text-white mb-2">צפו בהודעה ראשונה</CardTitle>
                                    <CardText className="h3 text-white font-weight-bold">
                                    <NumberFormat
                                        value={campaignStat["total_sent_messages_seen"]}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        renderText={(value, props) => <span {...props}>{value}</span>}
                                    />
                                        
                                    </CardText>
                                </div>
                            </Card>
                        </Col>
                        <Col lg="3" >
                            <Card className="bg-default campaignStatInfoBox">
                                <div className="content">
                                    <CardTitle className="h6 text-white mb-2">הגיבו להודעה ראשונה</CardTitle>
                                    <CardText className="h3 text-white font-weight-bold">
                                    <NumberFormat
                                        value={campaignStat["first_response_messages"]}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        renderText={(value, props) => <span {...props}>{value}</span>}
                                    />
                                        
                                    </CardText>
                                </div>
                            </Card>
                        </Col>
                        <Col lg="3" >
                            <Card className="bg-default campaignStatInfoBox">
                                <div className="content">
                                    <CardTitle className="h6 text-white mb-2">התכתבות אחרי הודעה ראשונה</CardTitle>
                                    <CardText className="h3 text-white font-weight-bold">
                                    <NumberFormat
                                        value={campaignStat["second_response_messages"]}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        renderText={(value, props) => <span {...props}>{value}</span>}
                                    />
                                        
                                    </CardText>
                                </div>
                            </Card>
                        </Col>

                        <Col lg="3">
                            <Card className="bg-success campaignStatInfoBox">
                                <div className="content">
                                    <CardTitle className="h6 text-white mb-2">סה״כ לידים חדשים</CardTitle>
                                    <CardText className="h3 text-white font-weight-bold">
                                    <NumberFormat
                                        value={campaignStat["total_leads"]}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        renderText={(value, props) => <span {...props}>{value}</span>}
                                    />
                                        
                                    </CardText>
                                </div>
                            </Card>
                        </Col>
                        <Col lg="3">
                            <Card className="bg-warning campaignStatInfoBox">
                                <div className="content">
                                    <CardTitle className="h6 text-white mb-2">אחוז המרה הודעה/ליד</CardTitle>
                                    <CardText className="h3 text-white font-weight-bold">
                                        {campaignStat["converstion_rate_lead_perc"]} %
                                    </CardText>
                                </div>
                            </Card>
                        </Col>
                        <Col lg="3">
                            <Card className="bg-warning campaignStatInfoBox">
                                <div className="content">
                                    <CardTitle className="h6 text-white mb-2">אחוז חשיפה להודעה</CardTitle>
                                    <CardText className="h3 text-white font-weight-bold">
                                        {campaignStat["converstion_rate_seen_perc"]} % 
                                    </CardText>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                    :
                    <Row></Row>
                    }
                    <Row>
                        <Col lg="12">
                            <HighchartsReact highcharts={Highcharts} constructorType={"stockChart"} options={chartOptions} /> 
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default CampaignStatInfo;
