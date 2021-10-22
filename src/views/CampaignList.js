import React, { useState, useContext, useEffect } from "react";

import { useLocation } from "react-router-dom";
// Core Components
import MainNavbar from "components/navbars/MainNavbar.js";
import MainFooter from "components/footers/MainFooter.js";
import {AuthContext} from '../oath/AuthContext.js'
// Section Components
import TablesSection from "components/sections-page/TablesSection.js";
import CampaignListSection from "components/sections-page/CampaignListSection.js"
import { OrderService } from '../services/OrderService.js'
import {useHistory} from "react-router-dom";

function CampaignList() {
    const location = useLocation();
    const history = useHistory();
    const [user, setAuthUser, isLogined, setAuthIsLogined, token, setAuthToken]  = useContext(AuthContext);

    useEffect(() => {
        if(isLogined === true){
            let service = new OrderService();
            // service.assignCampaignToMe().then((res) => {
            // });
        }
        else if (isLogined !== true) {
            history.push({pathname: "/login", state: { redirect: window.location.pathname }});
        }

     });

    return (
        <>
            <MainNavbar type="dark"/>
            <div className="wrapper" >
                
                {/* <MyCampaignsSection/> */}
                <CampaignListSection style={{paddingTop: "150px"}}/>
                <MainFooter/>
            </div>
            
        </>
    );
}

export default CampaignList;
