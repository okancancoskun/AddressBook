import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store";
import { login } from "../store/auth.store";
import { Toast } from "primereact/toast";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { ProgressSpinner } from "primereact/progressspinner";
import { IAddress, ICreateAddress, IUserLogin } from "../interfaces";
import PhoneInput, { CountryData } from "react-phone-input-2";
import {
  createAddress,
  getAddress,
  updateAddress,
} from "../store/address.store";

export const UpdateAddress = () => {
  const { address, loading } = useAppSelector((state) => state.address);
  const { id } = useParams();
  const toast = useRef<Toast>(null);
  const [initialValues, setInitialValues] = useState<
    Partial<ICreateAddress & { _id: string }>
  >({
    _id: "",
    name: "",
    surname: "",
    email: "",
    phone: { countryCode: "", number: "" },
  });
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAddress(id as string));
  }, []);

  useEffect(() => {
    if (address !== null && loading === "succeeded") {
      initialValues._id = address?._id;
      initialValues.name = address?.name;
      initialValues.surname = address?.surname;
      initialValues.email = address?.email;
      initialValues.phone = address?.phone as any;
    }
    setInitialValues(initialValues);
  }, [address]);

  const handleSubmit = async (values: Partial<ICreateAddress>) => {
    values.phone = initialValues.phone;
    try {
      await dispatch(
        updateAddress({ ...values, _id: initialValues._id as string })
      ).unwrap();
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

  const validate = (values: Partial<ICreateAddress>) => {
    const errors: any = {};

    if (!values.email) {
      errors.email = "Required";
    }

    if (!values.name) {
      errors.name = "Required";
    }

    if (!values.surname) {
      errors.surname = "Required";
    }
    if (
      (values.phone as any).countryCode.length < 1 ||
      (values.phone as any).number.length < 1
    ) {
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
              defaultValue={address?.surname}
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
              value={
                ((initialValues.phone?.countryCode as string) +
                  initialValues.phone?.number) as string
              }
              onChange={(
                value: string,
                data: CountryData,
                event,
                formattedValue
              ) => {
                setInitialValues({
                  ...initialValues,
                  phone: {
                    countryCode: `${(data as any).dialCode}`,
                    number: value.slice((data as any).dialCode.length),
                  },
                });
              }}
            />
          </div>
          <ErrorMessage name="phone" component="div" className="text-red-500" />

          <Button className="mt-4" type="submit" label="Submit" />
        </Form>
      </Formik>
    </div>
  );
};
