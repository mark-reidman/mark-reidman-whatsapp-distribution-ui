import React, {useState} from "react";
import {OrderService} from '../../services/OrderService.js'
// reactstrap components
import { Button, Label, FormGroup, Form, Input, Modal } from "reactstrap";

// Core Components

const StartCampaignModal = ({modalOpen, setModalOpen, startCampaignWizard}) => {
  const [campaignName, setCampaignName] = useState("");
  const [campaignField, setCampaignField] = useState("");

  const orderService = new OrderService()

  const setCampaignNameButton = (e) => {
    setCampaignName(e.target.value);
  }

  const setCampaignFieldDropDown = (e) => {
    //console.log(e.target.value);
    setCampaignField(e.target.value);
  }

  async function startCampaignButton () {
    
    await orderService.createNewOrder({'campaignName': campaignName, 'campaignField': campaignField}).then((res) => { 
      
      startCampaignWizard(res.data.id, campaignName, campaignField)});
  }

  
  return (
    <>
      <Modal
        isOpen={modalOpen}
        toggle={() => setModalOpen(!modalOpen)}
        className="modal-dialog-centered"
      >
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            התחל קמפיין חדש
          </h5>
          <button
            aria-label="Close"
            className="close"
            onClick={() => setModalOpen(!modalOpen)}
            type="button"
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className="modal-body bg-secondary">
          <Form>
            <FormGroup>
              <Label htmlFor="campaign-name" className="col-form-label">
                שם הקמפיין
              </Label>
              <FormGroup>
                <Input
                  className="form-control-alternative"
                  value={campaignName}
                  onChange={setCampaignNameButton}
                  id="campaign-name"
                  type="text"
                ></Input>
              </FormGroup>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="campaign-tag" className="col-form-label">
                תחום
              </Label>
              <Input
                data-trigger=""
                id="campaign-tag"
                name="campaign-tag"
                value={campaignField}
                onChange={setCampaignFieldDropDown}
                type="select"
              >
                <option placeholder="please select">Single Option</option>
                <option value="politics">פוליטיקה</option>
                <option value="realestate">נדל"ן</option>
                <option value="fashion">אופנה</option>
                <option value="other">אחר</option>
              </Input>
              <br/>
              <Button className="pull-right" color="primary" type="button" onClick={startCampaignButton}>
                צור קמפיין
              </Button>
            </FormGroup>
          </Form>
        </div>
      </Modal>
    </>
  );
}

export default StartCampaignModal;
