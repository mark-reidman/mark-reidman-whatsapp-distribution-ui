import React from "react";

// reactstrap components
// import {
//
// } from "reactstrap";

// Core Components
import DemoNavbar from "components/navbars/DemoNavbar.js";
import DemoFooter from "components/footers/DemoFooter.js";

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
            <DemoNavbar type="dark"/>
            <div className="wrapper">
                <CampaignSection/>
                <DemoFooter/>
            </div>
        </>
    );
}

export default NewCampaign;
