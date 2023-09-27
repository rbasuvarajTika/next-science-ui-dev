import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import AdminPage from './Components/AdminPage';
import { FaxTable } from './Components/FaxTable';
import ResetPassword from './Components/ResetPassword';
import ConfirmEmail from './Components/ConfirmEmail';
import EditUser from './Components/EditUser';
import CreateNewUser from './Components/CreateNewUser';
import { DuplicateFax } from './Components/DuplicateFax';
import RxTracker from './Components/RxTracker';
import { CaseDetail } from './Components/CaseDetail';
import PatientDetailsForm from './Components/PatientDetailsForm';
import { PrivateRoute } from './Routes/PrivateRoute'; // Import the PrivateRoute component

function App() {
  // ...

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/confirmemail" element={<ConfirmEmail />} />
          <Route path="/resetpassword/:userId" element={<ResetPassword />} />
          <PrivateRoute path="/adminpage" element={<AdminPage />} allowedRoles={['Admin']} />
          <PrivateRoute path="/fax" element={<FaxTable />} allowedRoles={['Admin', 'User']} />
          <PrivateRoute path="/edit-user/:userId" element={<EditUser />} allowedRoles={['Admin']} />
          <PrivateRoute path="/createnewuser" element={<CreateNewUser />} allowedRoles={['Admin']} />
          <PrivateRoute path="/duplicatefax/:faxId" element={<DuplicateFax />} allowedRoles={['Admin']} />
          <PrivateRoute path="/rxlist" element={<RxTracker />} allowedRoles={['Admin']} />
          <PrivateRoute path="/casedetail" element={<CaseDetail />} allowedRoles={['Admin']} />
          <PrivateRoute path="/patientdetails" element={<PatientDetailsForm />} allowedRoles={['Admin']} />
          {/* Handle redirection to a 404 page for unknown routes */}
          <Route
            path="*"
            element={
              <div>
                <p>404 - Page Not Found</p>
              </div>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
