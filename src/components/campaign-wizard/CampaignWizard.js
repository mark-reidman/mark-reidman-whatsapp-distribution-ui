import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';
import WizardContext from './WizardContext.js'
import StepLoadingMethod from './StepLoadingMethod.js'
import Step2 from './Step2.js'

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
    zIndex: 0
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({

  active: {
    zIndex:1,
    borderColor:'#172b4d',
    borderWidth: '6px',
  },
  completed: {
    zIndex:1,
    borderColor:'#172b4d',
    borderWidth: '6px',
  },
  regular: {
      zIndex:1,
      borderColor:'#abb3bd',
      borderWidth: '6px',
  }

});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed, error } = props;

  const icons = {
    1: "fal fa-users",
    2: "fal fa-font",
    3: "fal fa-keyboard",
    4: "fal fa-comment-alt-dots",
    5: "fal fa-paper-plane",
    6: "fal fa-credit-card"
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
  return ['רשימות הפצה', 'תוכן הודעה' , 'שלב שלישי', 'הערות נוספות', 'בדוק הכל', 'שלם ושלח'];
}

const getStepComponent = (step) =>{
    switch (step) {
        case 0:
          return <StepLoadingMethod/>;
        case 1:
          return <Step2/>;
        case 2:
          return 'This is the bit I really care about!';
        default:
          return 'Unknown step';
      }
}

export default function CampaignWizard() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
    setActiveStep(0);
    };


    // Campaign data variables
    const [name, setName] = React.useState("")
    const [distributionList, setDistributionList] = React.useState([])

    return (
        <WizardContext.Provider value={{
            name,
            setName,
            distributionList,
            setDistributionList
            }}>
              <>

              <Container className="pt-5">
                    <Row>
                        <Col className="d-flex justify-content-center flex-column wizard-container" md="12">
                            <div className="card card-raised wizard-card">                                    
                                <div className="card-body">
                                  <div className="wizard-header">
                                    <h3>Campaign name here</h3>
                                    <p className="category">some more decription below</p>
                                  </div>
                                    <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
                                        {steps.map((label) => (
                                        <Step key={label}>
                                            <StepLabel StepIconComponent={ColorlibStepIcon}><p >{label}</p></StepLabel>
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
                                     
                                            onClick={(activeStep === (steps.length - 1)) ? handleReset : handleNext}
                                            className={clsx(classes.button, "pull-right")}
                                        > 
                                            <span className="btn-inner--text">&nbsp;&nbsp;&nbsp;&nbsp; {(activeStep === steps.length - 1 ) ? 'שמור' : 'הבא'}&nbsp;&nbsp;&nbsp;&nbsp;</span>
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
                </Container>
              </>
        </WizardContext.Provider>
    );
}
