import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { cartContent } from "../../contexts/CartContent";
export default function CheckOut() {
  const [error, setError] = useState("");
  const [succesMsg, setSuccesMsg] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {payment} = useContext(cartContent)
  const validationSchema = Yup.object({
   
    phone: Yup.string()
      .required("phone is requeried")
      .matches(
        /^(\+201|01|00201)[0-2,5]{1}[0-9]{8}$/,
        "Enter Egyption phone number"
      ),
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
      phone: "",
    },
    onSubmit: paymentFunc,
    validationSchema,
  });

  async function paymentFunc(values) {
    setError("");
    setSuccesMsg("");
    try {
      setIsLoading(true);
      const {data} = await payment(values)
      setSuccesMsg(data.message);
      window.location.href = data.session.url
    } catch (error) {
      setError(error.data.message);
    }
    setIsLoading(false);
  }

  return (
    <>
      <div className="w-75 m-auto my-5">
        <h1>CheckOut :</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name" className="my-1">
            Details:
          </label>
          <input
            onBlur={handleBlur}
            type="text"
            className="form-control mb-3"
            id="details"
            name="details"
          />
          {errors.name && touched.name && (
            <p className="alert alert-danger">{errors.name}</p>
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
<label htmlFor="email" className="my-1">
            City:
          </label>
          <input
            onBlur={handleBlur}
            type="text"
            className="form-control mb-3"
            id="city"
            name="city"
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
              Pay Now
            </button>
          )}
        </form>
      </div>
    </>
  );
}
