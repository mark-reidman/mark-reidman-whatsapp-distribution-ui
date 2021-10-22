// import React, { useState, useEffect, useContext, createContext } from "react";
// import { useLocation } from "react-router-dom";
// // reactstrap components
// import {
//   Card,
//   CardBody,
//   Container,
//   Row,
//   Col
// } from "reactstrap";

// // core components
// import NavbarLogin from "components/navbars/NavbarLogin.js";
// import MainFooter from "components/footers/MainFooter.js";
// import GoogleButton from 'oath/GoogleOath.js';
// import FacebookButton from 'oath/FacebookOath.js';


// class Login extends React.Component {
  
//   constructor(props) {
//     super(props)

//     this.rememberMeToggle = this.rememberMeToggle.bind(this)
//     this.state = {
//       rememberme: false,
//       redirect_location: ''
//     }
//   }

//   rememberMeToggle(e) {
    
//     if (!this.state.rememberme) {
//       this.setState({
//         rememberme: true
//       })
//     }
//     else {
//       this.setState({
//         rememberme: false
//       })
//     }
//   }

//   componentDidMount() {
//     document.documentElement.scrollTop = 0;
//     document.scrollingElement.scrollTop = 0;
//     this.refs.main.scrollTop = 0;

//     if(window.location.state != undefined) {
//       if(window.location.state.redirect != undefined) 
//         this.setState({
//           redirect_location: window.location.state.redirect
//         })
//     }
//   }

//   render() {
//     return (
//       <>
//         <NavbarLogin />
//         <main ref="main">
//           <section className="section section-shaped section-lg">
//             <div className="shape shape-style-1 bg-gradient-default">
//               <span />
//               <span />
//               <span />
//               <span />
//               <span />
//               <span />
//               <span />
//               <span />
//             </div>
//             <Container className="pt-lg-7">
//               <Row className="justify-content-center">
//                 <Col lg="5">
//                   <Card className="bg-secondary shadow border-0">
//                     <CardBody className="px-lg-5 py-lg-5">
//                     <div className="text-center">
//                       <h5 className="display-3 font-weight-bold">
//                         !ברוך הבא
//                       </h5>
//                       <span className="display-6 font-weight-bold">
//                         להזדהות בחר באחת מהאפשרויות
//                       </span>
//                     </div>
//                     <div className="btn-wrapper text-center">
//                         <br/>                     
//                         <br/>
//                         <Row>
//                           <Col md="6">
//                             <GoogleButton redirect={this.state.redirect_location} className="pull-right" rememberme={this.state.rememberme} />
//                           </Col>
//                           <Col md="6">
//                             <FacebookButton redirect={this.state.redirect_location} className="pull-left" rememberme={this.state.rememberme}/>
//                           </Col>
//                         </Row>
//                         <br/>
//                         <br/>
//                       </div>
//                       <Row>
//                         <Col md="10" className="align-right" style={{ padding: "0px"}}>
//                           <span>זכור אותי</span>
//                         </Col>
//                         <Col md="2">
//                             <div className="custom-control custom-checkbox">
//                                 <input type="checkbox" className="custom-control-input" id="signaturCheckbox" 
//                                     checked={this.state.rememberme} onChange={this.rememberMeToggle} />
//                                 <label className="custom-control-label" htmlFor="signaturCheckbox">
//                                     <span></span>
//                                 </label>
//                             </div>        
//                         </Col>
//                     </Row>                    
//                     </CardBody>
//                   </Card>
//                 </Col>
//               </Row>
//             </Container>
//           </section>
//         </main>
//         <MainFooter />
//       </>
//     );
//   }
// }

// export default Login;

// -------------------------------

import React, { useState, useEffect, useContext, createContext } from "react";
import { useLocation } from "react-router-dom";
import {AuthContext} from '../../oath/AuthContext.js'
import {useHistory} from "react-router-dom";
// reactstrap components
import {
  Card,
  CardBody,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import NavbarLogin from "components/navbars/NavbarLogin.js";
import MainFooter from "components/footers/MainFooter.js";
import GoogleButton from 'oath/GoogleOath.js';
import FacebookButton from 'oath/FacebookOath.js';

function LoginView() {
  const location = useLocation();
  const [redirectLocation, setRedirectLocation] = useState(undefined);
  const history = useHistory();
  const [user, setAuthUser, isLogined, setAuthIsLogined, token, setAuthToken]  = useContext(AuthContext);

  useEffect(() => {
      if(location.state != undefined) {
        if(location.state.redirect != undefined) {
          setRedirectLocation(location.state.redirect)
        }
        else {
          setRedirectLocation("sections")
        }
      }
      else {
        setRedirectLocation("sections")
      }
  });

    return (
        <>
          <NavbarLogin />
          <main >
            <section className="section section-shaped section-lg">
              <div className="shape shape-style-1 bg-gradient-default">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
              <Container className="pt-lg-7">
                <Row className="justify-content-center">
                  <Col lg="5">
                    <Card className="bg-secondary shadow border-0">
                      <CardBody className="px-lg-5 py-lg-5">
                      <div className="text-center">
                        <h5 className="display-3 font-weight-bold">
                          !ברוך הבא
                        </h5>
                        <span className="display-6 font-weight-bold">
                          להזדהות בחר באחת מהאפשרויות
                        </span>
                      </div>
                      <div className="btn-wrapper text-center">
                          <br/>                     
                          <br/>
                          <Row>
                            <Col md="6">
                              <GoogleButton redirect={redirectLocation} className="pull-right" rememberme={true} />
                            </Col>
                            <Col md="6">
                              <FacebookButton redirect={redirectLocation} className="pull-left" rememberme={true}/>
                            </Col>
                          </Row>
                          <br/>
                          <br/>
                        </div>                  
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </section>
          </main>
          <MainFooter />
        </>
    );
}

export default LoginView;
