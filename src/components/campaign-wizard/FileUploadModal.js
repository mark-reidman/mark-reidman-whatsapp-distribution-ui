import React, { useState } from "react";
import { ExcelRenderer } from "react-excel-renderer";
// reactstrap components
import { Button, Label, FormGroup, Form, Input, Modal, Table, Progress, Badge } from "reactstrap";
import { phoneNumberCorrection, uniqueID} from './utils.js'

// Core Components

const StartCampaignModal = ({ modalOpen, setModalOpen, distributionList, setDistributionList }) => {
    const [errorMessage, setErrorMessage] = useState("");
    const [data, setData] = useState([]);
    const [fileName, setFileName] = useState("");

    const fileHandler = (event) => {
        let fileObj = event.target.files[0];

        if (!fileObj) {
            setErrorMessage("No file uploaded!");
            return false;
        }

        if (
            !(
                fileObj.type === "application/vnd.ms-excel" ||
                fileObj.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            )
        ) {
            setErrorMessage("Unknown file format. Only Excel files are uploaded!");
            return false;
        }

        // save fileName
        setFileName(fileObj.name)

        //just pass the fileObj as parameter
        ExcelRenderer(fileObj, (err, resp) => {
            if (err) {
                console.log(err);
            }
            else {

                let local_data = {}
                resp.rows[0].map((item, index) => {
                    local_data[index] = { header: item, selectedVal: "none", isNameField: undefined, isPhoneField: undefined, colData: [] }
                });

                resp.rows.slice(1).map((row, index) => {

                    if (row === "undefined") {
                        return "";
                    }

                    row.map((cell, cellIndex) => {
                        let phoneNumber = phoneNumberCorrection(cell);
                        if (phoneNumber.startsWith("972") && phoneNumber.length == 12) {
                            if (local_data[cellIndex].isPhoneField == undefined){
                                local_data[cellIndex].isPhoneField = true;
                                local_data[cellIndex].isNameField = false;
                            }
                        }
                        else if (phoneNumber != ""){
                            if (local_data[cellIndex].isNameField == undefined){
                                local_data[cellIndex].isNameField = true;
                                local_data[cellIndex].isPhoneField = false;
                            }
                        }
                        local_data[cellIndex].colData.push(phoneNumber);
                    });
                });


                if (local_data.length === 0) {
                    setErrorMessage("No data found in file!");
                    return false;
                } else {
                    // take only columns with phones
                    let phone_columns = {}

                    Object.keys(local_data).map((key) => {
                        // if (local_data[key].isPhoneField)
                        //     phone_columns[key] = local_data[key]
                        phone_columns[key] = local_data[key]
                    });
                    setData(phone_columns);
                    setErrorMessage("");
                }
            }
        });
        return false;
    };

    const clsoeModal = () => {
        setData([])
        setModalOpen(!modalOpen)
    }

    const selectColumn = (e) => {
        
        const id = e.target.id;
        const val = e.target.value;
        
        if (e.target != null) {
            setData((prevState) => {
                let newState = prevState
                newState[id].selectedVal = val;
                Object.keys(newState).map((key) => {
                    if (key != id){
                        if (val == "name" && newState[key].selectedVal == "name") {
                            newState[key].selectedVal = "none";
                        }
                        if (val == "phone" && newState[key].selectedVal == "phone") {
                            newState[key].selectedVal = "none";
                        }
                    }
                }); 
                
                return ({
                    ...newState
                });
            }, []);
        }
    }

    const addList = () => {
        let phoneLists = []
        let phoneIndex = undefined;
        let nameIndex = undefined;
        Object.keys(data).map((key) => {
            if (data[key].isPhoneField) {
                phoneIndex = key;
            }
            if (data[key].isNameField) {
                nameIndex = key;
            }
        });

        let tuples = []
        for (let i = 0; i < data[phoneIndex].colData.length; i++) {
            let phn = data[phoneIndex].colData[i];
            let nm = "";
            if (i < data[nameIndex].colData.length){
                nm = data[nameIndex].colData[i]
            }
            tuples.push({"phone": phn, "name": nm})
        }
        
        phoneLists.push({"fileType": "excel" ,"fileName": fileName, "column": data[phoneIndex].header, "column_name": data[nameIndex].header,"data": tuples, id: uniqueID()})

        // Object.keys(data).map((key) => {
        //     // TODO - create tuples of name and phone to send to server
        //     if (data[key].isPhoneField) {
        //         tuples = []
        //         for (let i = 0; i < data[key].colData.length; index++) {
        //             phn = data[key].colData[i]
        //             nm = ""
        //             tuples.push(data[key].colData[i])
        //         }
        //         dto = {"fileType": "excel" ,"fileName": fileName, "column": data[key].header, "data": data[key].colData, id: uniqueID()}
        //         phoneLists.push()
        //     }
        // });
        let tmp = distributionList;
        if( tmp["files"] != undefined){
            tmp["files"] = tmp["files"].concat(phoneLists)
        }
        else {
            tmp["files"] = phoneLists
        }
        setDistributionList({
            ...tmp
          });
        setModalOpen(!modalOpen)
        setFileName("")
        setData([])
        setErrorMessage("")
    }

    const firstTenRows = [1, 2, 3, 4, 5, 6]

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
                        העלאת קובץ
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
                    <Form>
                        <FormGroup>
                            <Label htmlFor="file-uplaod-input" className="col-form-label float-right">
                                {errorMessage != "" ? <Badge color="danger">{errorMessage}</Badge> : ""} בחר קובץ
                            </Label>
                            <div className="input-group">
                                <Input
                                    type="file"
                                    className="custom-file-input"
                                    id="file-uplaod-input"
                                    onChange={fileHandler}
                                    name="file-uplaod-input"
                                    aria-describedby="inputGroupFileAddon01"
                                />
                                <label className="custom-file-label" htmlFor="inputGroupFile01">
                                    {fileName !== "" ? fileName : "ניתן לבחור רק קבצי אקסל "}
                                </label>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="campaign-tag" className="col-form-label float-right">
                                   בחר שדות מייצגים מספר טלפון ושם לקוח
                            </Label>
                        </FormGroup>

                        <div className="table">
                            <Table responsive striped className="align-center">
                                <thead className="text-primary">
                                    <tr>
                                        {
                                            Object.keys(data).map((key) => {

                                                return (<th className="text-center">
                                                    <div className="custom-control custom-checkbox">
                                                    <Input style={{ height: "25px", padding: "0 0.75rem" }}
                                                        id={key}
                                                        name="column-type"
                                                        value={data[key].selectedVal}
                                                        onChange={selectColumn}
                                                        type="select"
                                                    >
                                                        <option defaultValue="none" placeholder="true">בחר</option>
                                                        <option value="phone" disabled={!data[key].isPhoneField}>מס טלפון</option>
                                                        <option value="name" disabled={!data[key].isNameField}>שם לקוח</option>
                                                    </Input>
                                                        {/* <input
                                                            className="custom-control-input"
                                                            checked={data[key].isSelectedByUser}
                                                            onChange={selectColumn}
                                                            id={key}
                                                            type="radio"
                                                        ></input>
                                                        <label
                                                            className="custom-control-label"
                                                            htmlFor={key}
                                                        ></label> */}
                                                        {data[key].header}
                                                    </div>
                                                </th>)
                                            })
                                        }
                                    </tr>
                                </thead>

                                <tbody key="priview">
                                    {firstTenRows.map((row, index) => {
                                        return (<tr key={String(index)}>
                                            {Object.keys(data).map((key) => {
                                                return (<td>
                                                    {data[key].colData.length > index ? data[key].colData[index] : ""}
                                                </td>)
                                            })}
                                        </tr>)
                                    })
                                    }
                                    {<tr key="footer-row">
                                        {Object.keys(data).map((key) => {
                                            return (<td>{data[key].colData.length > firstTenRows.length ? "..." : ""}</td>)
                                        })}
                                    </tr>}
                                    {<tr key="total-row">
                                        {Object.keys(data).map((key) => {
                                            return (<td>Total: {data[key].colData.length}</td>)
                                        })}
                                    </tr>}
                                    {data.length === 0 && <tr key="1"><td colSpan={data.length}>לא נבחר קובץ</td></tr>}
                                </tbody>
                            </Table>
                        </div>
                        <Button className="float-right" color="primary" type="button" onClick={addList}>
                            הוסף לרשימה
                        </Button>
                    </Form>
                </div>
            </Modal>
        </>
    );
}

export default StartCampaignModal;
