import React, {useState, useEffect} from "react";

// reactstrap components
// import {
//
// } from "reactstrap";


// Core Components
import MainNavbar from "components/navbars/MainNavbar.js";
import MainFooter from "components/footers/MainFooter.js";

// Section Components
import ConversationReviewTable from "components/review/ConversationReviewTable.js"


function LeadReview() {

    return (
        <>
            <MainNavbar type="dark"/>
            <div className="wrapper" style={{paddingTop: "100px"}} >

                <ConversationReviewTable />
                        
                <MainFooter/>
            </div>
            
        </>
    );
}

export default LeadReview;
