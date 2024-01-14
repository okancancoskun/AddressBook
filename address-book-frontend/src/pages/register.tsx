import React, { useRef, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import axios from "../helpers/axios";
import { useNavigate } from "react-router-dom";
import { ProgressSpinner } from "primereact/progressspinner";

interface FormValues {
  name: string;
  surname: string;
  email: string;
  password: string;
  repeatPassword: string;
}

export const Register = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleRegister = async (data: FormValues) => {
    setLoading(true);
    try {
      await axios.post("/auth/register", data);
      (globalThis as any).registered = true;
      navigate("/login", { state: { fromRegister: true } });
    } catch (error: any) {
      showError(
        error?.response?.data?.message || "Error Happened while registering"
      );
    }
    setLoading(false);
  };
  const toast = useRef<Toast>(null);
  const initialValues: FormValues = {
    name: "",
    surname: "",
    email: "",
    password: "",
    repeatPassword: "",
  };

  const showError = (msg?: string) => {
    toast.current?.show({
      severity: "error",
      summary: "Error",
      detail: msg,
      life: 3000,
    });
  };

  const handleSubmit = async (values: FormValues): Promise<void> => {
    if (values.password !== values.repeatPassword) {
      return showError("Passwords are not matched");
    }
    return handleRegister(values);
  };

  const validate = (values: FormValues) => {
    const errors: Partial<FormValues> = {};

    // Özel doğrulama
    if (!values.name) {
      errors.name = "Required";
    }

    if (!values.surname) {
      errors.surname = "Required";
    }

    if (!values.email) {
      errors.email = "Required";
    }

    if (!values.password) {
      errors.password = "Required";
    }

    if (!values.repeatPassword) {
      errors.repeatPassword = "Required";
    }

    if (values.password !== values.repeatPassword) {
      errors.repeatPassword = "Passwords don't match";
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
      <h2>Register Form</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validate={validate}
      >
        <Form>
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">
              <i className="pi pi-user"></i>
            </span>
            <Field
              as={InputText}
              type="text"
              placeholder="Name"
              name="name"
              className="p-inputtext"
            />
          </div>
          <ErrorMessage name="name" component="div" className="text-red-500" />

          <div className="p-inputgroup mt-3">
            <span className="p-inputgroup-addon">
              <i className="pi pi-users"></i>
            </span>
            <Field
              as={InputText}
              type="text"
              placeholder="Surname"
              name="surname"
              className="p-inputtext"
            />
          </div>
          <ErrorMessage
            name="surname"
            component="div"
            className="text-red-500"
          />

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

          <div className="p-inputgroup  mt-3">
            <span className="p-inputgroup-addon">
              <i className="pi pi-key"></i>
            </span>
            <Field
              as={InputText}
              type="password"
              placeholder="Repeat Password"
              name="repeatPassword"
              className="p-inputtext"
            />
          </div>
          <ErrorMessage
            name="repeatPassword"
            component="div"
            className="text-red-500"
          />

          <Button
            className="mt-4"
            type="submit"
            label="Submit"
            disabled={loading}
          />
        </Form>
      </Formik>
      {loading ? <ProgressSpinner /> : null}
    </div>
  );
};
