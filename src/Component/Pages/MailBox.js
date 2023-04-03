import React, { useRef, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from "axios";



const MailBox = () => {
    const email = localStorage.getItem('email')
  const toRef = useRef();
  const subjectRef = useRef();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
async function sendHandler(event) {
  event.preventDefault();
  if (email=== "") return;
  const toMail = toRef.current.value;
  const tOformattedEmail = toMail.replace("@", "").replace(".", "");
  const mailObj = {
    from: email,
    to: toRef.current.value,
    subject: subjectRef.current.value,
    body:editorState.getCurrentContent().getPlainText(),
    isRead:false
  };

  const formattedEmail = email.replace("@", "").replace(".", "");
  const formattedToEmail = toRef.current.value
    .replace("@", "")
    .replace(".", "");

    const url =
    `${process.env.REACT_APP_FireBaseDataBase}/` +
      formattedEmail +
      "/sentMail.json";
  
    const response = await fetch(url, {
      method: "post",
      body: JSON.stringify(mailObj),
    });
  
    const data = await response.json();
  

  if (response.ok) {
    console.log(toRef.current.value)
    const url =
    `${process.env.REACT_APP_FireBaseDataBase}/` +
     `${tOformattedEmail}`+
    "/inboxMail.json";

  const response = await fetch(url, {
    method: "post",
    body: JSON.stringify(mailObj),
  });

  const data = await response.json();


    if (response.ok) alert("Email sent successfully");
  }
 
}





  

  return (
    <React.Fragment>
      <Container className="m-2">
        <Form>
          <MDBInput
            wrapperClass="mb-4"
            label="To"
            id="to"
            type="text"
            ref={toRef}
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Subject"
            id="subject"
            type="text"
            ref={subjectRef}
          />
          <Editor
            editorState={editorState}
            onEditorStateChange={setEditorState}
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            toolbarClassName="toolbar-class"
            placeholder="Description"
            aria-label="Description"
          />
          <MDBBtn onClick={sendHandler}>Send Mail</MDBBtn>
        </Form>
      </Container>
    </React.Fragment>
  );
};

export default MailBox;
