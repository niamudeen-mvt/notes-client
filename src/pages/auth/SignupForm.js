import React, { useState } from "react";
import { Button } from "react-bootstrap";
import CustomInput from "../../components/shared/CustomInput";
import { checkIfobjEmpty, errorListtoObj } from "../../utils/helper";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { sendNotification } from "../../utils/notifications";
import { registerUser } from "../../services/api/user";
import { BasicFormLayout } from "../../components/shared/BasicFormLayout";

const SignupForm = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  console.log(errors);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value.trim(),
    });
  };

  console.log(errors, "errors");
  const handleSubmit = async (e) => {
    e.preventDefault();

    const isEmpty = checkIfobjEmpty(user);
    if (!isEmpty) {
      let res = await registerUser(user);

      if (res?.status === 201) {
        sendNotification("success", res?.data?.message);
        navigate("/login");
      } else {
        setErrors(errorListtoObj(res?.response?.data?.errors));
      }
    } else {
      sendNotification("warning", "Fields are required");
    }
  };

  return (
    <BasicFormLayout>
      <form className="h-75 p-5">
        <h2 className="fw-bold mb-5">SIGNUP !</h2>
        <CustomInput
          mb={5}
          label="Username"
          name="username"
          handleChange={handleChange}
          value={user.username}
          errors={errors}
        />
        <CustomInput
          name="email"
          label="Email"
          mb={5}
          type="text"
          value={user.email}
          handleChange={handleChange}
          errors={errors}
        />
        <CustomInput
          name="phone"
          label="Phone"
          mb={5}
          type="text"
          value={user.phone}
          handleChange={handleChange}
          errors={errors}
        />
        <CustomInput
          name="password"
          label="password"
          mb={5}
          type="text"
          value={user.password}
          handleChange={handleChange}
          errors={errors}
        />
        <Button
          type="submit"
          className="px-5 py-2 rounded-5 fw-bold box_shadow mb-4"
          onClick={handleSubmit}
        >
          Submit
        </Button>
        <p className="common_grey">
          Already have and account ?{" "}
          <Link to="/login">
            <span className="cursor" style={{ color: "#0d6efd" }}>
              Sign in
            </span>
          </Link>
        </p>
      </form>
    </BasicFormLayout>
  );
};

export default SignupForm;
