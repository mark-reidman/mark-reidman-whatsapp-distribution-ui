import React, { useState } from "react";
// reactstrap components
import { Button, Label, FormGroup, Form, Input, Modal, Table, Progress, Badge } from "reactstrap";
import { phoneNumberCorrection, phoneNumberExtract, uniqueID } from './utils.js'

// Core Components

const CopyPasteModal = ({ modalOpen, setModalOpen, distributionList, setDistributionList }) => {
    
    const getCleanDataObj = () => {return { header: "טלפון", data: [] }}
    const [errorMessage, setErrorMessage] = useState("");
    const [data, setData] = useState(getCleanDataObj());
    const [inputValue, setInputValue] = useState("");

    const inputChangeHandler = (event) => {
        let val = event.target.value;

        if (val == undefined || val.trim() === "") {
            
            setErrorMessage("נא להזין מספרי טלפון חוקיים");
            setInputValue("")
            return false;
        }

        setInputValue(val)

        let phone_list = phoneNumberExtract(val);
        let local_data = { header: "טלפון", data: [] }

        if(phone_list == undefined || phone_list == null){
            setErrorMessage("נא להזין מספרי טלפון חוקיים");
            return;
        }
        
        phone_list.map((text, index) => {

            let phoneNumber = phoneNumberCorrection(text);
            if (phoneNumber !== "") {
                local_data.data.push(phoneNumber);
            }
        });
    
        if (local_data.data === 0) {
            setErrorMessage("No data found in input");
        } else {
           
            setData(local_data);
            setErrorMessage("");
        }
    };

    const clsoeModal = () => {
        setData(getCleanDataObj())
        setModalOpen(!modalOpen)
    }

    const addList = () => {
        let tmp = distributionList;
        if(data.data.length > 0) {
            if( tmp["copyPaste"] != undefined) {
                tmp["copyPaste"] = tmp["copyPaste"].concat({"data": data.data, id: uniqueID()})
            }
            else {
                tmp["copyPaste"] = [{"data": data.data, id: Date.now()}]
            }
            setDistributionList({
                ...tmp
            });
        }
        setModalOpen(!modalOpen)
        setInputValue("")
        setData(getCleanDataObj())
        setErrorMessage("")
    }

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
                        העלאת מספרים ידנית
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
                                {errorMessage != "" ? <Badge color="danger">{errorMessage}</Badge> : ""} העתק/הדבק או להזין ידנית מספרי טלפון
                            </Label>
                            <div className="input-group">
                                <Input
                                    id="exampleFormControlTextarea1"
                                    placeholder=""
                                    rows="6"
                                    spellCheck={false}
                                    value={inputValue}
                                    onChange={inputChangeHandler}
                                    type="textarea"
                                    >
                                </Input>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="campaign-tag" className="col-form-label float-right">
                                תצוגה מקדימה
                            </Label>
                        </FormGroup>

                        <div className="table">
                            <Table responsive striped className="align-center">
                                <thead className="text-primary">
                                    <tr>
                                        <th className="text-center">
                                            <div className="custom-control custom-checkbox">
                                                {data.header}
                                            </div>
                                        </th>
                                    </tr>
                                </thead>

                                <tbody key="priview">
                                    {data.data.slice(0,6).map((text, index) => {
                                        return (<tr key={String(index)}>
                                            <td>
                                                {text}
                                            </td>
                                        </tr>)
                                    })
                                    }
                                    { data.data.length > 6 && <tr key="footer-row"><td>...</td></tr>}
                                    {<tr key="total-row"><td>Total: {data.data.length}</td></tr>}
                                    {data.length === 0 && <tr key="1"><td colSpan={data.length}></td></tr>}
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

export default CopyPasteModal;
