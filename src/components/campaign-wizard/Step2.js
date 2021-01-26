import React, {useContext} from "react";
import WizardContext from './WizardContext.js'

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";


const Step2 = () => {
  const [firstNameFocus, setFirstNameFocus] = React.useState("");
  const [emailFocus, setEmailFocus] = React.useState("");
  const [name, setName] = useContext(WizardContext)

  return (
    <>
      <Form
        className="p-3"
        id="contact-form-3"
        method="post"
        role="form"
      >
          <h3>פרטים אישיים</h3>
          <Row>
            <Col md="6">
              <FormGroup className={firstNameFocus}>
                <label>First name</label>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-circle-08"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    aria-label="First Name..."
                    placeholder="First Name..."
                    type="text"
                    value={name}
                    onChange={e => { setName(e.target.value)}}
                    onFocus={() => setFirstNameFocus("focused")}
                    onBlur={() => setFirstNameFocus("")}
                  ></Input>
                </InputGroup>
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup className={emailFocus}>
                <label>Last name</label>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-collection"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    aria-label="Last Name..."
                    placeholder="Last Name..."
                    type="text"
                    onFocus={() => setEmailFocus("focused")}
                    onBlur={() => setEmailFocus("")}
                  ></Input>
                </InputGroup>
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <label>Email address</label>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="ni ni-email-83"></i>
                </InputGroupText>
              </InputGroupAddon>
              <Input
                placeholder="Email Here..."
                type="text"
              ></Input>
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <label>Your message</label>
            <Input
              id="contact-us-message-4"
              name="message"
              rows="6"
              type="textarea"
            ></Input>
          </FormGroup>
      </Form>
    </>
  );
}

export default Step2;
