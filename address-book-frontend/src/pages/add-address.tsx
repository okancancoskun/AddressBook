import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store";
import { login } from "../store/auth.store";
import { Toast } from "primereact/toast";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { ProgressSpinner } from "primereact/progressspinner";
import { ICreateAddress, IUserLogin } from "../interfaces";
import PhoneInput from "react-phone-input-2";
import { createAddress } from "../store/address.store";

export const AddAddress = () => {
  const toast = useRef<Toast>(null);
  const [phone, setPhone] = useState<{ countryCode: string; number: string }>({
    countryCode: "",
    number: "",
  });
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

  const handleSubmit = async (values: ICreateAddress) => {
    try {
      const data = { ...values, phone };
      await dispatch(createAddress(data)).unwrap();
      navigate("/address");
    } catch (error: any) {
      showError(
        error?.response?.data?.message ||
          "An Error happened while create address"
      );
    }
  };

  const showError = (msg?: string) => {
    toast.current?.show({
      severity: "error",
      summary: "Error",
      detail: msg,
      life: 3000,
    });
  };

  const initialValues: ICreateAddress = {
    email: "",
    name: "",
    surname: "",
    phone: phone,
  };

  const validate = (values: ICreateAddress) => {
    const errors: any = {};
    values.phone = phone;

    if (!values.email) {
      errors.email = "Required";
    }

    if (!values.name) {
      errors.name = "Required";
    }

    if (!values.surname) {
      errors.surname = "Required";
    }
    if (values.phone.countryCode.length < 1 || values.phone.number.length < 1) {
      errors.phone = "Required";
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
      <h2>Add new Address</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validate={validate}
      >
        <Form>
          <div className="p-inputgroup  mt-3">
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

          <div className="p-inputgroup  mt-3">
            <span className="p-inputgroup-addon">
              <i className="pi pi-user"></i>
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
            <PhoneInput
              country={"us"}
              value={phone.countryCode + phone.number}
              onChange={(value, data, event, formattedValue) => {
                setPhone({
                  countryCode: `${(data as any).dialCode}`,
                  number: value.slice((data as any).dialCode.length),
                });
              }}
            />
          </div>
          <ErrorMessage name="phone" component="div" className="text-red-500" />

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
