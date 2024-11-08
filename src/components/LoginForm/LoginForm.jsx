import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import s from "./LoginForm.module.css";
import icons from "../../images/icons/icons.svg";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logIn, userCurrent } from "../../redux/auth/operations.js"; // Імпортуйте userCurrent

// Валідація
const loginSchema = yup.object().shape({
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

const LoginForm = () => {
  // Інвіз паролю
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const dispatch = useDispatch();

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      // Виконати логін
      await dispatch(logIn(values));

      // Отримати актуальні дані користувача після успішного логіну
      await dispatch(userCurrent());
    } catch (error) {
      console.error("Помилка при логіні:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={s.cont}>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={handleLogin}
      >
        {({ isSubmitting }) => (
          <Form className={s.form}>
            <div className={s.fieldWrapper}>
              <Field
                type="email"
                name="email"
                placeholder="Enter your email"
                className={s.input}
              />
              <ErrorMessage name="email" component="div" className={s.error} />
            </div>
            <div className={s.fieldWrapper}>
              <Field
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                className={s.input}
              />
              <svg
                className={s.icon}
                width="18px"
                height="18px"
                onClick={togglePasswordVisibility}
                style={{ cursor: "pointer" }}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <use href={`${icons}#icon-eyes`}></use>
              </svg>
              <ErrorMessage
                name="password"
                component="div"
                className={s.error}
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={s.submitButton}
            >
              Log In Now
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
