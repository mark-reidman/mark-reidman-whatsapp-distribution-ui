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

    if(isLogined) {
      debugger;
      if(location.state != undefined && location.state.redirect != undefined) {
        history.push({pathname: (location.state.redirect.startsWith("/") ? "" : "/") + location.state.redirect});
      }
      else {
        history.push({pathname: "/sections"});
      }
      // history.push({pathname: redirect, state: {redirected: true}});
    }
  }, [isLogined]);

  // useEffect(() => {
  //   debugger;
  //   if(isLogined) {
  //     history.push({pathname: redirectLocation, state: {redirected: true}});
  //     // history.push({pathname: redirect, state: {redirected: true}});
  //   }

  // },[isLogined]);

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
