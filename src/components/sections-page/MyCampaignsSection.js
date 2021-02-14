import React from 'react';
import MyCampaignsTable from 'components/campaign/MyCampaignsTable.js'
import {WizardContextProvider} from '../campaign-wizard/WizardContext.js'

const MyCampaignsSection = ({}) => {

  return (
    <>
      <div className="cd-section" id="headers">
        <WizardContextProvider>
            <div className="cd-section" id="headers">
              <MyCampaignsTable/>
            </div>
          </WizardContextProvider>
      </div>
    </>
  );
}

  

export default MyCampaignsSection



