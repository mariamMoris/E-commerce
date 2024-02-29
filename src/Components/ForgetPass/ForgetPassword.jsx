import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { authContext } from "../../contexts/Authcontext";

export default function ForgetPassword() {
  const [error, setError] = useState("");
  const [succesMsg, setSuccesMsg] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setIsLoggin, isloggin } = useContext(authContext);

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("email is requeried")
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Enter valid email"),
  });

  function validate(values) {
    const errors = {};

    if (values.email == "") {
      errors.email = "email is requeried";
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.email)) {
      errors.email = "Enter valid email";
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
      email: "",
    },
    onSubmit: forgetPass,
    validationSchema,
  });

  async function forgetPass() {
    setError("");
    setSuccesMsg("");
    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      );
       navigate("/verifyCode");
      setSuccesMsg(response.data.message);
    } catch (error) {
      setError(error.response.data.message);
    }
    setIsLoading(false);
  }

  return (
    <>
      <div className="w-75 m-auto my-5">
        <h1>Reset password :</h1>
        <form onSubmit={handleSubmit}>
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
              className="btn bg-main px-3 text-white me-auto d-block"
            >
              <i className="fas fa-spin fa-spinner px-4"></i>{" "}
            </button>
          ) : (
            <button
              disabled={!isValid || isloading}
              type="submit"
              className="btn bg-main px-3 text-white me-auto d-block"
            >
              Verify
            </button>
          )}
        </form>
      </div>
    </>
  );
}
