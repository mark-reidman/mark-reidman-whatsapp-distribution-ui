import React from 'react';
import CampaignWizard from 'components/campaign-wizard/CampaignWizard.js'

const CampaignSection = ({isModalOpen}) => {

  return (
    <>
    <header className="header-1">
    <div className="page-header">
                    <div
                        className="page-header-image"
                        style={{
                            backgroundImage: "url(" + require("assets/img/ill/p2.svg") + ")",
                        }}
                    ></div>
        <CampaignWizard/>
      </div>
   </header>
   </>
  );
}

  

export default CampaignSection



