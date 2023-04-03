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
    let url = `https://mail-box-c1116-default-rtdb.firebaseio.com/${email}/sentMail.json`;

    try {
      const res = await axios.get(url);

      if (res.status == 200) {
        const data = res.data;

        // Map over the data and extract the properties
        const mailList = Object.keys(data).map((key) => ({
          id: key,
          body: data[key].body,
          from: data[key].from,
          subject: data[key].subject,
          to: data[key].to,
        }));

        setMails(mailList);
        console.log('Got the sentBox');
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
            <p>To: {mail.to}</p>
            <p>Subject: {mail.subject}</p>
            <p>From: {mail.from}</p>
            <p>Description: {mail.body}</p>
          </Card>
        ))
      )}
    </React.Fragment>
  );
};

export default SentMail;
