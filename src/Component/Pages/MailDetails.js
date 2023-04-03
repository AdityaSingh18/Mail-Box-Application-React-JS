import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card } from "react-bootstrap";

const MailDetails = () => {
    const { id } = useParams();
    const [mail, setMail] = useState(null);
    const email = localStorage.getItem('email')

    const navigate =useNavigate();
  

   async function deleteMail(){

        try {
            const res = await axios.delete(`https://mail-box-c1116-default-rtdb.firebaseio.com/${email}/inboxMail/${id}.json`);
      
            if (res.status == 200) {
              const data = res.data;
            console.log(data)
            alert('Deleted')
            navigate('/inboxmail')
        
    
            } else {
              console.log(res);
              alert("Error Occured");
            }
          } catch (err) {
            alert(err.message);
          }

    }
    useEffect(() => {
      async function getMail() {
        try {
          const res = await axios.get(`https://mail-box-c1116-default-rtdb.firebaseio.com/${email}/inboxMail/${id}.json`);
    
          if (res.status == 200) {
            const data = res.data;
          console.log(data)
            // Set the mail state to the fetched data
            setMail({
              id: data.id,
              body: data.body,
              from: data.from,
              subject: data.subject,
              to: data.to,
              isRead: data.isRead
            });
          } else {
            console.log(res);
            alert("Error Occured");
          }
        } catch (err) {
          alert(err.message);
        }
      }

      const markMailAsRead = async (email, id) => {
        try {
          const res = await axios.patch(
            `https://mail-box-c1116-default-rtdb.firebaseio.com/${email}/inboxMail/${id}.json`,
            {
              isRead: true,
            }
          );
          if (res.status === 200) {
            console.log(`Mail ${id} marked as read.`);
          } else {
            console.log(`Error marking mail ${id} as read.`);
          }
        } catch (err) {
          console.log(`Error marking mail ${id} as read:`, err);
        }
      };
      
      markMailAsRead(email,id)
      getMail();
    }, [id]);
  
    if (!mail) {
      return <p>Loading...</p>;
    }
  
    return (
      <div>
        <Card className="m-5 p-5">
         <Card.Title>Subject: {mail.subject}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  From: {mail.from}
                </Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">
                  To: {mail.to}
                </Card.Subtitle>
                <Card.Text className='m-4'>{mail.body}</Card.Text>
                <Button onClick={deleteMail}>Delete Mail</Button>
              </Card>
         
      </div>
    );
};

export default MailDetails;
