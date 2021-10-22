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
  Spinner
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

const DistributionPropertiesStep = ({}) => {
    const [timeOfDistribution, setTimeOfDistribution] = React.useState("");
    const [state, dispatch] = useContext(WizardContext);
    const [vTabs2, setVTabs2] = React.useState("vTabs2-1");
    const [isGetCodeInProgress, setIsGetCodeInProgress] = React.useState(false);
    const [isQrCodeVisibable, setIsQrCodeVisibable] = React.useState(false);
    const [seconds, setSeconds] = React.useState(0);
    const [email, setEmail] = React.useState("");

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
          <Col md="12">
            <FormGroup className="pull-right">
                <label>בחירת מספר לשליחה</label>
              </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md="9">
            <Card className="card-plain">
              <TabContent className="mt-2" activeTab={vTabs2}>
                <TabPane tabId="vTabs2-1" className="pull-right">
                  <Row>
                    <Col md="5" className="align-center">
                      <Button
                          className="btn-icon"
                          color="success"
                          type="button"
                          disabled={isQrCodeVisibable ? true: false}
                          onClick={getNewQrCode}
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
                            style={{ width: "150px" }}
                          ></img> : <></>}
                      </Button>
                      <br/>
                      {isQrCodeVisibable ? <h5 className="align-center">00:00:{seconds}</h5> : <></>}
                    </Col>
                    <Col md="7">
                      <p className="align-right">
                        על מנת לשלוח את כל ההודעות מהמספר שלך, אנחנו נצטרך לבצע תהליך אימות מספר וחיבור של המספר שלך למערכת השליחה.
                        על מנת להתחיל יהיה עלייך לסרוק את הקוד החד פעמי על המסך בעזרת וואטסאפ מהנייד שלך.
                        פתח וואטסאפ -&gt; לחץ על שלוש נקודות בצד ימין למעלה -&gt; לחץ וואטסאפ ווב -&gt; לחץ על הפלוס הקטן
                      </p>    
                    </Col>
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
          
            </Col>
          <Col lg="3" md="3">
            <div className="nav-wrapper">
              <Nav
                className="nav-pills-success nav-pills-icons flex-column"
                pills
                role="tablist"
              >
                <NavItem className="p-0">
                <Button
                    className={clsx("btn-footer", "pull-right", "selectUploadMethodButton", vTabs2 === "vTabs2-1" ? "active" : "")}
                    color="secondary"
                    href=""
                    onClick={(e) => {
                      e.preventDefault();
                      updatePhoneNumberMethod("client");
                      setVTabs2("vTabs2-1");
                    }}
                  >
                    <i className="fal fa-mobile-android-alt wizard-big-icon green-color"></i>
                    <p className="title">מספר שלך</p>
                  </Button>
                </NavItem>
                <NavItem>
                <Button
                    className={clsx("btn-footer", "pull-right", "selectUploadMethodButton", vTabs2 === "vTabs2-2" ? "active" : "")}
                    color="secondary"
                    href=""
                    onClick={(e) => {
                      e.preventDefault();
                      updatePhoneNumberMethod("system");
                      setVTabs2("vTabs2-2");
                    }}
                  >
                    <i className="fal fa-phone-office wizard-big-icon green-color"></i>
                    <p className="title">מספר מערכת</p>
                  </Button>
                </NavItem>
              </Nav>
            </div>       
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default DistributionPropertiesStep;
