/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Form, Formik } from "formik";
import { AxiosError, HttpStatusCode } from "axios";
import { toast } from "react-toastify";
import { CustomContainer, Label, MyformControl } from "../assets/styles/styled";
import { uploadInBulk } from "../service/functions";
import FormInputButton from "../components/common/Button";

function UploadBulk() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: any) => {
    const formData = new FormData();
    formData.append("file", values.file);
    setLoading(true);
    try {
      const response = await uploadInBulk(formData);
      if (response.status === HttpStatusCode.Created) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
        toast.error(
          error.response?.data.message || "An error occurred during Uploading"
        );
      } else {
        console.log(error);
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (key: string, value: File) => void
  ) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    setFieldValue("file", file);
  };

  return (
    <>
      <CustomContainer>
        <Formik initialValues={{ file: null }} onSubmit={handleSubmit}>
          {({ setFieldValue }) => (
            <Form>
              <MyformControl>
                <Label>Attachment (csv format)</Label>
                <input
                  name="file"
                  type="file"
                  accept=".csv"
                  onChange={(event) => handleFileChange(event, setFieldValue)}
                />
              </MyformControl>
              <FormInputButton
                isLoading={loading}
                text="Upload"
                name="submit"
                variant="contained"
              />
            </Form>
          )}
        </Formik>
      </CustomContainer>
    </>
  );
}

export default UploadBulk;
