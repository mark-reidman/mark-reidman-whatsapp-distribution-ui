import React, { useContext, useEffect, useRef   } from "react";
import {WizardContext, actionTypes} from './WizardContext.js'
import clsx from 'clsx';
// reactstrap components
import {
  Button,
  Card,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Nav,
  NavItem,
  TabPane,
  TabContent,
  Spinner,
  Label
} from "reactstrap";
import DateTime from "components/date-pickers/DateTime.js";

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const NewDistributionPropertiesStep = ({}) => {
    const [timeOfDistribution, setTimeOfDistribution] = React.useState("");
    const [state, dispatch] = useContext(WizardContext);
    const [vTabs2, setVTabs2] = React.useState("vTabs2-1");
    const [isGetCodeInProgress, setIsGetCodeInProgress] = React.useState(false);
    const [isQrCodeVisibable, setIsQrCodeVisibable] = React.useState(false);
    const [seconds, setSeconds] = React.useState(0);
    const [email, setEmail] = React.useState("");
    const [campaignDistSpeed, setCampaignDistSpeed] = React.useState("");

    const setCampaignDistSpeedDropDown = (e) => {
      setCampaignDistSpeed(e.target.value);
      dispatch({type: actionTypes.setCampaignDistributionSpeed, payload: e.target.value });
    }

    const updateTimeOfDistribution = (val) => {
      setTimeOfDistribution(val);
      dispatch({type: actionTypes.setCampaignStartDate, payload: val });
    }

    const updateEmail = (e) => {
      setEmail(e.target.value);
      dispatch({type: actionTypes.setCampaignOwnerEmail, payload: e.target.value });
    }

    const updatePhoneNumberMethod = (val) => {
      if (val === "system")
        dispatch({type: actionTypes.setCampaignPhoneType, payload: "SYSTEM_NUMBER" });
      else if(val === "client")
        dispatch({type: actionTypes.setCampaignPhoneType, payload: "CLIENT_NUMBER" });
    }

    const updatePhoneNumberOnMesasge = (val) => {
      // dispatch({type: actionTypes.setCampaignPhoneType, payload: "CLIENT_NUMBER" });
    }

    useEffect(() => {
      setEmail(state.campaignOwnerEmail);
      setTimeOfDistribution(state.campaignStartDate);
      setCampaignDistSpeed(state.campaignDistributionSpeed);
      if(state.setCampaignPhoneType === "")
      {
        updatePhoneNumberMethod("client");
      }
    })

    useInterval(() => {
      countDown()
    }, 1000);

    const sleep = (ms) => {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    const getNewQrCode = () => {
      setIsGetCodeInProgress(true);
      sleep(5000).then(() => {
        setIsGetCodeInProgress(false);
        setIsQrCodeVisibable(true);
        setSeconds(40);
      })
    }

    const countDown = () => {
      if (isQrCodeVisibable){
        // Remove one second, set state so a re-render happens.
        let secs = seconds - 1;
        setSeconds(secs)

        // Check if we're at zero.
        if (secs <= 0) { 
          setIsQrCodeVisibable(false)
        }
      }
    }

  return (
    <>
      <Form
        className="p-3"
        id="contact-form-3"
        method="post"
        role="form"
      >
        <h3 className="align-center">נא להגדיר את מאפייני ההפצה</h3>
        <Row>
          <Col md="6">
            <FormGroup >
              <label>מתי להתחיל?</label>
              <DateTime locale="sv-sv" value={timeOfDistribution} setValue={updateTimeOfDistribution} />
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <label>אימייל (לקבלת נתוני הפצה)</label>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-email-83"></i>
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Email Here..."
                  value={email}
                  onChange={updateEmail}
                  type="email"
                ></Input>
              </InputGroup>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md="6">

          </Col>
          <Col md="6">
            <FormGroup>
                <Label htmlFor="campaign-tag" className="col-form-label">
                  קצב הפצה
                </Label>
                <Input
                  data-trigger=""
                  id="campaign-tag"
                  name="campaign-tag"
                  value={campaignDistSpeed}
                  onChange={setCampaignDistSpeedDropDown}
                  type="select"
                >
                  <option placeholder="please select">בחר קצב הפצה</option>
                  <option value="standard">רגיל</option>
                  <option value="fast">מהיר</option>
                  <option value="slow">איטי</option>
                </Input>
                <br/>

              </FormGroup>
            </Col>
          </Row>

      </Form>
    </>
  );
}

export default NewDistributionPropertiesStep;
