import React from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyEmail = ()=>{
const navigate = useNavigate();
async function verifyMail(){

const TokenId = localStorage.getItem('tokenId')

    try{
        const obj = {
            "requestType":"VERIFY_EMAIL",
            "idToken": TokenId,
            
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
        alert('Check your Email')
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

return(
<React.Fragment>

<Container>
<Button className='m-5' onClick={verifyMail}>Click To verify Your Email</Button>
</Container>

</React.Fragment>
)
}


export default VerifyEmail;


