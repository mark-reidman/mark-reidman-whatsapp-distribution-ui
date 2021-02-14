import React, { useContext,useEffect } from "react";
import {WizardContext, actionTypes} from './WizardContext.js'
// reactstrap components
import {
  Form,
  Row,
  Col,
} from "reactstrap";
import { Editor } from "@tinymce/tinymce-react";
import {PreventDelete} from './preventdelete.js'

const MessageEditStep = () => {
  const [ message, setMessage ] = React.useState("<span>some text that can be edited .</span><span class='mceNonEditable'>some</span>");
  const [state, dispatch] = useContext(WizardContext);

  const handleEditorChange2 = (e) => {
    if(message !== e.target.getContent()){

      var regex =/<span class='mceNonEditable'>+[\S]+<\/span>/ig;
      let res =  e.target.getContent().match(regex);
      console.log(res)
      if(res !== null) {
        dispatch({type: actionTypes.setCampaignMessage, payload: dispatch({type: actionTypes.setCampaignMessage, payload: e.target.getContent() }) })
      }
      else {
        e.preventDefault()
        setMessage(state.campaignMessage)
      }

      // setMessage(e.target.getContent());
      // dispatch({type: actionTypes.setCampaignMessage, payload: e.target.getContent() })
    }
  }

  const handleEditorChange = (content, editor) => {
    if(message !== content){
      
      var regex =/[\S]+<span class='mceNonEditable'>asas<\/span>/ig;
      let res = content.match(regex);
      
      if(res !== null) {
        dispatch({type: actionTypes.setCampaignMessage, payload: content })
      }
      else {

      }
    }
  }
  

  useEffect(() => {
    setMessage(message);
  })

  return (
    <>
      <Form
        className="p-3"
        id="contact-form-3"
        method="post"
        role="form"
      >
        <h3 className="align-center">הזן את תוכן ההודעה</h3>
        <Row>
          <Col md="12">
            <Editor
              apiKey="hhjz28kgt46r24kv8ftsmmpbt0hft1euvrkf17dwxa4kow01"
              onChange={handleEditorChange2}
              // onEditorChange={handleEditorChange}
              value={message}
              
              init={{
                // skin: false,
                // content_css: false,
                plugins: "emoticons directionality noneditable",
                toolbar: "bold emoticons | ltr rtl",
                toolbar_location: "bottom",
                directionality: "rtl",
                menubar: false,
                statusbar: false,
                contextmenu: false,
                width: "100%",
                height: "300"
              }}
            />
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default MessageEditStep;
