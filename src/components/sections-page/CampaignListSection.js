import React from 'react';
import MyCampaignsStatTable from 'components/campaign/MyCampaignsStatTable.js'
import {WizardContextProvider} from '../campaign-wizard/WizardContext.js'

const CampaignListSection = ({}) => {

  return (
    <>
      <div className="cd-section" id="headers">
        <WizardContextProvider>
            <div className="cd-section" id="headers">
              <MyCampaignsStatTable/>
            </div>
          </WizardContextProvider>
      </div>
    </>
  );
}

  

export default CampaignListSection



