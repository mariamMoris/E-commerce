import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { authContext } from "../../contexts/Authcontext";

export default function VerifyCode() {
  const [error, setError] = useState("");
  const [succesMsg, setSuccesMsg] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setIsLoggin, isloggin } = useContext(authContext);

  const validationSchema = Yup.object({
    resetCode: Yup.string()
      .required("code is requeried")
      .matches(/^[0-9]{6}$/, "Enter valid code"),
  });

  
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
        resetCode: "",
    },
    onSubmit: verify,
    validationSchema,
  });

  async function verify() {
    setError("");
    setSuccesMsg("");
    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        values
      );
        navigate("/resetPass");
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
          <label htmlFor="code" className="my-1">
            code:
          </label>
          <input
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.resetCode}
            type="code"
            className="form-control mb-3"
            id="code"
            name="resetCode"
          />
          {errors.resetCode && touched.resetCode && (
            <p className="alert alert-danger">{errors.resetCode}</p>
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
