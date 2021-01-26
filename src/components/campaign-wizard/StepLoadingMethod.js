import React, {useContext} from "react";
import WizardContext from './WizardContext.js'
import clsx from 'clsx';
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  Badge,
  Media,
  Progress,
  Table,
  UncontrolledTooltip,
} from "reactstrap";

import StartCampaignModal from './FileUploadModal.js'
import CopyPasteModal from './CopyPasteModal.js'

const StepLoadingMethod = () => {
  const [firstNameFocus, setFirstNameFocus] = React.useState("");
  const [emailFocus, setEmailFocus] = React.useState("");
  const [distributionList, setDistributionList] = React.useState([]);
  const {name, setName} = useContext(WizardContext)


  const [fileUplaodOpen, setFileUplaodOpen] = React.useState(false);
  const [copyPasteOpen, setCopyPasteOpen] = React.useState(false);

  return (
    <>
      <Row style={{
                marginTop: '60px',
                marginBottom: '20px',
            }}>
        <Col className="mb-md-4 mb-lg-0 align-center" lg="12" md="12">
          <Button
            className="btn-footer selectUploadMethodButton"
            color="secondary"
            href="#pablo"
            onClick={(e) => setFileUplaodOpen(!fileUplaodOpen)}
          >
            <i className="fal fa-file-excel wizard-big-icon green-color"></i>
            <p className="title">קובץ אקסל</p>
          </Button>
          <StartCampaignModal modalOpen={fileUplaodOpen} setModalOpen={setFileUplaodOpen} distributionList={distributionList} setDistributionList={setDistributionList} />
          <Button
            className="btn-footer selectUploadMethodButton"
            color="secondary"
            href="#pablo"
            onClick={(e) => setCopyPasteOpen(!copyPasteOpen)}
          >
            <i className="fal fa-stream wizard-big-icon green-color"></i>
            <p className="title">העתק/הדבק</p>
          </Button>
          <CopyPasteModal modalOpen={copyPasteOpen} setModalOpen={setCopyPasteOpen} distributionList={distributionList} setDistributionList={setDistributionList}  />
          <Button
            className="btn-footer selectUploadMethodButton"
            color="secondary"
            href="#pablo"
            onClick={(e) => console.log("")}
          >
            <i className="fal fa-cloud-download wizard-big-icon green-color"></i>
            <p className="title">רשימות שמורות</p>
          </Button>
        </Col>
     </Row>
     <Row>
        <Col className="mb-md-4 mb-lg-0 align-center" lg="12" md="12">
          <Table className="align-items-center table-flush wizard-table" responsive>
            <thead className="thead-light">
              <tr>
              <th className="sort" data-sort="type" scope="col">
                  סוג
                </th>
                <th className="sort" data-sort="type" scope="col">
                  שם
                </th>
                <th className="sort" data-sort="amount" scope="col">
                  כמות
                </th>
                <th className="sort" data-sort="status" scope="col">
                  סטאטוס
                </th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody className="list">
            {distributionList.length === 0 && <tr key="1"><td colSpan="4">לא נבחרו רשימות</td></tr>}
            {
              Object.keys(distributionList).map((key) => {
                  return(
                    distributionList[key].map((item, ind) => {
                      return(<tr>
                        <td scope="row">
                          <Media className="align-items-center">
                            <i className={clsx("fal", "wizard-big-icon", 
                              (key == "files" && item.fileType === "excel") ? "fa-file-excel" : "",
                              (key == "copypaste") ? "fa-stream" : "", 
                              (key == "savedList" === "fa-cloud-download") ? "fa-stream" : "")}></i>
                        </Media>
                        </td>
                        <td className="name mb-0 text-sm">{item.fileName + " - " + item.column}</td>
                        <td className="name mb-0 text-sm">{item.data.length}</td>
                        <td>
                          <Badge className="badge-dot mr-4">
                            <i className="bg-warning"></i>
                            <span className="status">pending</span>
                          </Badge>
                        </td>
                        <td className="text-right">
                          <Button
                                className="btn-icon-only rounded-circle"
                                color="danger"
                                type="button"
                              >
                                <span className="btn-inner--icon">
                                  <i className="fal fa-trash-alt"></i>
                                </span>
                          </Button>
                          <Button
                                className="btn-icon-only rounded-circle"
                                color="primary"
                                type="button"
                              >
                                <span className="btn-inner--icon">
                                  <i className="fal fa-edit"></i>
                                </span>
                          </Button>
                        </td>
                      </tr>)
                    })
                  )
                })  
            }
            </tbody>
          </Table>
        </Col>
      </Row>
    </>
  );
}

export default StepLoadingMethod;
