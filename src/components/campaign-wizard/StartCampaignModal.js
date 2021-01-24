import React from "react";

// reactstrap components
import { Button, Label, FormGroup, Form, Input, Modal } from "reactstrap";

// Core Components

const StartCampaignModal = ({modalOpen, setModalOpen, startCampaignWizard}) => {
  // const [modalOpen, setModalOpen] = React.useState(false);
  console.log(modalOpen);
  return (
    <>
      <Modal
        isOpen={modalOpen}
        toggle={() => setModalOpen(!modalOpen)}
        className="modal-dialog-centered"
      >
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            התחל קמפיים חדש
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
                  defaultValue=""
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
                type="select"
              >
                <option placeholder="true">Single Option</option>
                <option defaultValue="politics">פוליטיקה</option>
                <option defaultValue="realestate">נדל"ן</option>
                <option defaultValue="fashion">אופנה</option>
                <option defaultValue="other">אחר</option>
              </Input>
              <Button color="primary" type="button" onClick={startCampaignWizard}>
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
