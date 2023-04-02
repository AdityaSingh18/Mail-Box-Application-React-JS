import { MDBBtn, MDBCardBody, MDBCardTitle } from "mdb-react-ui-kit";
import { useRef } from "react";
import React from "react";
import { Form } from "react-bootstrap";
import { MDBInput } from "mdb-react-ui-kit";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";




 const ForgotPassword = ()=>{

const navigate = useNavigate();
    const emailRef = useRef();
   async function resetPassowrd(event){

event.preventDefault();

        try{
            const obj = {
                "requestType":"PASSWORD_RESET",
                "email": emailRef.current.value,
                
              };
              const head = {
                headers: {
                  "Content-Type": "application/json",
                },
              };
              const res = await axios.post(
                `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${process.env.REACT_APP_FireBaseAPI}`,
                obj,
                head
              );
              console.log(res)
            
            if (res.status==200) {
            alert('Check your Email For Reset Link')
            navigate('/mailbox',{replace:true})
            console.log(res)
        
            
            } else {
            const data = await res.json();
            
            throw new Error(data.error.message);
            }
    
    }
    catch(err){
        console.log(err)
    }
    }


    

    return (
<React.Fragment>
    <MDBCardBody>
        <Form>
            <MDBCardTitle>Enter Your Email</MDBCardTitle>
        <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email' ref={emailRef}/>
        <MDBBtn onClick={resetPassowrd}>Click Here to Send</MDBBtn>
        </Form>
        </MDBCardBody>
        </React.Fragment>
    )

}


export default ForgotPassword;