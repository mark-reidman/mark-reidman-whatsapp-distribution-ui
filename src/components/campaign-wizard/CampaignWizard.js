import React, {useContext, useEffect} from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';
import {WizardContext, actionTypes} from './WizardContext.js'
import LoadingMethodStep from './LoadingMethodStep.js'
import MessageEditStep from './MessageEditStep.js'
// import DistributionPropertiesStep from './DistributionPropertiesStep.js'
import NewDistributionPropertiesStep from './NewDistributionPropertiesStep.js'
import TestBeforeApproveStep from './TestBeforeApproveStep.js';
// import PaymentStep from './PaymentStep.js';
import NewPaymentStep from './NewPaymentStep.js';
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";

// reactstrap components
import {
    Button,
    UncontrolledCollapse,
    NavbarBrand,
    Navbar,
    NavItem,
    NavLink,
    Nav,
    Container,
    Row,
    Col,
    Modal,
} from "reactstrap";


const ColorlibConnector = withStyles({
    alternativeLabel: {
        top: 22,
    },
    active: {
        '& $line': {
            backgroundColor: '#172b4d',

        },
    },
    completed: {
        '& $line': {
            backgroundColor: '#172b4d',
        },
    },
    line: {
        height: 6,
        border: 0,
        backgroundColor: '#abb3bd',
        borderRadius: 1,
        zIndex: 0,
        marginLeft: '6px',
        marginRight: '6px',
        marginTop: '3px'
    },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({

    active: {
        zIndex: 1,
        borderColor: '#172b4d',
        borderWidth: '2px',
    },
    completed: {
        zIndex: 1,
        borderColor: '#172b4d',
        borderWidth: '2px',
    },
    regular: {
        zIndex: 1,
        borderColor: '#abb3bd',
        borderWidth: '2px',
    }

});

function ColorlibStepIcon(props) {
    const classes = useColorlibStepIconStyles();
    const {active, completed, error} = props;

    const icons = {
        1: "fal fa-users",
        2: "fal fa-font",
        3: "fal fa-cogs",
        4: "fal fa-paper-plane",
        5: "fal fa-credit-card"
    };

    return (
        <>
            <Button
                className={clsx("btn-icon-only", "rounded-circle",
                    (!completed && !active && !error) && classes.regular,
                    (!completed && active && !error) && classes.active,
                    (completed && !active && !error) && classes.completed
                )}
                color={clsx((!completed && !active && !error) && "Secondary", (!completed && active && !error) && "default", (completed && !active && !error) && "Secondary", error && "danger")}
                size="lg"
                type="button"
            >
            <span className="btn-inner--icon">
                <i className={clsx(icons[String(props.icon)])}></i>
            </span>
            </Button>
        </>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        // width: '100%',
    },
    button: {
        // marginRight: theme.spacing(1),
    },
    instructions: {
        // marginTop: theme.spacing(1),
        // marginBottom: theme.spacing(1),
    },
}));

function getSteps() {
    return ['רשימות הפצה', 'תוכן הודעה', 'הגדרות הפצה', 'בדוק הכל', 'שלם ושלח'];
}

const getStepComponent = (step) => {
    switch (step) {
        case 0:
            return <LoadingMethodStep/>;
        case 1:
            return <MessageEditStep/>;
        case 2:
            // return <DistributionPropertiesStep/>;
            return <NewDistributionPropertiesStep/>;
            
        case 3:
            return <TestBeforeApproveStep/>;
        default:
            // return <PaymentStep/>;
            return <NewPaymentStep/>;
    }
}

export default function CampaignWizard({}) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();
    const location = useLocation();
    const [state, dispatch] = useContext(WizardContext);

    const [modalOpen, setModalOpen] = React.useState(false);

    const history = useHistory();

    const clsoeModal = () => {
        setModalOpen(!modalOpen)
        setTimeout(()=>{
            history.push({pathname: "/sections", state: {redirected: false}});
          }, 1000)
    }


    useEffect(() => {
        if(location.state != undefined){
            dispatch({type: actionTypes.setCampaignName, payload: location.state.name });
            dispatch({type: actionTypes.setcampaignField, payload: location.state.field });
            dispatch({type: actionTypes.setCampaignId, payload: location.state.id });
        }
     }, [location]);


    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSave = () => {
        setModalOpen(!modalOpen)
    };

    return (
        <>
            <Container className="pt-5">
                <Row>
                    <Col className="d-flex justify-content-center flex-column wizard-container" md="12">
                        <div className="card card-raised wizard-card">
                            <div className="card-body">
                                <div className="wizard-header">
                                    <h3>{state.campaignName}</h3>
                                    {/*<p className="category">some more decription below</p>*/}
                                </div>
                                <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector/>}>
                                    {steps.map((label) => (
                                        <Step key={label}>
                                            <StepLabel StepIconComponent={ColorlibStepIcon}><p>{label}</p></StepLabel>
                                        </Step>
                                    ))}
                                </Stepper>
                                <div className="tab-content">
                                    {getStepComponent(activeStep)}
                                </div>
                                <div className="wizard-footer"></div>
                                <Button
                                    variant="contained"
                                    color="primary"

                                    onClick={(activeStep === (steps.length - 1)) ? handleSave : handleNext}
                                    className={clsx(classes.button, "pull-right")}
                                >
                                    <span className="btn-inner--text">&nbsp;&nbsp;&nbsp;&nbsp; {(activeStep === steps.length - 1) ? 'שמור' : 'הבא'}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    <span className="btn-inner--icon">
                                            <i className={activeStep === steps.length - 1 ? "fal fa-check" : "fal fa-chevron-right"}></i>
                                        </span>
                                </Button>
                                <Button disabled={activeStep === 0} onClick={handleBack}
                                        className={clsx(classes.button, "pull-left")}>
                                        <span className="btn-inner--icon">
                                            <i className="fal fa-chevron-left"></i>
                                        </span>
                                    <span className="btn-inner--text">&nbsp;&nbsp;&nbsp;&nbsp;חזור&nbsp;&nbsp;&nbsp;&nbsp;</span>

                                </Button>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Modal
                    isOpen={modalOpen}
                    toggle={clsoeModal}
                    className="modal-lg"
                    modalClassName=" bd-example-modal-lg"
                >
                    <div className="modal-header">
                        <h5 className="modal-title float-right" id="exampleModalLabel">
                            סיום הזמנה
                        </h5>
                        <button
                            aria-label="Close"
                            className="close"
                            onClick={clsoeModal}
                            type="button"
                        >
                            <span aria-hidden={true}>×</span>
                        </button>
                    </div>
                    <div className="modal-body bg-secondary">
                        <span>ההזמנה נשמרה, כרגע המערכת נמצאת בשלב הניסוי, נא פנה למפעילים על מנת טיפול בהזמנה.</span>
                        <span>תודה מצוות נקסט סייל</span>
                    </div>
                </Modal>
            </Container>
        </>
    );
}
