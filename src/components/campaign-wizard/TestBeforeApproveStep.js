import React, { useContext, useEffect, useRef } from "react";
import {WizardContext, actionTypes} from './WizardContext.js'

// reactstrap components
import {
    Button,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Row,
    Col,
    Spinner
} from "reactstrap";


const TestBeforeApproveStep = () => {

    const [state, dispatch] = useContext(WizardContext);
    const [isSendInProgress, setIsSendInProgress] = React.useState(false);
    const [didSendTestMessage, setDidSendTestMessage] = React.useState(false);
    const [numOne, setNumOne] = React.useState("");
    const [numTwo, setNumTwo] = React.useState("");
    const [numThree, setNumThree] = React.useState("");

    const updateNumOne = (e) => {
        setNumOne(e.target.value);
        dispatch({type: actionTypes.setCampaignTestNumberOne, payload: e.target.value });
    }

    const updateNumTwo = (e) => {
        setNumTwo(e.target.value);
        dispatch({type: actionTypes.setCampaignTestNumberTwo, payload: e.target.value });
    }

    const updateNumThree = (e) => {
        setNumThree(e.target.value);
        dispatch({type: actionTypes.setCampaignTestNumberThree, payload: e.target.value });
    }

    useEffect(() => {
        setNumOne(state.campaignTestNumberOne);
        setNumTwo(state.campaignTestNumberTwo);
        setNumThree(state.campaignTestNumberThree);
        
      })

    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const sendTestMessage = () => {
        setIsSendInProgress(true);
        sleep(5000).then(() => {
            setIsSendInProgress(false);
            setDidSendTestMessage(true);
        })
    }

    return (
        <>
            <Form
                className="p-3"
                id="contact-form-3"
                method="post"
                role="form"
            >
                <h3 className="align-center">נא בחר מספר לשליחת הודעת בדיקה</h3>
                <Row>
                    <Col md="4">
                        <FormGroup >
                            <label>מספר שלישי</label>
                            <FormGroup>
                                <InputGroup className="mb-4">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="fab fa-whatsapp"></i>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        placeholder=""
                                        value={numThree}
                                        onChange={updateNumThree}
                                        type="number"
                                    ></Input>
                                </InputGroup>
                            </FormGroup>
                        </FormGroup>
                    </Col>
                    <Col md="4">
                        <FormGroup >
                            <label>מספר שני</label>
                            <FormGroup>
                                <InputGroup className="mb-4">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="fab fa-whatsapp"></i>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        placeholder=""
                                        value={numTwo}
                                        onChange={updateNumTwo}
                                        type="number"
                                    ></Input>
                                </InputGroup>
                            </FormGroup>
                        </FormGroup>
                    </Col>
                    <Col md="4">
                        <FormGroup >
                            <label>מספר ראשון</label>
                            <FormGroup>
                                <InputGroup className="mb-4">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="fab fa-whatsapp"></i>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        placeholder=""
                                        value={numOne}
                                        onChange={updateNumOne}
                                        type="number"
                                    ></Input>
                                </InputGroup>
                            </FormGroup>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md="3"></Col>
                    <Col md="6" className="align-center">
                        <Button
                            className="btn-icon"
                            color="success"
                            type="button"
                            onClick={sendTestMessage}
                        >
                            {!isSendInProgress ?
                                <>
                                    <span className="btn-inner--icon">
                                        <i className="fab fa-whatsapp"></i>
                                    </span>
                                    <span className="btn-inner--text">שלח הודעות בדיקה</span>
                                </>
                                : <></>}
                            {isSendInProgress && !didSendTestMessage ? <Spinner color="" type="grow" size="sm"></Spinner> : <></>}
                            {isSendInProgress && !didSendTestMessage ? "...שולח" : ""}
                        </Button>
                    </Col>
                    <Col md="3"></Col>
                </Row>

            </Form>
        </>
    );
}

export default TestBeforeApproveStep;
