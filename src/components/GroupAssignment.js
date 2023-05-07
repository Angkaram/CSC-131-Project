import useJaneHopkins from '../hooks/useJaneHopkins';
import "./DoctorView.css";
import { useState, useEffect } from 'react';
import StudyResultsPopup from './StudyResults';

function AssignmentPopup({selectedStudy, togglePopup, isFDAView}) {
  const { entities } = useJaneHopkins();
  const [patients, setPatients] = useState([]);
  const [studyID, setStudyID] = useState([]);

  useEffect(() => {
      async function fetchPatientsAndStudies() {
        const patientList = await entities.patient.list();
        setPatients(patientList.items);
        
        const studyNew = await entities.study.get(selectedStudy._id);
        setStudyID(studyNew._id);
      }
  
      fetchPatientsAndStudies();
  }, [entities.patient]); 

  const [isOpen, setIsOpen] = useState(false);
  const togglePopupResults = () => {
    setIsOpen(!isOpen);
  }
  const handleReportClick = () => {
    togglePopupResults();
  }


  const patientsInStudy = patients.filter(patient => patient.assignedStudy === studyID);
  const getPatientListByDrug = (assignedDrug) => {
    if (assignedDrug === "Treatment") {
      const filteredPatients = patientsInStudy.filter(patient => patient.assignedDrug === "0187d449-fb67-cdea-1dfc-28ab89f0aeaf");
      const listPatients = filteredPatients.map(patient => <li key={patient._id}>{patient.name}</li>);

      return (
        <div>
          <h3>{assignedDrug} Patients: </h3>
          <ul>
            {listPatients}
          </ul>
        </div>
      );

    } else {
      const filteredPatients = patientsInStudy.filter(patient => patient.assignedDrug === "0187d449-b778-acbd-27c6-94b2a9be0287");
      const listPatients = filteredPatients.map(patient => <li key={patient._id}>{patient.name}</li>);

      return (
        <div>
          <h3>{assignedDrug} Patients: </h3>
          <ul>
            {listPatients}
          </ul>
        </div>
      );
    }

  }
  
  
  return (
    <div className="largeView">

        <div className="popup-content">

            <div className="popup-top">
                <h2>{selectedStudy.name} Group Assignment</h2>
                <button id="close" onClick={togglePopup}>X</button>
            </div>
            <div className="popup-middle" style={{ display: "flex", justifyContent: "space-between"}}>
              <div className="popup-section-container" style={{ width: "50%"}}>
                <div className="popup-section" style={{ width: "100%"}}>
                  {getPatientListByDrug('Treatment')}
                </div>
              </div>
              <div className="popup-section-container" style={{ width: "50%"}}>
                <div className="popup-section" style={{ width: "100%"}}>
                  {getPatientListByDrug('Control')}
                </div>
              </div>
            </div>
            <button className='add-patient' style={{border: '4px solid #0E619C', color: '#0E619C'}} onClick={togglePopupResults}>
              Create Result Report
            </button>
        </div>
        {isOpen && <StudyResultsPopup togglePopup={togglePopupResults} selectedStudy={selectedStudy} patientsInStudy={patientsInStudy} isFDAView={!isFDAView} />}
    </div>
  )
}

  export default AssignmentPopup;