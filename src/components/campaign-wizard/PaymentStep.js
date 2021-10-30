import React, { useContext, useEffect, useRef   } from "react";
import { WizardContext, actionTypes} from './WizardContext.js'
import clsx from 'clsx';
// reactstrap components
import {
  Row,
  Col,
  Spinner
} from "reactstrap";
import { PayPalButton } from "react-paypal-button-v2";
import SignatureOnAgrementModal from './SignatureOnAgrementModal.js'
import {OrderService} from '../../services/OrderService.js'


const PaymentStep = () => {
    const [state, dispatch] = useContext(WizardContext);
    const [amount, setAmount] = React.useState(null);
    const [payPalOrderID, setPayPalOrderID] = React.useState(false);
    const [signatureOpen, setSignatureOpen] = React.useState(false);
    const [signatureCheckbox, setSignatureCheckbox] = React.useState(false);
    const [signatureImage, setSignatureImage] = React.useState(null);
    const [totalRecipients, setTotalRecipients] = React.useState(null);
    
    const orderService = new OrderService()

    const selectSignatureCheckbox = (e) => {
        setSignatureImage(null)
        
        if (!signatureCheckbox) {
            setSignatureOpen(!signatureOpen)
        }
        else {
            setSignatureCheckbox(false)
        }
    }

    const captureSignature = (img) => {
        setSignatureImage(img);
        setSignatureCheckbox(true);
        dispatch({type: actionTypes.setCampaignSignature, payload: img });
    }
    
    const createOrder = (data, actions) => {
        
            return actions.order.create({
              intent: 'CAPTURE',
              payer: {
                name: {
                  given_name: "PayPal",
                  surname: "Customer"
                },
                address: {
                  address_line_1: '123 ABC Street',
                  address_line_2: 'Apt 2',
                  admin_area_2: 'San Jose',
                  admin_area_1: 'CA',
                  postal_code: '95121',
                  country_code: 'US'
                },
                email_address: "customer@domain.com",
                phone: {
                  phone_type: "MOBILE",
                  phone_number: {
                    national_number: "14082508100"
                  }
                }
              },
              purchase_units: [
                {
                  amount: {
                    value: '15.00',
                    // currency_code: 'CAD'
                  },
                  shipping: {
                    address: {
                      address_line_1: '2211 N First Street',
                      address_line_2: 'Building 17',
                      admin_area_2: 'San Jose',
                      admin_area_1: 'CA',
                      postal_code: '95131',
                      country_code: 'US'
                    }
                  },
                }
              ]
            });
        // return actions.order.create({
        //         purchase_units: [
        //             {
        //                 amount: {
        //                     value: amount
        //                 },
        //             },
        //         ],
        //     })
        //     .then((orderid) => {
        //         setOrderID(orderid);
        //         return orderid;
        //     });
    }

    const onApprove = (data, actions) => {
        //console.log(data)
        //console.log(actions)
        // This function captures the funds from the transaction.
        return actions.order.capture().then(function(details) {
            //console.log(details)
          // This function shows a transaction success message to your buyer.
          alert('Transaction completed by ' + details.payer.name.given_name);
        });
      }

    useEffect(() => {
        if(state.campaignSignature !== null) {
            setSignatureImage(state.campaignSignature);
            setSignatureCheckbox(true);
        };

        // calculate total recipients
        let counter = 0
        if(Object.keys(state.distributionList).length > 0){

            Object.keys(state.distributionList).map((key) => {  
                state.distributionList[key].map((item, ind) => {
                    counter += item.data.length;
                });
            });
        };
        setTotalRecipients(counter);

      })

      useEffect(() => {
        
        orderService.getOrderCost(state.campaignId).then((res) => { 
            setAmount(res.data);
        });
      }, [])

    return (
    <>
        <Row>
            <Col md="5">
                {signatureCheckbox ? 
                    <PayPalButton 
                        createOrder={createOrder} onApprove={onApprove} forceReRender={signatureImage} 
                        style={{ layout:"vertical", color: "gold", shape: "rect", label: "pay", height : 40 }}/>
                    : <span></span>}
            </Col>     
            <Col md="7">
                <div className="card-inner-with-border align-right" style={{padding:"10px"}}>
                    <h3 >סיכום הזמנה</h3>
                    <br/>
                    <Row>
                        <Col md="6">        
                            <span>{amount} ILS</span>
                        </Col>
                        <Col md="6">
                            <h5>סה"כ לתשלום</h5>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col md="6">
                            <span className="chech-text">{state.campaignStartDate != null ? state.campaignStartDate.toISOString().substring(0, 10) : "N/A"} מתחילים ב</span>
                            <i className="fal fa-check green-color"></i>
                        </Col>
                        <Col md="6">
                            <span className="chech-text">מספר נמענים: {totalRecipients}</span>
                            <i className="fal fa-check green-color"></i>
                            <br/>
                            <span className="chech-text">מספר מערכת</span>
                            <i className="fal fa-check green-color"></i>
                        </Col>
                    </Row>
                    <br/>
                    <br/>
                    <Row>
                        <Col md="3">
                            {signatureImage ? <img style={{width: "100%"}} src={signatureImage} /> : null}
                        </Col>
                        <Col md="8">
                            <span>אני מאשר את תנאי השימוש ומתחייב לא להשתמש לרעה במערכת ההפצה שלא לצורך</span>
                        </Col>
                        <Col md="1">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="signaturCheckbox" 
                                    checked={signatureCheckbox} onChange={selectSignatureCheckbox} />
                                <label className="custom-control-label" htmlFor="signaturCheckbox">
                                    <span></span>
                                </label>
                            </div>        
                        </Col>
                    </Row>
                    
                    <SignatureOnAgrementModal modalOpen={signatureOpen} setModalOpen={setSignatureOpen} setSignatureImage={captureSignature} />
                    <br/>
                    <br/>
                    <Row>
                        <Col md="12">
                            <span>לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית ושבעגט ליבם סולגק. בראיט ולחת צורק מונחף, בגורמי מגמש. תרבנך וסתעד לכנו סתשם השמה - לתכי מורגם בורק? לתיג ישבעס.</span>
                        </Col>
                    </Row>
                    <br/>
                    <br/>
                </div>
            </Col>                    

               
        </Row>

    
      {/* <Form
        className="p-3"
        id="contact-form-3"
        method="post"
        role="form"
      >
        <h3 className="align-center">בחר אופן תשלום</h3>
        <Row>
          <Col md="6">
            <FormGroup >
              <label>מתי להתחיל?</label>
              <DateTime locale="sv-sv" value={timeOfDistribution} setValue={setTimeOfDistribution} />
            </FormGroup>
          </Col>
          <Col md="6">

          </Col>
        </Row>
        <Row>
            <Col md="8">
                <div className="card-inner-with-border">
                    <div className="nav-wrapper">
                    <Nav
                        className="nav-pills-success nav-pills-icons flex-column flex-md-row"
                        pills
                        role="tablist"
                    >
                        <NavItem>
                            <Button
                                className={clsx("btn-footer", "pull-right", "selectUploadMethodButton", vTabs2 === "vTabs2-1" ? "active" : "")}
                                color="secondary"
                                href="#pablo"
                                onClick={(e) => {
                                e.preventDefault();
                                setVTabs2("vTabs2-1");
                                }}
                            >
                                <i className="fal fa-credit-card wizard-big-icon green-color"></i>
                                <p className="title">כרטיס אשראי</p>
                            </Button>
                        </NavItem>
                        <NavItem>
                            <Button
                                className={clsx("btn-footer", "pull-right", "selectUploadMethodButton", vTabs2 === "vTabs2-2" ? "active" : "")}
                                color="secondary"
                                href="#pablo"
                                onClick={(e) => {
                                e.preventDefault();
                                setVTabs2("vTabs2-2");
                                }}
                            >
                                <i className="fab fa-paypal wizard-big-icon green-color"></i>
                                <p className="title">פייפאל</p>
                            </Button>
                        </NavItem>
                    </Nav>
                    </div>  
                    <Card className="card-plain">
                        <TabContent className="tab-space" activeTab={vTabs2}>
                            <FormGroup>
                                <label>שם בעל הכרטיס</label>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="fab fa-cc-visa"></i>
                                    </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                    name="cardHolderName"
                                    placeholder="שם בעל הכרטיס"
                                    required=""
                                    type="text"
                                    ></Input>
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <label>מספר כרטיס</label>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="fab fa-cc-visa"></i>
                                    </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                    aria-label="**** **** **** ***"
                                    name="cardNumber"
                                    placeholder="**** **** **** ***"
                                    required=""
                                    type="text"
                                    ></Input>
                                </InputGroup>
                            </FormGroup>
                            <Row>
                                <Col md="4">
                                    <FormGroup>
                                        <label>חודש</label>
                                        <InputGroup>
                                            <Input
                                                data-trigger=""
                                                id="choices-single-default"
                                                name="choices-single-default"
                                                type="select"
                                                >
                                                <option>שנה</option>
                                                <option defaultValue="2021">2021</option>
                                                <option defaultValue="2022">2022</option>
                                                <option defaultValue="2023">2023</option>
                                                <option defaultValue="2024">2024</option>
                                                <option defaultValue="2025">2025</option>
                                                <option defaultValue="2026">2026</option>
                                                <option defaultValue="2027">2027</option>
                                                <option defaultValue="2028">2028</option>
                                                <option defaultValue="2029">2029</option>
                                                <option defaultValue="2030">2030</option>
                                                <option defaultValue="2031">2031</option>
                                                <option defaultValue="2032">2032</option>
                                                <option defaultValue="2033">2033</option>
                                                <option defaultValue="2034">2034</option>
                                                <option defaultValue="2035">2035</option>
                                            </Input>  
                                        </InputGroup>
                                    </FormGroup>
                                </Col>
                                <Col md="4">
                                    <FormGroup>
                                        <label>שנה</label>
                                        <InputGroup>
                                            <Input
                                                data-trigger=""
                                                id="choices-single-default"
                                                name="choices-single-default"
                                                type="select"
                                                >
                                                {}
                                                <option>חודש</option>
                                                <option defaultValue="1">1</option>
                                                <option defaultValue="2">2</option>
                                                <option defaultValue="3">3</option>
                                                <option defaultValue="4">4</option>
                                                <option defaultValue="5">5</option>
                                                <option defaultValue="6">6</option>
                                                <option defaultValue="7">7</option>
                                                <option defaultValue="8">8</option>
                                                <option defaultValue="9">9</option>
                                                <option defaultValue="10">10</option>
                                                <option defaultValue="11">11</option>
                                                <option defaultValue="12">12</option>
                                            </Input>     
                                        </InputGroup>
                                    </FormGroup>                                    
                                </Col>
                                <Col md="4">
                                    <FormGroup>
                                        <label>CVV</label>
                                        <InputGroup>
                                            <Input
                                            name="cardHolderName"
                                            placeholder=""
                                            required=""
                                            type="text"
                                            ></Input>
                                        </InputGroup>
                                    </FormGroup>                                    
                                </Col>
                            </Row>

                            <TabPane tabId="vTabs2-1" className="pull-right">
                            <p className="align-right">
                                על מנת לשלוח את כל ההודעות מהמספר שלך, אנחנו נצטרך לבצע תהליך אימות מספר וחיבור של המספר שלך למערכת השליחה.
                                על מנת להתחיל יהיה עלייך לסרוק את הקוד החד פעמי על המסך בעזרת וואטסאפ מהנייד שלך.
                                פתח וואטסאפ -> לחץ על שלוש נקודות בצד ימין למעלה -> לחץ וואטסאפ ווב -> לחץ על הפלוס הקטן
                            </p>
                            <Row>
                            <Col md="3"></Col>
                            <Col md="6" className="align-center">
                            <Button
                                    className="btn-icon"
                                    color="success"
                                    type="button"
                                    disabled={isQrCodeVisibable ? true: false}
                                    
                                >
                                    {!isGetCodeInProgress  && !isQrCodeVisibable ?  
                                    <>
                                    <span className="btn-inner--icon">
                                    <i className="fab fa-whatsapp"></i>
                                    </span>
                                    <span className="btn-inner--text">לחץ כאן להתחיל</span>
                                    </>
                                    : <></>}
                                    {isGetCodeInProgress && !isQrCodeVisibable ? <Spinner color="" type="grow" size="sm"></Spinner> : <></>}
                                    {isGetCodeInProgress && !isQrCodeVisibable ? "...טוען" : "" }
                                    {isQrCodeVisibable ? 
                                    <img
                                    alt="..."
                                    className="img-fluid rounded shadow-lg"
                                    src={"https://miro.medium.com/max/495/1*PNniLVIC_Hc7gNIxjvWPWg.png"}
                                    style={{ width: "2500px" }}
                                    ></img> : <></>}
                            </Button>
                            <br/>
                            {isQrCodeVisibable ? <h5 className="align-center">00:00:{seconds}</h5> : <></>}

                            </Col>
                            <Col md="3"></Col>
                            </Row>
                            
                            </TabPane>
                            <TabPane tabId="vTabs2-2">
                            <p className="">
                                Efficiently unleash cross-media information without
                                cross-media value. Quickly maximize timely
                                        deliverables for real-time schemas. <br></br>
                                <br></br>
                                        Dramatically maintain clicks-and-mortar solutions
                                        without functional solutions.
                                    </p>
                            </TabPane>
                        </TabContent>
                    </Card>
                </div>
            </Col>
          <Col lg="4" md="4">
            <div className="card-inner-with-border">
            </div>
     
          </Col>
        </Row>
      </Form> */}
    </>
  );
}

export default PaymentStep;
