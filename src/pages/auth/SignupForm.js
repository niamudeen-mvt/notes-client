import React, { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
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
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value.trim(),
    });
  };

  // console.log(errors, "errors");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
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
    setIsLoading(false);
  };

  return (
    <BasicFormLayout>
      <form className="h-75 p-5 w-100 overflow-hidden">
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
          type="password"
          value={user.password}
          handleChange={handleChange}
          errors={errors}
        />
        {isLoading ? (
          <Button
            variant="primary"
            className="px-5 py-2 rounded-5 fw-bold box_shadow mb-4"
          >
            <Spinner
              variant="light"
              animation="border"
              role="status"
              size="sm"
            ></Spinner>
          </Button>
        ) : (
          <Button
            type="submit"
            className="px-5 py-2 rounded-5 fw-bold box_shadow mb-4"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        )}

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
