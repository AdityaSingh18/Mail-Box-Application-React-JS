import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import axios from "axios";

const SentMail = () => {
  const email = localStorage.getItem("email");
  const [mails, setMails] = useState([]);

  useEffect(() => {
    getMails();
  }, []);

  async function getMails() {
    let url = `https://mail-box-c1116-default-rtdb.firebaseio.com/${email}.json`;

    try {
      const res = await axios.get(url);

      if (res.status == 200) {
        const data = res.data;

        // Parse body property as JSON object
        const mailList = Object.values(data).map((mail) => ({
          ...mail,
          body: JSON.parse(mail.body)
        }));

        setMails(mailList);
        alert("Got the Mail");
      } else {
        console.log(res);
        alert("Error Occured");
      }
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <React.Fragment>
      {mails.length === 0 ? (
        <p>No mails to show</p>
      ) : (
        mails.map((mail) => (
          <Card className="m-3 p-2" key={mail.id}>
            <p>To: {mail.body.to && mail.body.to.value}</p>
            <p>Subject: {mail.body.subject}</p>
            <p>Description: {mail.body.description}</p>
          </Card>
        ))
      )}
    </React.Fragment>
  );
};

export default SentMail;
