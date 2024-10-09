import SignUpForm from "../components/auth/SignUpForm";
import { CustomContainer } from "../assets/styles/styled";
import { User } from "../interfaces/interface";
import { useState } from "react";
import { doSignUp } from "../service/functions";
import {toast} from 'react-toastify'
import { AxiosError, HttpStatusCode } from "axios";

function SignUp() {
  const [isLoading, setLoading] = useState(false);

  const handleSubmit =async  (values: User) => {
    // const age = Number(calculateAge(values.age));
    setLoading(true);
    const user = { ...values };
    try {
      const response = await doSignUp(user);
  
      if (response.status === HttpStatusCode.Created) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "An error occurred during sign up");
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
        <SignUpForm handleSubmit={handleSubmit} isLoading={isLoading} />
      </CustomContainer>
    </>
  );
};

export default SignUp;
