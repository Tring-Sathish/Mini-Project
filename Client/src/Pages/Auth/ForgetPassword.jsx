import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";
import MainButton from "../../Components/Common/MainButton";
import { useMutation } from "@apollo/client";
import { forgotPassword } from "../hasura-query.ts"

function ForgetPassword() {
  const [error, Seterror] = useState();

  const navigate = useNavigate();
  const emailValue = {
    email: "",
  };
  const emailSchema = object({
    email: string().email("*Follow format").required("*Email is must"),
  });

  const [ forgot ] = useMutation(forgotPassword, {
    onCompleted: (data) => {},
    onError: (e) => {
      console.log("Error",e);
      Seterror("Error processing password reset request");
    }
  })
  // -> handle login api call
  const handleLogin = async (inputData) => {
    forgot({
      variables: {
        email: inputData?.email
      }
    })
    navigate("/verifyotp?email=" + inputData?.email);
  };
  const formik = useFormik({
    initialValues: emailValue,
    validationSchema: emailSchema,
    onSubmit: (e) => {
      handleLogin(e);
    },
  });
  // console.log(error);
  return (
    <div className="flex h-screen bg-background">
      <div className="m-auto shadows  w-full sm:w-2/3 h-4/5 p-8 sm:p-2">
        <img
          className="m-auto"
          width="120"
          src={
            "https://img.freepik.com/premium-vector/bronze-lock-icon-white-background-flat-design-illustration-stock-vector-graphics_668389-92.jpg?w=2000"
          }
        ></img>
        <h1 className="heading2 text-black text-center mt-4">
          Trouble Logging In
        </h1>

        <p className="heading3 text-center w-4/5 mt-8 block m-auto">
          Enter your email and we’ll send you a link to get back into your
          account.
        </p>

        <form
          className="mt-6 w-full sm:w-2/5  block m-auto "
          onSubmit={formik.handleSubmit}
        >
          <label className="label line1">Email</label>
          <input
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="email"
            id="email"
            type="email"
            placeholder="Your email @"
            className="h-10 input input-bordered w-full"
          />
          {/* ERROR MSG */}
          {formik.errors.email && formik.touched.email ? (
            <span className="text-blue-600"> {formik.errors.email}</span>
          ) : null}
          <div className="flex justify-center mt-12">
            <MainButton value={"Reset Password"} />
          </div>
        </form>

        <a href="/login" className="heading4 text-center m-auto block mt-6">
          Return to Login
        </a>
      </div>
    </div>
  );
}

export default ForgetPassword;
