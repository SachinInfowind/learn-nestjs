import { useContext, useState } from "react";
import { CustomContainer } from "../assets/styles/styled";
import { LoginType } from "../interfaces/interface";
import { toast } from "react-toastify";
import { AxiosError, HttpStatusCode } from "axios";
import { doLogin } from "../service/functions";
import { setToken, setUserIntoLocal } from "../utils/common/commonFunctions";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../App";
import LoginForm from "../components/auth/LoginForm";

function Login(){
  const [isLoading, setLoading] = useState(false);
  const {user, setUser} = useContext(MyContext)
const navigate = useNavigate()
  const handleSubmit = async (values: LoginType) => {
    setLoading(true);
    try {
      const response = await doLogin(values);
      if (response.status === HttpStatusCode.Ok) {
        setToken(response.data.token);
        setUserIntoLocal(response.data.user)
        setUser(response.data.user)
        toast.success(response.data.message);
        navigate('/view-profile')
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data.message || "An error occurred during Login"
        );
      } else {
        console.log(error);
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false); // End loading
    }
  };
  return (
    <>
      <CustomContainer>
        <LoginForm handleSubmit={handleSubmit} isLoading={isLoading} />
      </CustomContainer>
    </>
  );
}
export default Login;
