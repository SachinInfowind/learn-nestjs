import Layout from "../components/common/Layout";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import SocketFrontend from '../pages/SocketFrontend'
import { useRoutes } from "react-router-dom";
import Profile from "../pages/Profile";
import UploadBulk from "../pages/UploadBulk";
const ApplicationRoutes= () => {
  const element = useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/signup",
          element: <SignUp />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path  :'/view-profile',
          element : <Profile />
        },
        {
          path : '/bulk-upload',
          element : <UploadBulk />
        }
      ],
      
    },
    {
        path : "/chat",
        element : <SocketFrontend />
      }
  ]);
  return <>
  {element}
  </>
};
export default ApplicationRoutes