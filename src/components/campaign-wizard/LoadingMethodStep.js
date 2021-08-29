import React, {useContext, useEffect} from "react";
import {WizardContext, actionTypes} from './WizardContext.js'
import clsx from 'clsx';
// reactstrap components
import {
  Button,
  Row,
  Col,
  Badge,
  Media,
  Table,
} from "reactstrap";

import StartCampaignModal from './FileUploadModal.js'
import CopyPasteModal from './CopyPasteModal.js'
import PriviousListModal from './PriviousListModal.js'

const LoadingMethodStep = () => {
  const [distributionList, setDistributionList] = React.useState({});
  const [fileUplaodOpen, setFileUplaodOpen] = React.useState(false);
  const [copyPasteOpen, setCopyPasteOpen] = React.useState(false);
  const [savedListOpen, setSavedListOpen] = React.useState(false);
  const [state, dispatch] = useContext(WizardContext);

  const deleteLoadingMethod = (key, id) => {
    let tmp = distributionList;
    tmp[key] = tmp[key].filter((obj) => { return obj.id !== id })
    updateDistributionList({...tmp })
  }

  const updateDistributionList = (val) =>{
    dispatch({type: actionTypes.setDistributionList, payload: val })
    setDistributionList(val);
  }

  useEffect(() => {
    setDistributionList(state.distributionList);
  })


  return (
    <>
      <Row style={{ marginTop: '60px', marginBottom: '20px' }}>
        <Col className="mb-md-4 mb-lg-0 align-center" lg="12" md="12">
          <Button
            className="btn-footer selectUploadMethodButton"
            color="secondary"
            href=""
            onClick={(e) => setFileUplaodOpen(!fileUplaodOpen)}
          >
            <i className="fal fa-file-excel wizard-big-icon green-color"></i>
            <p className="title">קובץ אקסל</p>
          </Button>
          <StartCampaignModal modalOpen={fileUplaodOpen} setModalOpen={setFileUplaodOpen} distributionList={distributionList} setDistributionList={updateDistributionList} />
          {/* <Button
            className="btn-footer selectUploadMethodButton"
            color="secondary"
            href="#pablo"
            onClick={(e) => setCopyPasteOpen(!copyPasteOpen)}
          >
            <i className="fal fa-stream wizard-big-icon green-color"></i>
            <p className="title">העתק/הדבק</p>
          </Button>
          <CopyPasteModal modalOpen={copyPasteOpen} setModalOpen={setCopyPasteOpen} distributionList={distributionList} setDistributionList={updateDistributionList}  /> */}
          {/* <Button
            className="btn-footer selectUploadMethodButton"
            color="secondary"
            href="#pablo"
            onClick={(e) => setSavedListOpen(!savedListOpen)}
          >
            <i className="fal fa-cloud-download wizard-big-icon green-color"></i>
            <p className="title">רשימות שמורות</p>
          </Button>
          <PriviousListModal modalOpen={savedListOpen} setModalOpen={setSavedListOpen} distributionList={distributionList} setDistributionList={updateDistributionList} /> */}
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
            {Object.keys(distributionList).length === 0 && <tr key="1"><td colSpan="4">לא נבחרו רשימות</td></tr>}
            {
              Object.keys(distributionList).map((key) => {
                  return(
                    distributionList[key].map((item, ind) => {
                      return(<tr>
                        <td scope="row">
                          <Media className="align-items-center" style={{display: "block"}}>
                            <i className={clsx("fal", "wizard-big-icon", 
                              (key == "files" && item.fileType === "excel") ? "fa-file-excel" : "",
                              (key == "copyPaste") ? "fa-stream" : "", 
                              (key == "savedList" === "fa-cloud-download") ? "fa-stream" : "")}></i>
                        </Media>
                        </td>
                        <td className="name mb-0 text-sm">
                          {key == "files" ? item.fileName + " - " + item.column : ""}
                          {key == "copyPaste" ? "רשימה ידנית" : ""}
                        </td>
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
                                onClick={() => deleteLoadingMethod(key, item.id)}
                              >
                                <span className="btn-inner--icon">
                                  <i className="fal fa-trash-alt"></i>
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

export default LoadingMethodStep;
