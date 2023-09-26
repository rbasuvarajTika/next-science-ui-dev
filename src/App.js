import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import AdminPage from './Components/AdminPage';
import { FaxTable } from './Components/FaxTable';
import ResetPassword from './Components/ResetPassword';
import ConfirmEmail from './Components/ConfirmEmail';
import { useAuth } from './AuthPage';
import EditUser from './Components/EditUser';
import CreateNewUser from './Components/CreateNewUser';
import { DuplicateFax } from './Components/DuplicateFax';
import RxTracker from './Components/RxTracker';
import { CaseDetail } from './Components/CaseDetail';
import PatientDetailsForm from './Components/PatientDetailsForm';

function App() {
  const { userRole } = useAuth(); // Get the user's role from the context
  console.log('userRole:', userRole);
  // Check if userRole is null or not present in localStorage
  const storedUserRole = localStorage.getItem('role');
  if (userRole === null && !storedUserRole) {
    return (
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
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
  // Define admin-specific routes
  const adminRoutes = [
    {
      path: '/adminpage',
      element: userRole === 'Admin' ? <AdminPage /> : <Navigate to="/" />,
    },
    {
      path: '/fax',
      element: userRole === 'User'? <FaxTable /> : <Navigate to="/" />,
    },
    {
      path: '/edit-user/:userId',
      element: userRole === 'Admin' ? <EditUser /> : <Navigate to="/" />,
    },
    {
      path: '/createnewuser',
      element: userRole === 'Admin' ? <CreateNewUser /> : <Navigate to="/" />,
    },
    {
      path: '/duplicatefax/:faxId',
      element: userRole === 'Admin' ? <DuplicateFax /> : <Navigate to="/" />,
    },
    {
      path: '/rxlist',
      element: userRole === 'Admin' ? <RxTracker /> : <Navigate to="/" />,
    },
    {
      path: '/casedetail',
      element: userRole === 'Admin' ? <CaseDetail /> : <Navigate to="/" />,
    },
    {
      path: '/patientdetails',
      element: userRole === 'Admin' ? <PatientDetailsForm /> : <Navigate to="/" />,
    },
  ];

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/confirmemail" element={<ConfirmEmail />} />
          <Route path="/resetpassword/:userId" element={<ResetPassword />} />
          {/* The "/fax" route is accessible to everyone */}
          <Route path="/fax" element={<FaxTable />} />
          {adminRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
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
