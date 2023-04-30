import DisplayPatientData from "./DisplayPatientData";
import { useState } from "react";
import "./DoctorView.css";
import "./Admin.css";

function AdminPatientView({user, logout, gotoHomePage, gotoStudy}) {
  const [nameSearch, setNameSearch] = useState("");
  const [idSearch, setIDSearch] = useState("");

  const [isChecked, setIsChecked] = useState(false);

  const filterEligible = isChecked;

  const clearSearch = () => {
    setIDSearch("");
    setNameSearch("");
  }
    
    return (
      <div className='managePatient'> 

      <div className='doctorNavbar' style={{backgroundColor: '#6fabd0'}}>
  
        <div className='doctorViewTitle'>
          <div className='janeHopkinsTitleText'>Jane Hopkins
            <div className='hospitalTitleText'>Hospital</div>
          </div>
        </div>
        <div className='displayEmail'>{user?.email}</div>
        <button className='signOutButton' onClick={logout} style={{border: 'black' }}>
          <div className='signOutIcon'></div>
          <div className='signOutText' style={{color: 'black' }}>Sign Out</div>
        </button>
      </div>
      
      <div className='doctorNavButtonLocations' >
          <div className="welcomeBro" style={{borderColor: '#6fabd0'}}>
              <button onClick = {gotoHomePage} className='welcomeContainer' style={{color: '#6fabd0'}}>Welcome Page</button>
          </div>

          <div className='addPatientBro' style={{borderColor: '#6fabd0'}}>
              <button onClick = {gotoStudy} style={{color: '#6fabd0'}}>Manage Study</button>
          </div>
        </div>
  
      <div className='patientSearchBox' style={{borderColor: '#6fabd0', width: '730px'}}>

        <div className='patientSearchBoxName'>Patient Search</div>

      <div className='patientNameSearch'>      
        <div className='patientNameSearchLabel'>Name</div>
          <input className='patientNameSearchBox' type="text" onChange = {(event) => {setNameSearch(event.target.value)}} value={nameSearch}/>
      </div>

      <div className='patientNameSearch' style={{marginLeft: '300px'}} >
        <div className='patientInsuranceSearchLabel'>Patient ID</div>
          <input className='patientInsuranceSearchBox' type="text" onChange = {(event) => {setIDSearch(event.target.value)}} value={idSearch}/>
      </div>

      <div className='patientNameSearch' style={{marginLeft: '590px'}} >
        <div className='patientNameSearchLabel'>Show Eligible</div>
        <input type="checkbox" checked = {isChecked} onChange={()=> setIsChecked(!isChecked)} className="admin-checkbox" style={{marginLeft: '30px'}}></input>
      </div>
  

      <div className='searchUndoLocations'>
          <button onClick = {clearSearch} className='searchButton'> Clear Search </button>
      </div>
      

    </div>

      <div className='patientTableLocation'>
        <DisplayPatientData nameSearch={nameSearch} idSearch={idSearch} isAdminView={true} filterEligible={filterEligible}/>
      </div>
  
    </div>
    );

}

export default AdminPatientView;