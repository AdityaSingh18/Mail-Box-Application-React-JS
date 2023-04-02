import React, { useEffect, useRef, useState } from 'react';
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store';



const Login = ()=>{

   const dispatch = useDispatch();
  
  
  

 

 const navigate = useNavigate();
  const signUpEmailRef =useRef('')
  const signUpPasswordRef =useRef('')
 const signUpConfirmPasswordRef = useRef('')

 const signInEmailRef = useRef('');
 const signInPasswordRef  = useRef('');


 async function signInHandler(event){

event.preventDefault();

const email = signInEmailRef.current.value;
const password = signInPasswordRef.current.value
console.log(email,password)
let url =
`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FireBaseAPI}`

try {
const res = await fetch(url, {
method: 'POST',
body: JSON.stringify({
  email: email,
  password: password,
  returnSecureToken: true,
}),
headers: {
  'Content-Type': 'application/json',
},
});

if (res.ok) {
  
const data = await res.json();
const convertedData = JSON.stringify(data)
navigate('/mailbox',{replace:true})
localStorage.setItem('token', convertedData);
localStorage.setItem('tokenId', data.idToken);
const emailWithoutDot = email.replace(/\./g, '');
const emailWithoutAt = emailWithoutDot.replace(/@/g, '');
localStorage.setItem('email',emailWithoutAt)
dispatch(authActions.setToken(data.idToken));
dispatch(authActions.loggedIn(true));




} else {
const data = await res.json();
throw new Error(data.error.message);
}
} catch (err) {
alert(err.message);
}
 }

 async function signUpHandler(event){
 
event.preventDefault();

if(signUpPasswordRef.current.value==signUpConfirmPasswordRef.current.value){

  let url =
  `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FireBaseAPI}`
  
  try {
  const res = await fetch(url, {
  method: 'POST',
  body: JSON.stringify({
    email: signUpEmailRef.current.value,
    password: signInPasswordRef.current.value,
    returnSecureToken: true,
  }),
  headers: {
    'Content-Type': 'application/json',
  },
  });
  
  if (res.ok) {
    console.log(res)
  alert('User has successfully signed up.')
  navigate('/expensetracker',{replace:true})
  const data = await res.json();
  const convertedData = JSON.stringify(data)
  localStorage.setItem('tokenId', data.idToken);
  
  } else {
  const data = await res.json();
  
  throw new Error(data.error.message);
  }
  } catch (err) {
  alert(err.message);
  }
   }


else{
  alert('Check Password')
}
}





  const [justifyActive, setJustifyActive] = useState('tab1');;

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

      <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
            Login
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
            Register
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>

        <MDBTabsPane show={justifyActive === 'tab1'}>

          <div className="text-center mb-3">
            <p>Sign in with:</p>

            <div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>
              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='facebook-f' size="sm"/>
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='twitter' size="sm"/>
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='google' size="sm"/>
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='github' size="sm"/>
              </MDBBtn>
            </div>

            <p className="text-center mt-3">or:</p>
          </div>

          <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email' ref={signInEmailRef}/>
          <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' ref={signInPasswordRef}/>

          <div className="d-flex justify-content-between mx-4 mb-4">
            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
           <Link  to= "forgotpassword">Forgot password?</Link>
          </div>

          <MDBBtn className="mb-4 w-100" onClick={signInHandler}>Sign in</MDBBtn>
          <p className="text-center">Not a member? <a href="#!">Register</a></p>

        </MDBTabsPane>

        <MDBTabsPane show={justifyActive === 'tab2'}>

          <div className="text-center mb-3">
            <p>Sign un with:</p>

            <div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>
              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='facebook-f' size="sm"/>
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='twitter' size="sm"/>
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='google' size="sm"/>
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='github' size="sm"/>
              </MDBBtn>
            </div>

            <p className="text-center mt-3">or:</p>
          </div>

          
      
          <MDBInput wrapperClass='mb-4' label='Email' type='email' ref={signUpEmailRef}/>
          <MDBInput wrapperClass='mb-4' label='Password' type='password' ref={signUpPasswordRef}/>
          <MDBInput wrapperClass='mb-4' label='Password' type='password' ref={signUpConfirmPasswordRef}/>

          <div className='d-flex justify-content-center mb-4'>
            <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I have read and agree to the terms' />
          </div>

          <MDBBtn className="mb-4 w-100" onClick={signUpHandler}>Sign up</MDBBtn>

        </MDBTabsPane>

      </MDBTabsContent>

    </MDBContainer>
    
  );
}

export default Login;