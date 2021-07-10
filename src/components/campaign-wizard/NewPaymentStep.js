import React, { useContext, useEffect, useRef   } from "react";
import { WizardContext, actionTypes} from './WizardContext.js'
import clsx from 'clsx';
// reactstrap components
import {
  Row,
  Col,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Spinner
} from "reactstrap";
import SignatureOnAgrementModal from './SignatureOnAgrementModal.js'
import {OrderService} from '../../services/OrderService.js'
import {PaymentService} from '../../services/PaymentService.js'


const NewPaymentStep = () => {
    const [state, dispatch] = useContext(WizardContext);
    const [amount, setAmount] = React.useState(null);
    const [isPromoValid, setIsPromoValid] = React.useState(null);
    const [promocode, setPromocode] = React.useState();
    const [payPalOrderID, setPayPalOrderID] = React.useState(false);
    const [signatureOpen, setSignatureOpen] = React.useState(false);
    const [signatureCheckbox, setSignatureCheckbox] = React.useState(false);
    const [signatureImage, setSignatureImage] = React.useState(null);
    const [totalRecipients, setTotalRecipients] = React.useState(null);
    const [paymentReason, setPaymentReason] = React.useState(null);
    
    const orderService = new OrderService()
    let payService = new PaymentService();

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
    
    const checkPromocode = (e) => {
        setPromocode(e.target.value);
        dispatch({type: actionTypes.setCampaignPromocode, payload: e.target.value });
        payService.checkPromotioncode(e.target.value).then((res) => {
            if(res.data != undefined ) {
                if(res.data.available_amount > totalRecipients){
                    setPaymentReason("קוד תקין")
                    setIsPromoValid(true)
                }
                else {
                    setPaymentReason("אין מספיק קרדיט בקוד " + res.data.available_amount)
                    setIsPromoValid(false)
                }
            }
        }).catch(err => {
            setPaymentReason("קוד לא תקין")
            setIsPromoValid(false)
        });    
    }

    useEffect(() => {
        setPromocode(state.campaignPromocode);

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
        if (state.campaignId != undefined){
            orderService.getOrderCost(state.campaignId).then((res) => { 
                if(res != undefined ) {
                    setAmount(res.data);
                }
            });
        }
    }, [])

    return (
    <>
        <Row>
            <Col md="12">
                <div className="card-inner-with-border align-right" style={{padding:"10px"}}>
                    <h3 >סיכום הזמנה</h3>
                    <br/>
                    {/* <Row>
                        <Col md="6">        
                            <span>{amount} ILS</span>
                        </Col>
                        <Col md="6">
                            <h5>סה"כ לתשלום</h5>
                        </Col>
                    </Row> */}
                    <br/>
                    <Row>
                        <Col md="6">
                            {/* <span className="chech-text">{state.campaignStartDate != null ? state.campaignStartDate.toISOString().substring(0, 10) : "N/A"} מתחילים ב</span>
                            <i className="fal fa-check green-color"></i> */}
                        </Col>
                        <Col md="6">
                            <span className="chech-text">מספר נמענים: {totalRecipients}</span>
                            <i className="fal fa-check green-color"></i>
                            <br/>
                            {/* <span className="chech-text">מספר מערכת</span>
                            <i className="fal fa-check green-color"></i> */}
                            <span className="chech-text">{state.campaignStartDate != null ? state.campaignStartDate.toISOString().substring(0, 10) : "N/A"} מתחילים ב</span>
                            <i className="fal fa-check green-color"></i>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col md="8" style={{marginTop: "40px"}} >
                            
                            <span className="chech-text">{paymentReason}</span>
                        </Col>
                        <Col md="4">
                            <FormGroup>
                                <label>קוד תשלום</label>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="ni ni-email-83"></i>
                                    </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                    placeholder=""
                                    value={promocode}
                                    onChange={checkPromocode}
                                    type="text"
                                    ></Input>
                                </InputGroup>
                            </FormGroup>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col md="3">
                            {signatureImage ? <img style={{width: "50%"}} src={signatureImage} /> : null}
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
    </>
  );
}

export default NewPaymentStep;
