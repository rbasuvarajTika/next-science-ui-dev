import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from './Components/LoginPage';
// import PagingTabs from './Components/PagingTabs';
// import UserTable from './Components/UserTable';
import AdminPage from './Components/AdminPage';
import { FaxPage } from './Components/FaxPage';
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage/>,
    },
    //  {
    //    path: "/forgotpassword",
    //    element: <ForgotPassword/>,
    //  },
    {
      path: "/adminpage",
      element: <AdminPage/>,
    },
    {
      path: "/faxlist",
      element: <FaxPage/>,
    },
  
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
