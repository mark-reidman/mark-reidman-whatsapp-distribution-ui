import React, {useState, useEffect} from "react";

// reactstrap components
// import {
//
// } from "reactstrap";
import {OrderService} from '../services/OrderService.js'

// Core Components
import DemoNavbar from "components/navbars/DemoNavbar.js";
import MainNavbar from "components/navbars/MainNavbar.js";
import MainFooter from "components/footers/MainFooter.js";

// Section Components
import HeadersSection from "components/sections-page/HeadersSection.js";
import FeaturesSection from "components/sections-page/FeaturesSection.js";
import BlogsSection from "components/sections-page/BlogsSection.js";
import TeamsSection from "components/sections-page/TeamsSection.js";
import ProjectsSection from "components/sections-page/ProjectsSection.js";
import PricingsSection from "components/sections-page/PricingsSection.js";
import TestimonialsSection from "components/sections-page/TestimonialsSection.js";
import ContactUsSection from "components/sections-page/ContactUsSection.js";
import TablesSection from "components/sections-page/TablesSection.js";
import AccordionsSection from "components/sections-page/AccordionsSection.js";
// import MyCampaignsSection from "components/sections-page/MyCampaignsSection.js"

function Sections() {
    const [shouldShowMyCampaignsSection, setShouldShowMyCampaignsSection] = useState(false);

    useEffect(() => {
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

    useEffect(() => {
        // let service = new OrderService();

        // service.getOrdersCount().then((res) => {
        //     if (res.data.total > 0) 
        //         setShouldShowMyCampaignsSection(true);
        // });

     },[]);

    return (
        <>
            <MainNavbar type="dark"/>
            <div className="wrapper">
                <HeadersSection/>
                {/* {shouldShowMyCampaignsSection ? <MyCampaignsSection/> : <></>} */}
                {/* <FeaturesSection/> */}
                {/*<BlogsSection/>*/}
                {/*<TeamsSection/>*/}
                {/*<ProjectsSection/>*/}
                {/* <PricingsSection/> */}
                {/*<TestimonialsSection/>*/}
                {/* <ContactUsSection/> */}
                {/* <TablesSection/> */}
                {/* <AccordionsSection/> */}
                <MainFooter/>
            </div>
        </>
    );
}

export default Sections;
