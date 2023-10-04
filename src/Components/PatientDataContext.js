import React, { createContext, useContext, useState } from 'react';

const PatientDataContext = createContext();

export function PatientDataProvider({ children }) {
  const [patientData, setPatientData] = useState(null);

  const setPatient = (data) => {
    setPatientData(data);
  };

  return (
    <PatientDataContext.Provider value={{ patientData, setPatient }}>
      {children}
    </PatientDataContext.Provider>
  );
}

export function usePatientData() {
  const context = useContext(PatientDataContext);
  if (!context) {
    throw new Error('usePatientData must be used within a PatientDataProvider');
  }
  return context;
}
