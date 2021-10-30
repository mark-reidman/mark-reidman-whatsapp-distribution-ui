import React, { useState, useEffect } from "react";
// reactstrap components
import { Button, Label, FormGroup, Form, Input, Modal, Table, Progress, Badge, Media } from "reactstrap";
import { phoneNumberCorrection, uniqueID} from './utils.js'
import {OrderService} from '../../services/OrderService.js'
import clsx from 'clsx';
// Core Components

const PriviousListModal = ({ modalOpen, setModalOpen, distributionList, setDistributionList }) => {
    const [priviousDistributionList, setPriviousDistributionList] = React.useState({});
    const [errorMessage, setErrorMessage] = useState("");
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    const clsoeModal = () => {
        setData([])
        setModalOpen(!modalOpen)
    }

    const selectList = (item) => {
        //console.log(item);
        
        let tmp = distributionList;
        if (item["fileType"] != undefined) {
            if( tmp["files"] != undefined){
                tmp["files"] = tmp["files"].concat(item)
            }
            else {
                tmp["files"] = [item]
            }
        }
        else{
            if( tmp["copyPaste"] != undefined) {
                tmp["copyPaste"] = tmp["copyPaste"].concat({"data": item["data"], id: uniqueID()})
            }
            else {
                tmp["copyPaste"] = [{"data": item["data"], id: Date.now()}]
            }
        }
        setDistributionList({
            ...tmp
          });
        setModalOpen(!modalOpen)
    }

    useEffect(() => {
        let service = new OrderService();
        setIsLoading(true);

        service.getAllDistributionLists().then((res) => { 
            let filePhoneLists = [];
            let copyPasteLists = [];
            
            if(res.data != null){
                res.data.map((lst) => {
                    if (lst["list_type"] == "files"){
                        filePhoneLists.push({"fileType": lst["file_type"] ,"fileName": lst["file_name"], "column": lst["file_column"], "data": lst["phones"], "id": lst["id"]})
                    }
                    else if(lst["list_type"] == "copyPaste") {
                        copyPasteLists.push({"data": lst["phones"], id: lst["id"]})
                    }
                });
                setPriviousDistributionList({"copyPaste": copyPasteLists, "files": filePhoneLists});
            }

            setIsLoading(false);
        });
     },[]);

    return (
        <>
            <Modal
                isOpen={modalOpen}
                toggle={clsoeModal}
                className="modal-lg"
                modalClassName=" bd-example-modal-lg"
            >
                <div className="modal-header">
                    <h5 className="modal-title float-right" id="exampleModalLabel">
                        רשימות שמורות
                    </h5>
                    <button
                        aria-label="Close"
                        className="close"
                        onClick={clsoeModal}
                        type="button"
                    >
                        <span aria-hidden={true}>×</span>
                    </button>
                </div>
                <div className="modal-body bg-secondary">
                    <Label className="col-form-label float-right">
                            בחר רשימה שמורה
                    </Label>
                    <Table className="align-items-center table-flush" responsive>
                        <thead className="thead-light">
                        <tr>
                            <th scope="col"></th>
                            <th className="sort" data-sort="status" scope="col">
                            סטאטוס
                            </th>
                            <th className="sort" data-sort="amount" scope="col">
                            כמות
                            </th>
                            <th className="sort" data-sort="type" scope="col">
                            שם
                            </th>
                            <th className="sort" data-sort="type" scope="col">
                            סוג
                            </th>
                        </tr>
                        </thead>
                        <tbody className="list">
                            {Object.keys(priviousDistributionList).length === 0 && <tr key="1"><td colSpan="4">לא נבחרו רשימות</td></tr>}
                            {Object.keys(priviousDistributionList).map((key) => {
                                return(
                                    priviousDistributionList[key].map((item, ind) => {
                                    return(<tr>
                                        <td scope="row">
                                            <Button
                                            color="success"
                                            onClick={(e) => selectList(item)}
                                            size="sm"
                                            >
                                                המשך                                            
                                            </Button>
                                        </td>
                                        <td>
                                            <Badge className="badge-dot mr-4">
                                                <i className="bg-warning"></i>
                                                <span className="status">pending</span>
                                            </Badge>
                                        </td>
                                        <td className="name mb-0 text-sm">
                                            {item.data.length}
                                        </td>
                                        <td className="name mb-0 text-sm">
                                            {key == "files" ? item.fileName + " - " + item.column : ""}
                                            {key == "copyPaste" ? "רשימה ידנית" : ""}
                                        </td>
                                        <td className="text-right">
                                            <Media className="align-items-center" style={{display: "block"}}>
                                                <i className={clsx("fal", "wizard-big-icon", 
                                                (key == "files" && item.fileType === "excel") ? "fa-file-excel" : "",
                                                (key == "copyPaste") ? "fa-stream" : "", 
                                                (key == "savedList" === "fa-cloud-download") ? "fa-stream" : "")}></i>
                                            </Media>
                                        </td>
                                    </tr>)
                                    })
                                )
                                })  
                            }
                            </tbody>
                    </Table>
                </div>
            </Modal>
        </>
    );
}

export default PriviousListModal;
