import React, { useContext,useEffect } from "react";
import {WizardContext, actionTypes} from './WizardContext.js'
// reactstrap components
import {
  Form,
  Row,
  Col,
  Input,
  FormGroup
} from "reactstrap";


const MessageEditStep = () => {
  const [ firstMessage, setFirstMessage ] = React.useState("");
  const [ secondMessage, setSecondMessage ] = React.useState("");
  const [ thirdMessage, setThirdMessage ] = React.useState("");
  const [state, dispatch] = useContext(WizardContext);


  const updateFirstMessage = (e) => {
    setFirstMessage(e.target.value);
    dispatch({type: actionTypes.setCampaignFirstMessage, payload: e.target.value });
  }

  const updateSecondMessage = (e) => {
    setSecondMessage(e.target.value);
    dispatch({type: actionTypes.setCampaignSecondMessage, payload: e.target.value });
    
  }

  const updateThirdMessage = (e) => {
    setThirdMessage(e.target.value);
    dispatch({type: actionTypes.setCampaignThirdMessage, payload: e.target.value });
    
  }
  

  useEffect(() => {
    setFirstMessage(state.campaignFirstMessage);
    setSecondMessage(state.campaignSecondMessage);
    setThirdMessage(state.campaignThirdMessage);
  })

  return (
    <>
      <Form
        className="p-3"
        id="contact-form-3"
        method="post"
        role="form"
      >
        <h3 className="align-center">הזן את תוכן ההודעה</h3>
        <Row>
          <Col md="4">
            <FormGroup>
              <label>הודעה אחרונה</label>
              <Input
                id="contact-us-message-4"
                name="message"
                rows="6"
                onChange={updateThirdMessage}
                value={thirdMessage}
                type="textarea"
              ></Input>
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
              <label>הודעת המשך</label>
              <Input
                id="contact-us-message-4"
                name="message"
                rows="6"
                onChange={updateSecondMessage}
                value={secondMessage}
                type="textarea"
              ></Input>
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
              <label>הודעה ראשונה</label>
              <Input
                id="contact-us-message-4"
                name="message"
                rows="6"
                onChange={updateFirstMessage}
                value={firstMessage}
                type="textarea"
              ></Input>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md="4">
          
          </Col>
          <Col md="4">
          
          </Col>
          <Col md="4">
            <span style={{fontSize: "10px" }}>
          השתמש ב #שם# על מנת לשתול את שם הלקוח בגוף ההודעה **
          </span>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default MessageEditStep;
