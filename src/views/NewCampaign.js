import React from "react";

// reactstrap components
// import {
//
// } from "reactstrap";

// Core Components
import MainNavbar from "components/navbars/MainNavbar.js";
import MainFooter from "components/footers/MainFooter.js";

// Section Components
import CampaignSection from "components/sections-page/CampaignSection.js";

function NewCampaign() {
    React.useEffect(() => {
        document.body.classList.add("sections-page");
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        var href = window.location.href.substring(
            window.location.href.lastIndexOf("#") + 1
        );
        if (
            window.location.href.lastIndexOf("#") > 0 &&
            document.getElementById(href)
        ) {
            document.getElementById(href).scrollIntoView();
        }
        return function cleanup() {
            document.body.classList.remove("sections-page");
        };
    });
    return (
        <>
            <MainNavbar type="dark"/>
            <div className="wrapper">
                <CampaignSection/>
                <MainFooter/>
            </div>
        </>
    );
}

export default NewCampaign;
