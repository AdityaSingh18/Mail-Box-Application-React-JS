import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../store";
import { Link } from "react-router-dom";
const InboxMail = ()=>{
    const email = localStorage.getItem("email");
    const dispatch =useDispatch();

    const [count,setCount] = useState(0);

    function settingCount(count){

        setCount(count)
    }
    

    const mails = useSelector(state=>state.mail.inboxMail);
  
    useEffect(() => {

      setInterval(()=>{
        getMails();
      },2000)  
      countUnreadMails()
    }, []);
  
    async function getMails() {
      let url = `https://mail-box-c1116-default-rtdb.firebaseio.com/${email}/inboxMail.json`;
  
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
            isRead:data[key].isRead
          }));
  
           dispatch(mailActions.replaceEmails(mailList))
          console.log('loaded the inbox');
        } else {
          console.log(res);
          alert("Error Occured");
        }
      } catch (err) {
        alert(err.message);
      }
    }


    const countUnreadMails = async () => {
        const email = localStorage.getItem('email');
        try {
          const res = await axios.get(`https://mail-box-c1116-default-rtdb.firebaseio.com/${email}/inboxMail.json`);
          let count = 0;
          for (const key in res.data) {
            if (!res.data[key].isRead) {
              count++;
            }
          }
          setCount(count);
        } catch (err) {
          console.log(err);
        }
      };


console.log(mails)
    return (
        <React.Fragment>
            <h5>Total Unread :{count}</h5>
            {mails && mails.length > 0 ? (
  mails.map((mail) => (
    <Link to={`/mail/${mail.id}`} key={mail.id}>
      <Card className="m-3 p-2">
        <Card.Title>{mail.subject}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          From: {mail.from}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          To: {mail.to}
        </Card.Subtitle>
        <Card.Text>{mail.isRead && ' Already seen '}</Card.Text>
      </Card>
    </Link>
    
  ))
) : (
  <p>No mails to show</p>
)}

      </React.Fragment>
    );


}


export default InboxMail;