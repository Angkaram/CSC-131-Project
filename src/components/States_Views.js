import React, { useState, useEffect } from 'react';
import './loginprompt.css';
import "./loginprompt.js";
import './home.css';
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import { useNavigate, Link } from "react-router-dom";
import ValidateDomain from "./validation";
import AddPatientButton from './addButton.js';
import DisplayPatientData from './DisplayPatientData';
import './DoctorHomePage.css';
import ShipmentsButton from './ShipmentsButton';
import ContractsButton from './ContractsButton';
import DoctorView from './DoctorView';

let view;

function View() {
  
  // the email for the user is displayed.
  // changes based on state, role, and view
  // eslint-disable-next-line
  const [user, setUser] = useState(null);

  let navigate = useNavigate();
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      const user= {
        email: userAuth?.email,
        role: userAuth?.displayName,
        id: userAuth?.uid
      }
      if (userAuth) {
        console.log(userAuth)
        setUser(user)
      } else {
        setUser(null)
      }

      const logout = async () => {
        await signOut(auth);
        navigate("/");
      };

      
    
      // Validates the user
      let isValidated = ValidateDomain(user.email, user.role);
    
      // Checks their role and redirects them accordingly
      if (isValidated === true) {
        if (user.role === 'doctor') {
          view = <DoctorHomePage user = {user} LogOut = {logout} />;
        } else if (user.role === "fda") {
          view = <FDAView user = {user} LogOut = {logout}/>;
        } else if (user.role === "bavaria") {
          view = <BavariaView user = {user} LogOut = {logout}/>;
        }
    // If everything fails, kicks unauthorized user to the login page
    } else {
      navigate("/Login");
    }

    })

    return unsubscribe
// eslint-disable-next-line
  }, []);


  // styling
  return (
    <div>
      {view}
    </div>
  );
};

// what is shown on DoctorView
function DoctorHomePage({ user, LogOut}) {
  const navigate = useNavigate();
  const DoctorView = () => {
    navigate("/DoctorView", { state: { user } });
  };
  
  console.log(user?.email);
  return (
    <div className='fdabody'>
      <div className='doctorNavbar'>

<div className='doctorViewTitle'>
<div className='janeHopkinsTitleText'>Jane Hopkins</div>
<div className='hospitalTitleText'>Hospital</div>
</div>
<div className='displayEmail'>{user?.email}</div>
<button className='signOutButton' onClick={LogOut}>
<div className='signOutIcon'></div>
<div className='signOutText'>Sign Out</div>
</button>
</div>
<div className='container'>
            <h1 className="title"> Welcome, Doctor</h1>
            <div className="box-container">
            <div className="box">
        <div className="button-container">
        <button className="buttons"><h3>Manage Appointments</h3></button>
        </div>
        </div>
        <div className="box">
          <div className="button-container">
            <button className="buttons" onClick={() => DoctorView(user)}><h3>Manage Patients</h3></button>
          </div>
        </div>
            </div>
            
        </div>
        </div>
  );
}

// what is shown on FDAView. Line below h4 displays the user email logged in to FDA view
function FDAView({ user, LogOut }) {
  const patientId = '0186b496-32f6-9a7f-cdfe-1e37ab416338';
  const [searchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
  return (
    <div className='managePatient'> 

      <div className='doctorNavbar'style={{backgroundColor: '#08d3b4'}}>

        <div className='doctorViewTitle'>
          <div className='janeHopkinsTitleText' style={{left: '138px', top: '14px', color: 'white', fontFamily: 'Georgia'}}>FDA</div>
          <div className='hospitalTitleText' style={{fontSize: 25, textAlign: 'center', left: '0', top: '18px'}}>U.S. Food and Drug Administration</div>
        </div>
        <div className='displayEmail' style={{color: 'black'}}>{user?.email}</div>
        <button className='signOutButton' onClick={LogOut}>
          <div className='signOutIcon'></div>
          <div className='signOutText'style={{color: '#069882' }}>Sign Out</div>
        </button>
      </div>

      <div className='doctorNavButtonLocations'>
        <button onClick={togglePopup} className='addPatientContainer' style={{top: '0px', left: '350px', borderColor: '#08d3b4'}}>
          <div className='addPatientText' style={{left: '47px', color: 'black'}}>Manage Contracts</div>
        </button>
      </div>

      <div className='patientTableLocation' style={{top: '300px'}}>
        <DisplayPatientData searchTerm={searchTerm} patientId={patientId} isFDAView={true} />
      </div>
      {isOpen && <ContractsButton handleClose={togglePopup}/>}
    </div>
  );
}

// bavaria view (work in progress)
function BavariaView({ user, LogOut }) {
  const patientId = '0186b496-32f6-9a7f-cdfe-1e37ab416338';
  const [searchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
  return (
    <div className='managePatient'> 

      <div className='doctorNavbar'style={{backgroundColor: '#f46f74'}}>

        <div className='doctorViewTitle'>
          <div className='janeHopkinsTitleText' style={{left: '78px', top: '8px', color: 'white', fontFamily: 'Georgia'}}>Bavaria</div>
          <div className='hospitalTitleText' style={{textAlign: 'center', left: '0', top: '18px'}}>Pharmaceuticals</div>
        </div>
        <div className='displayEmail' style={{color: 'black'}}>{user?.email}</div>
        <button className='signOutButton' onClick={LogOut}>
          <div className='signOutIcon'></div>
          <div className='signOutText'style={{color: '#e7121a' }}>Sign Out</div>
        </button>
      </div>

      <div className='doctorNavButtonLocations'>
        <button onClick={togglePopup} className='addPatientContainer' style={{top: '0px', left: '350px', borderColor: '#f46f74'}}>
          <div className='addPatientText' style={{left: '43px', color: 'black'}}>Manage Shipments</div>
        </button>
      </div>

      <div className='patientTableLocation' style={{top: '300px'}}>
        <DisplayPatientData searchTerm={searchTerm} patientId={patientId} isBavariaView={true} />
      </div>
      {isOpen && <ShipmentsButton handleClose={togglePopup}/>}
    </div>
  );
}

export default View;

