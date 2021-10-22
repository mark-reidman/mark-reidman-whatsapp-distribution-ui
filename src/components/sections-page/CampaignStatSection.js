import React from 'react';
import CampaignStatInfo from 'components/campaign/CampaignStatInfo.js'
import {WizardContextProvider} from '../campaign-wizard/WizardContext.js'

const CampaignStatSection = ({}) => {

  return (
    <>
      <div className="cd-section" id="headers">
        <WizardContextProvider>
          <CampaignStatInfo/>
        </WizardContextProvider>
      </div>
    </>
  );
}

  

export default CampaignStatSection



