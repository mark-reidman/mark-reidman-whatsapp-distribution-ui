import React, { useState, useContext, useEffect } from "react";
import {Link, useHistory} from "react-router-dom";
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
} from "reactstrap";
import StartCampaignModal from 'components/campaign-wizard/StartCampaignModal.js'
import {AuthContext} from '../../oath/AuthContext.js'
import { useLocation } from "react-router-dom";
// Core Components

function Header1() {
    const history = useHistory();
    const [modalOpen, setModalOpen] = useState(false);
    const [user, setAuthUser, isLogined, setAuthIsLogined, token, setAuthToken]  = useContext(AuthContext);
    const location = useLocation();
    const [isAdminOperator, setIsAdminOperator] = useState(false);

    const newCampaignClick = (e) =>{
        if(isLogined === true && isAdminOperator === true)
            setModalOpen(true);
        else if (isLogined !== true)
            history.push({pathname: "/login", state: { redirect: "/sections" }});
    }

    const myCampaignClick = (e) =>{
        history.push({pathname: "/campaigns"});
    }

    const startCampaignWizard = (id, name, field) => {
        history.push({pathname: "/new-campaign", state: { id: id, name: name, field: field }});
    }

    useEffect(() => {
        
        let isAdmin = false;
        if( user != null){
            for (let index = 0; index < user.roles.length; ++index) {
                const element = user.roles[index];
                if( element == "ADMIN" || element == "OPERATOR")
                    isAdmin = true;
                    setIsAdminOperator(true)
            }
        }

        console.log(location.state)

        // if(location.state != undefined){
        //     if(location.state.redirected != undefined && isAdmin === true) 
        //         setModalOpen(true)
        // }

        if (user == null)
            history.push({pathname: "/login", state: { redirect: "/sections" }});


     }, [location]);


    return (
        <>
            <header className="header-1">
                <Navbar className="bg-default navbar-absolute" expand="lg">
                    <Container>
                        <NavbarBrand
                            className="text-white"
                            href=""
                            onClick={(e) => e.preventDefault()}
                        >
                            Next Sale
                        </NavbarBrand>
                        <button
                            aria-controls="navbar-header-1"
                            aria-expanded={false}
                            aria-label="Toggle navigation"
                            className="navbar-toggler"
                            data-target="#navbar-header-1"
                            data-toggle="collapse"
                            id="navbar-header-1"
                            type="button"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        

                        <UncontrolledCollapse
                            id="navbar-header-1"
                            navbar
                            toggler="#navbar-header-1">
                            <div className="navbar-collapse-header">
                                <Row>
                                    <Col className="collapse-brand" xs="6">
                                        <Link to="/index">
                                            <img
                                                alt="..."
                                                src={require("assets/img/brand/blue.png")}
                                            ></img>
                                        </Link>
                                    </Col>
                                    <Col className="collapse-close" xs="6">
                                        <button
                                            aria-controls="navbar-header-1"
                                            aria-expanded={false}
                                            aria-label="Toggle navigation"
                                            className="navbar-toggler"
                                            data-target="#navbar-header-1"
                                            data-toggle="collapse"
                                            id="navbar-header-1"
                                            type="button"
                                        >
                                            <span></span>
                                            <span></span>
                                        </button>
                                    </Col>
                                </Row>
                            </div>
                            <Nav className="mx-auto" navbar>
                                <NavItem>
                                    <NavLink
                                        className="text-white"
                                        href=""
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        Home
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className="text-white"
                                        href=""
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        About Us
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className="text-white"
                                        href=""
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        Contact Us
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <Nav className="nav" navbar>
                                <NavItem>
                                    <NavLink
                                        className="text-white"
                                        href="https://twitter.com/CreativeTim"
                                    >
                                        <i className="fab fa-twitter"></i>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className="text-white"
                                        href="https://www.facebook.com/CreativeTim"
                                    >
                                        <i className="fab fa-facebook-square"></i>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className="text-white"
                                        href="https://www.instagram.com/CreativeTimOfficial"
                                    >
                                        <i className="fab fa-instagram"></i>
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </UncontrolledCollapse>
                    </Container>
                </Navbar>
                <div className="page-header" style={{minHeight:650}}>
                    <div
                        className="page-header-image"
                        style={{
                            backgroundImage: "url(" + require("assets/img/ill/p2.svg") + ")",
                        }}
                    ></div>
                    <Container>
                        <Row>
                            <Col className="mr-auto text-right d-flex justify-content-center flex-column"
                                 lg="5"
                                 md="7">
                                
                                <h3 className="display-3">מערכת Next Sale Follow-Up וואטסאפ לעסקים</h3>
                                <p className="lead mt-0">
                                    מערכת מעקב בוואטסאפ לעסקים, זה הזמן לתת למערכת שלנו לעבוד בשבילך
                                </p>
                                <br></br>
                                <div className="buttons">
                                {isAdminOperator ? 
                                    <Button
                                        color="danger"
                                        href="#pablo"
                                        onClick={newCampaignClick}
                                    >
                                        התחל קמפיין חדש
                                    </Button>
                                    :
                                    <></>
                                }
                                    {/* <Button
                                        color="danger"
                                        href="#pablo"
                                        onClick={myCampaignClick}
                                    >
                                        צפה בקמפיינים שלי
                                    </Button> */}
                                    
                                    <StartCampaignModal modalOpen={modalOpen} setModalOpen={setModalOpen} startCampaignWizard={startCampaignWizard} />
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </header>
        </>
    );
}

export default Header1;
