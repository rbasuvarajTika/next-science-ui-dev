import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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

  // If userRole is null, display a loading message or indicator.
  if (userRole === null) {
    return <div>Loading...</div>;
  }

  // Define common routes accessible to all users
  const commonRoutes = [
    {
      path: '/',
      component: LoginPage,
    },
    {
      path: '/confirmemail',
      component: ConfirmEmail,
    },
    {
      path: '/resetpassword/:userId',
      component: ResetPassword,
    },
    // Add other common routes here
  ];

  // Define admin-specific routes
  const adminRoutes = [
    {
      path: '/adminpage',
      component: AdminPage,
    },
    {
      path: '/fax',
      component: FaxTable,
    },
    {
      path: '/edit-user/:userId',
      component: EditUser,
    },
    {
      path: '/createnewuser',
      component: CreateNewUser,
    },
    {
      path: '/duplicatefax/:faxId',
      component: DuplicateFax,
    },
    {
      path: '/rxlist',
      component: RxTracker,
    },
    {
      path: '/casedetail',
      component: CaseDetail,
    },
    {
      path: '/patientdetails',
      component: PatientDetailsForm,
    },
  ];

  return (
    <div className="App">
      <Router>
        <Routes>
          {commonRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={<route.component />}
            />
          ))}
          {userRole === 'Admin' &&
            adminRoutes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={<route.component />}
              />
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
