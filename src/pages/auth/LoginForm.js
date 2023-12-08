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
import { Button, Col, Row } from 'react-bootstrap'
import CustomInput from '../../components/shared/CustomInput'
import { FiEdit } from "react-icons/fi";


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
    <section className=''>
      <div className='min-vh-100 flex_center form_container mx-auto'>
        <div className='w-100 box_shadow' style={{ height: '600px' }}>
          <Row className='h-100'>
            <Col xs={12} md={6} className='h-100'>
              <div className='common_blue h-100  flex_center'>
                <h4 className='text-white fw-bold text-capitalize'><span className="mx-2"><FiEdit /></span>Notes</h4>
              </div>
            </Col>
            <Col xs={12} md={6} className='h-100'>
              <div className='w-100 h-100 flex_center flex-column'>
                <form className='h-75 p-5'>
                  <h2 className='fw-bold mb-5'>LOGIN !</h2>
                  <CustomInput mb={3} label="email address" name="email"
                    handleChange={handleChange}
                    value={user.email}
                    errors={errors}
                  />
                  <CustomInput name="password" label="password" mb={5} type="text"
                    value={user.password}
                    handleChange={handleChange}
                    errors={errors}
                  />
                  <Button type="submit" className='px-5 py-2 rounded-5 fw-bold box_shadow mb-4' onClick={handleSubmit}>Sign in</Button>
                  <p className='common_grey'>Dont't have an account ? <Link to="/signup">
                    <span className='cursor' style={{ color: "#0d6efd" }}>Sign up</span>
                  </Link></p>
                </form>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </section>
  )
}

export default LoginForm