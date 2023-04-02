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
function sendHandler(event) {
  event.preventDefault();

  const to = toRef.current.value;
  const subject = subjectRef.current.value;
  const description = editorState.getCurrentContent().getPlainText();

  // Extract the relevant data from the `toRef.current` object
  const toData = {
    value: toRef.current.value,
    type: toRef.current.type,
    name: toRef.current.name,
    // ... other properties you need
  };

  async function sendData() {
    let url = `https://mail-box-c1116-default-rtdb.firebaseio.com/${email}.json`;

    try {
      const res = await axios.post(url, {
        method: "PUT",
        body: JSON.stringify({
          to: toData, // send the extracted data instead of the entire object
          subject: subject,
          description: description,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
    
        alert("sent the Mail");
      } else {
        console.log(res)
        alert('Error Occured')
      }
    } catch (err) {
      alert(err.message);
    }
  }

  sendData();
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
