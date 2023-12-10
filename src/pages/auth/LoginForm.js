import React, { useState } from "react";
import {
  checkIfobjEmpty,
  errorListtoObj,
  storeAccessTokenLS,
  storeRefreshTokenLS,
} from "../../utils/helper";
import { sendNotification } from "../../utils/notifications";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/api/user";
import { useAuth } from "../../context/authContext";
import { Button } from "react-bootstrap";
import CustomInput from "../../components/shared/CustomInput";
import { BasicFormLayout } from "../../components/shared/BasicFormLayout";

const LoginForm = () => {
  const navigate = useNavigate();

  const { setToken } = useAuth();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await loginUser(user);

    const isEmpty = checkIfobjEmpty(user);

    console.log(user);

    if (!isEmpty) {
      if (res?.status === 200) {
        localStorage.setItem("userId", res?.data?.userId);

        // storing tokens in localstorage
        storeAccessTokenLS(res?.data?.access_token);
        setToken(res?.data?.access_token);
        storeRefreshTokenLS(res?.data?.refresh_token);

        sendNotification("success", res?.data?.message);
        navigate("/profile");
      } else {
        sendNotification("warning", res?.response?.data?.message);
        setErrors(errorListtoObj(res?.response?.data?.errors));
      }
    } else {
      sendNotification("warning", "Fields are required");
    }
  };

  return (
    <BasicFormLayout>
      <form className="h-75 p-5">
        <h2 className="fw-bold mb-5">LOGIN !</h2>
        <CustomInput
          mb={3}
          label="email address"
          name="email"
          handleChange={handleChange}
          value={user.email}
          errors={errors}
        />
        <CustomInput
          name="password"
          label="password"
          mb={5}
          type="password"
          value={user.password}
          handleChange={handleChange}
          errors={errors}
        />
        <Button
          type="submit"
          className="px-5 py-2 rounded-5 fw-bold box_shadow mb-4"
          onClick={handleSubmit}
        >
          Sign in
        </Button>
        <p className="common_grey">
          Dont't have an account ?{" "}
          <Link to="/signup">
            <span className="cursor" style={{ color: "#0d6efd" }}>
              Sign up
            </span>
          </Link>
        </p>
      </form>
    </BasicFormLayout>
  );
};

export default LoginForm;
