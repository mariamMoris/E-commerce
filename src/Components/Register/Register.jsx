import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
export default function Register() {
  const [error, setError] = useState("");
  const [succesMsg, setSuccesMsg] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is requeried")
      .min(3, "Name min length must be three characters")
      .max(20, "Name max length must be 20 characters"),
    email: Yup.string()
      .required("email is requeried")
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Enter valid email"),
    password: Yup.string()
      .required("Password is requeried")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Minimum eight characters, at least one letter and one number"
      ),
    rePassword: Yup.string()
      .required("rePassword is requeried")
      .oneOf([Yup.ref("password")], "Password and rePassword not matching"),
    phone: Yup.string()
      .required("phone is requeried")
      .matches(
        /^(\+201|01|00201)[0-2,5]{1}[0-9]{8}$/,
        "Enter Egyption phone number"
      ),
  });

  function validate(values) {
    const errors = {};

    if (values.name == "") {
      errors.name = "Name is requeried";
    } else if (values.name.length < 3) {
      errors.name = "Name min length must be three characters";
    } else if (values.name.length > 20) {
      errors.name = "Name max length must be 20 characters";
    }
    if (values.email == "") {
      errors.email = "email is requeried";
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.email)) {
      errors.email = "Enter valid email";
    }
    if (values.password == "") {
      errors.password = "Password is requeried";
    } else if (
      !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(values.password)
    ) {
      errors.password =
        "Minimum eight characters, at least one letter and one number";
    }
    if (values.rePassword == "") {
      errors.rePassword = "rePassword is requeried";
    } else if (values.password != values.rePassword) {
      errors.rePassword = "Password and rePassword not matching";
    }
    if (values.phone == "") {
      errors.phone = "Phone is requeried";
    } else if (!/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}$/.test(values.phone)) {
      errors.phone = "Enter Egyption phone number ";
    }
    console.log(errors);
    return errors;
  }

  const {
    values,
    handleSubmit,
    handleChange,
    errors,
    touched,
    handleBlur,
    isValid,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: register,
    validationSchema,
  });

  async function register() {
    setError("");
    setSuccesMsg("");
    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );
      setSuccesMsg(response.data.message);
      navigate("/login");
    } catch (error) {
      setError(error.response.data.message);
    }
    setIsLoading(false);
  }

  return (
    <>
      <div className="w-75 m-auto my-5">
        <h1>Register Now :</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name" className="my-1">
            Name:
          </label>
          <input
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.name}
            type="text"
            className="form-control mb-3"
            id="name"
            name="name"
          />
          {errors.name && touched.name && (
            <p className="alert alert-danger">{errors.name}</p>
          )}
          <label htmlFor="email" className="my-1">
            Email:
          </label>
          <input
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.email}
            type="email"
            className="form-control mb-3"
            id="email"
            name="email"
          />
          {errors.email && touched.email && (
            <p className="alert alert-danger">{errors.email}</p>
          )}

          <label htmlFor="password" className="my-1">
            Password:
          </label>
          <input
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.password}
            type="password"
            className="form-control mb-3"
            id="password"
            name="password"
          />
          {errors.password && touched.password && (
            <p className="alert alert-danger">{errors.password}</p>
          )}

          <label htmlFor="rePassword" className="my-1">
            RePassword:
          </label>
          <input
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.rePassword}
            type="password"
            className="form-control mb-3"
            id="rePassword"
            name="rePassword"
          />
          {errors.rePassword && touched.rePassword && (
            <p className="alert alert-danger">{errors.rePassword}</p>
          )}

          <label htmlFor="phone" className="my-1">
            phone:
          </label>
          <input
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.phone}
            type="tel"
            className="form-control mb-3"
            id="phone"
            name="phone"
          />
          {errors.phone && touched.phone && (
            <p className="alert alert-danger">{errors.phone}</p>
          )}

          {error && (
            <div className="alert alert-danger text-center">{error}</div>
          )}
          {succesMsg && (
            <div className="alert alert-success text-center">{succesMsg}</div>
          )}

          {isloading ? (
            <button
              disabled
              type="button"
              className="btn bg-main px-3 text-white ms-auto d-block"
            >
              <i className="fas fa-spin fa-spinner px-4"></i>{" "}
            </button>
          ) : (
            <button
              disabled={!isValid || isloading}
              type="submit"
              className="btn bg-main px-3 text-white ms-auto d-block"
            >
              Register
            </button>
          )}
        </form>
      </div>
    </>
  );
}
