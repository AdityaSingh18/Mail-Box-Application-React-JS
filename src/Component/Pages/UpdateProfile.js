import React, { useRef,useEffect, useState } from "react";
import { Form ,InputGroup,ListGroup,Button} from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";


const UpdateProfile = ()=>{
const navigate = useNavigate();

const TokenId = localStorage.getItem('tokenId')
const [userData,setUserData]= useState('')

const setData = (data)=>{
setUserData(data)
}


const fullNameRef = useRef();
const urlRef = useRef();

 async function updateDetails(event){
event.preventDefault();
    const fullname = fullNameRef.current.value;
    const urLPhoto = urlRef.current.value;



    
try{
    const obj = {
        "idToken": TokenId,
        "displayName": fullname,
        "photoUrl": urLPhoto,
        "returnSecureToken": true,
      };
      const head = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.REACT_APP_FireBaseAPI}`,
        obj,
        head
      );
      console.log(res)
    
    if (res.status==200) {
    alert('User has successfully signed up.')
    navigate('/expensetracker',{replace:true})
    console.log(res)

    
    } else {
    const data = await res.json();
    
    throw new Error(data.error.message);
    }

    } catch (err) {
        console.log(err)
    alert(err.message);
    }
     }

     useEffect(() => {
        async function getData() {
          try {
            console.log(TokenId);
            const obj1 = {
              idToken: TokenId,
            };
            const head = {
              headers: {
                "Content-Type": "application/json",
              },
            };
            const resData = await axios.post(
              `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.REACT_APP_FireBaseAPI}`,
              obj1
            );
    
            console.log(resData.data.users[0])
            setData(resData.data.users[0])
            // localStorage.setItem('userData',resData.data.users[0]);
            // console.log(localStorage.getItem('userData').displayName)
            // console.log(userData)
           
          } catch (err) {
            alert("somthing went wrong");
          }
        }
        getData();
      }, []);
return(
<React.Fragment>
<Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Full Name</Form.Label>
        <Form.Control type="text" placeholder={userData.displayName}ref={fullNameRef} />
        <Form.Text className="text-muted">
          We'll never share your details with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Profile Photo URL</Form.Label>
        <Form.Control type="text" placeholder={userData.photoUrl} ref={urlRef}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
      
      </Form.Group>
      <Button variant="primary" type="submit" onClick={updateDetails}>
        Submit
      </Button>
    </Form>
    </React.Fragment>
)
}


export default UpdateProfile;