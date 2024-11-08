import React, { useState } from "react";
import PropTypes from "prop-types";
import { Formik, Form, Field, ErrorMessage } from "formik";
import s from "./EditProfile.module.css";
import icons from "../../images/icons/icons.svg";
import * as yup from "yup";

const EditProfile = ({ onClose }) => {
  const [showPassword, setShowPassword] = useState(false);

  const registerSchema = yup.object().shape({
    name: yup
      .string()
      .matches(
        /^[a-zA-Z0-9!@#$%^&*()_+=[\]{}:;"',.<>?/`~|\\-]*( [a-zA-Z0-9!@#$%^&*()_+=[\]{}:;"',.<>?/`~|\\-]+)*$/,
        "Name can include Latin letters, numbers, and symbols"
      )
      .min(2, "Name must be at least 2 characters")
      .max(32, "Name cannot exceed 32 characters")
      .required("Please, type valid name"),
    email: yup
      .string()
      .matches(/^[^\s]+$/, "Email cannot contain spaces")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email format"
      )
      .required("Please, type valid email"),
    password: yup
      .string()
      .matches(/^[^\s]+$/, "Password cannot contain spaces")
      .matches(
        /^[a-zA-Z0-9!@#$%^&*()_+=[\]{}:;"',.<>?/`~|\\-]*$/,
        "Password can include Latin letters, numbers, and symbols without spaces"
      )
      .min(8, "Password must be at least 8 characters")
      .max(64, "Password cannot exceed 64 characters")
      .required("Please, type valid password"),
  });

  const initialValues = {
    avatar: "",
    name: "",
    email: "",
    password: "",
  };

  const onSubmit = (values) => {
    console.log("Submitted profile data:", values);
    onClose();
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className={s.modalOverlay}>
      <div className={s.modal}>
        <h2 className={s.titleName}>Edit profile</h2>
        <button className={s.closeButton} onClick={onClose}>
          <svg className={s.iconClose}>
            <use href={`${icons}#icon-close`} />
          </svg>
        </button>

        <Formik
          initialValues={initialValues}
          validationSchema={registerSchema}
          onSubmit={onSubmit}
        >
          {() => (
            <Form className={s.formStyle}>
              <label className={s.labelStyle}>
                <input className={s.inputNameImg} type="file" name="avatar" />
                <div className={s.imgBackground}>
                  <svg width="68" height="68" className={s.img}>
                    <use xlinkHref={`${icons}#icon-user-ico`} />
                  </svg>
                  <div className={s.plusIconBackground}>
                    <svg width="10" height="10" className={s.plusIcon}>
                      <use xlinkHref={`${icons}#icon-plus`} />
                    </svg>
                  </div>
                </div>
              </label>
              <label className={s.labelStyle}>
                <Field
                  className={s.inputName}
                  type="text"
                  name="name"
                  placeholder="Name"
                />
                <ErrorMessage
                  name="name"
                  component="label"
                  className={s.error}
                />
              </label>
              <label className={s.labelStyle}>
                <Field
                  className={s.inputName}
                  type="email"
                  name="email"
                  placeholder="Email"
                />
                <ErrorMessage
                  name="email"
                  component="label"
                  className={s.error}
                />
              </label>
              <label className={`${s.labelStyle} ${s.passwordLabel}`}>
                <Field
                  className={s.inputName}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className={s.passwordToggle}
                  aria-label="Toggle password visibility"
                >
                  <svg className={s.iconEye}>
                    <use
                      href={`${icons}#${
                        showPassword ? "icon-eyes" : "icon-eyes-closed"
                      }`}
                    />
                  </svg>
                </button>
                <ErrorMessage
                  name="password"
                  component="label"
                  className={s.error}
                />
              </label>
              <button type="submit" className={s.btnAdd}>
                Send
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

EditProfile.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default EditProfile;
