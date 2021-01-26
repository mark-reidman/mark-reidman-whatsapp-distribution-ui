import React, {useContext} from "react";
import WizardContext from './WizardContext.js'

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

const StepLoadingMethod = () => {
    const [firstNameFocus, setFirstNameFocus] = React.useState("");
    const [emailFocus, setEmailFocus] = React.useState("");
    const {name, setName} = useContext(WizardContext)

    const [fileUplaodOpen, setFileUplaodOpen] = React.useState(false);

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
                        <i class="fal fa-file-excel wizard-big-icon green-color"></i>
                        <p className="title">קובץ אקסל</p>
                    </Button>
                    <StartCampaignModal modalOpen={fileUplaodOpen} setModalOpen={setFileUplaodOpen}/>
                    <Button
                        className="btn-footer selectUploadMethodButton"
                        color="secondary"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                    >
                        <i class="fal fa-stream wizard-big-icon green-color"></i>
                        <p className="title">העתק/הדבק</p>
                    </Button>
                    <Button
                        className="btn-footer selectUploadMethodButton"
                        color="secondary"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                    >
                        <i class="fal fa-cloud-download wizard-big-icon green-color"></i>
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
                        <tr>
                            <th scope="row">
                                <Media className="align-items-center">
                                    <i class="fal fa-file-excel wizard-big-icon"></i>
                                    <Media body>
                                        <span className="name mb-0 text-sm">file_name_x_y.csv</span>
                                    </Media>
                                </Media>
                            </th>
                            <td className="budget">450</td>
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
                          <i class="fal fa-trash-alt"></i>
                        </span>
                                </Button>
                                <Button
                                    className="btn-icon-only rounded-circle"
                                    color="primary"
                                    type="button"
                                >
                        <span className="btn-inner--icon">
                          <i class="fal fa-edit"></i>
                        </span>
                                </Button>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                <Media className="align-items-center">
                                    <i class="fal fa-file-excel wizard-big-icon"></i>
                                    <Media body>
                                        <span className="name mb-0 text-sm">file_name_z_k_u.csv</span>
                                    </Media>
                                </Media>
                            </th>
                            <td className="budget">2324</td>
                            <td>
                                <Badge className="badge-dot mr-4">
                                    <i className="bg-success"></i>
                                    <span className="status">completed</span>
                                </Badge>
                            </td>
                            <td className="text-right">
                                <Button
                                    className="btn-icon-only rounded-circle"
                                    color="danger"
                                    type="button"
                                >
                        <span className="btn-inner--icon">
                          <i class="fal fa-trash-alt"></i>
                        </span>
                                </Button>
                                <Button
                                    className="btn-icon-only rounded-circle"
                                    color="primary"
                                    type="button"
                                >
                        <span className="btn-inner--icon">
                          <i class="fal fa-edit"></i>
                        </span>
                                </Button>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                <Media className="align-items-center">
                                    <i class="fal fa-stream wizard-big-icon"></i>
                                    <Media body>
                                        <span className="name mb-0 text-sm">copy paste list</span>
                                    </Media>
                                </Media>
                            </th>
                            <td className="budget">30</td>
                            <td>
                                <Badge className="badge-dot mr-4">
                                    <i className="bg-danger"></i>
                                    <span className="status">delayed</span>
                                </Badge>
                            </td>
                            <td className="text-right">
                                <Button
                                    className="btn-icon-only rounded-circle"
                                    color="danger"
                                    type="button"
                                >
                        <span className="btn-inner--icon">
                          <i class="fal fa-trash-alt"></i>
                        </span>
                                </Button>
                                <Button
                                    className="btn-icon-only rounded-circle"
                                    color="primary"
                                    type="button"
                                >
                        <span className="btn-inner--icon">
                          <i class="fal fa-edit"></i>
                        </span>
                                </Button>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                <Media className="align-items-center">
                                    <i class="fal fa-cloud-download wizard-big-icon"></i>
                                    <Media body>
                                        <span className="name mb-0 text-sm">רשימה שמורה 1</span>
                                    </Media>
                                </Media>
                            </th>
                            <td className="budget">4561</td>
                            <td>
                                <Badge className="badge-dot mr-4">
                                    <i className="bg-info"></i>
                                    <span className="status">on schedule</span>
                                </Badge>
                            </td>
                            <td className="text-right">
                                <Button
                                    className="btn-icon-only rounded-circle"
                                    color="danger"
                                    type="button"
                                >
                        <span className="btn-inner--icon">
                          <i class="fal fa-trash-alt"></i>
                        </span>
                                </Button>
                                <Button
                                    className="btn-icon-only rounded-circle"
                                    color="primary"
                                    type="button"
                                >
                        <span className="btn-inner--icon">
                          <i class="fal fa-edit"></i>
                        </span>
                                </Button>
                            </td>
                        </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </>
    );
}

export default StepLoadingMethod;
