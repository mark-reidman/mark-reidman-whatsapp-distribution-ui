import React, { useEffect, useState } from "react";
import {OrderService} from '../../services/OrderService.js'
// reactstrap components
import {Row, Col, Container, Button, Table, Spinner } from "reactstrap";


// Core Components

const MyCampaignsTable = ({ }) => {
    const [errorMessage, setErrorMessage] = useState("");
    const [campaigns, setCampaigns] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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

     const continueCampaign = (id) => {
         console.log(id)
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
                                            onClick={(e) => continueCampaign(item["id"])}
                                            size="sm"
                                            >
                                            המשך
                                            </Button>
                                        </td>
                                        <td>{item["update_date"]}</td>
                                        <td>{item["start_adte"]}</td>
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
