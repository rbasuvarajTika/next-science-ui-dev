import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from './Components/LoginPage';
// import PagingTabs from './Components/PagingTabs';
// import UserTable from './Components/UserTable';
import AdminPage from './Components/AdminPage';
import { FaxTable } from './Components/FaxTable'; 
import ResetPassword from './Components/ResetPassword';
import ConfirmEmail from './Components/ConfirmEmail';
import FaxView from './Components/FaxView';
import EditUser from './Components/EditUser';
import CreateNewUser from './Components/CreateNewUser';
import { DuplicateFax } from './Components/DuplicateFax';
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage/>,
    },
      {
        path: "/confirmemail",
        element: <ConfirmEmail/>,
     },
     {
      path: "/faxview/:faxId",
      element: <FaxView/>,
    },
    {
      path: "/adminpage",
      element: <AdminPage/>,
    },
    {
      path: "/fax",
      element: <FaxTable/>,
    },
    {
      path: "/resetpassword/:userId",
      element: <ResetPassword/>,
    },
    {
      path:"/edit-user/:userId",
      element: <EditUser/>,
    },
    {
      path: "/createnewuser",
      element: <CreateNewUser/>,
    },
    {
      path: "/duplicatefax/:faxId",
      element: <DuplicateFax/>,
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
