import React, { useState, useEffect, useContext, createContext } from "react";
// import GLoginButton from 'oath/GLoginButton.js'
// import GLogoutButton from 'oath/GLogoutButton.js'
// import { useGoogleLogin } from 'react-google-login'

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import NavbarPrimary from "components/navbars/NavbarPrimary.js";
import Footer1 from "components/footers/Footer1.js";
// import GLogoutHook from "oath/GLogoutHook";
// import GLogoutHook from 'oath/GLogoutHook.js'
import GoogleButton from 'oath/GoogleOath.js'


class Login extends React.Component {
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }
  render() {
    return (
      <>
        <NavbarPrimary />
        <main ref="main">
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
                        Sign in with
                      </h5>
                    </div>
                    <div className="btn-wrapper text-center">
                        {/* <GLoginButton /> */}
                        <br/>                     
                        <br/>
                        <GoogleButton/>
                        {/* <GLogoutButton /> */}
                        {/* <GLogoutHook /> */}
                        <br/>
                        <br/>
                        <a
                          className="text-light"
                          href="/profile-page"
                          // onClick={e => e.preventDefault()}
                        >
                          <small>Create new account</small>
                        </a>
                      </div>
                      <div className="custom-control custom-control-alternative custom-checkbox">
                        <input
                          className="custom-control-input"
                          id=" customCheckLogin"
                          type="checkbox"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor=" customCheckLogin">
                          <span>Remember me</span>
                        </label>
                      </div>                      
                    </CardBody>
                  </Card>
                  <Row className="mt-3">
                    <Col xs="6">
                      <a
                        className="text-light"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        <small>Forgot password?</small>
                      </a>
                    </Col>
                    <Col className="text-right" xs="6">
                      <a
                        className="text-light"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        <small>Create new account</small>
                      </a>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </section>
        </main>
        <Footer1 />
      </>
    );
  }
}

export default Login;
