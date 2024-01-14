import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store";
import { login } from "../store/auth.store";
import { Toast } from "primereact/toast";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { ProgressSpinner } from "primereact/progressspinner";
import { IUserLogin } from "../interfaces";

export const Login = () => {
  const toast = useRef<Toast>(null);
  const { loading } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if ((globalThis as any)?.registered) {
      showSuccess();
    }
  }, []);
  const showSuccess = () => {
    toast.current?.show({
      severity: "success",
      summary: "Success",
      detail: "You successfull Registered. Please Login.",
      life: 5000,
    });
  };

  const handleLogin = async (values: IUserLogin) => {
    try {
      await dispatch(login(values)).unwrap();
      navigate("/address");
    } catch (error: any) {
      showError(error?.response?.data?.message || "Error happened while login");
    }
  };

  const initialValues: IUserLogin = {
    email: "",
    password: "",
  };

  const showError = (msg?: string) => {
    toast.current?.show({
      severity: "error",
      summary: "Error",
      detail: msg,
      life: 3000,
    });
  };

  const validate = (values: IUserLogin) => {
    const errors: Partial<IUserLogin> = {};

    if (!values.email) {
      errors.email = "Required";
    }

    if (!values.password) {
      errors.password = "Required";
    }

    return errors;
  };
  return (
    <div
      className="form-container"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Toast ref={toast} />
      <h2>Login Form</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={handleLogin}
        validate={validate}
      >
        <Form>
          <div className="p-inputgroup  mt-3">
            <span className="p-inputgroup-addon">
              <i className="pi pi-envelope"></i>
            </span>
            <Field
              as={InputText}
              type="text"
              placeholder="Email"
              name="email"
              className="p-inputtext"
            />
          </div>
          <ErrorMessage name="email" component="div" className="text-red-500" />

          <div className="p-inputgroup  mt-3">
            <span className="p-inputgroup-addon">
              <i className="pi pi-key"></i>
            </span>
            <Field
              as={InputText}
              type="password"
              placeholder="Password"
              name="password"
              className="p-inputtext"
            />
          </div>
          <ErrorMessage
            name="password"
            component="div"
            className="text-red-500"
          />

          <Button
            className="mt-4"
            type="submit"
            label="Submit"
            disabled={loading === "pending"}
          />
        </Form>
      </Formik>
      {loading === "pending" ? <ProgressSpinner /> : null}
    </div>
  );
};
