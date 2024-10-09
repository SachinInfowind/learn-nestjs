import { useEffect, useState } from "react";
import { AxiosError, HttpStatusCode } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteAccount, doUpdate } from "../service/functions";
import { UpdateProfile, User } from "../interfaces/interface";
import { getUser, setUserIntoLocal } from "../utils/common/commonFunctions";
import { CustomContainer } from "../assets/styles/styled";
import UpdateProfileForm from "../components/auth/UpdateProfile";

function Profile() {
  const [user, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [isEditable, setEditable] = useState(false);
  const [isPopUpOpen, setOpen] = useState(false);
  const navigate = useNavigate();
  const initialValues = {
    name: user?.name || "",
    dob: user?.dob || "",
    email: user?.email || "",
    username: user?.username || "",
  };

  const handleSubmit = async (values: UpdateProfile) => {
    const profile = { ...values, email: undefined };
    setLoading(true);
    try {
      const updateResponse = await doUpdate(profile);
      if (updateResponse.status == HttpStatusCode.Created) {
        toast.success(updateResponse.data.message);
        setUserIntoLocal(updateResponse.data.updatedUser);
        setCurrentUser(updateResponse.data.updatedUser);
        setEditable(false);
      } else {
        toast.error(updateResponse.data.message);
      }
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data.message || "An error occurred during updating account"
        );
      } else {
        console.log(error);
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false); // End loading
    }
  };
  const handleConfirm = async () => {
    try {
      const response = await deleteAccount();
      if (response.status == HttpStatusCode.Ok) {
        setCurrentUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data.message || "An error occurred during deleting account"
        );
      } else {
        console.log(error);
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false); // End loading
    }
  };
  
  useEffect(() => {
    try {
      const user: User = getUser();
      setCurrentUser(user);
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  }, []);
  return (
    <>
      <CustomContainer>
        <UpdateProfileForm
          handleConfirm={handleConfirm}
          handleSubmit={handleSubmit}
          initialValues={initialValues}
          isEditable={isEditable}
          isLoading={isLoading}
          isPopUpOpen={isPopUpOpen}
          setEditable={setEditable}
          setOpen={setOpen}
        />
      </CustomContainer>
    </>
  );
}

export default Profile;
