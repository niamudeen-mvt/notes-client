import React, { useState } from "react";
import { Button, Col, Row } from 'react-bootstrap'
import CustomInput from '../../components/shared/CustomInput'
import { checkIfobjEmpty, errorListtoObj } from "../../utils/helper";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { sendNotification } from "../../utils/notifications";
import { registerUser } from "../../services/api/user";
import { FiEdit } from "react-icons/fi";
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
    <section className=''>
      <div className='min-vh-100 flex_center form_container mx-auto'>
        <div className='w-100 box_shadow' style={{ minHeight: '600px' }}>
          <Row className='h-100'>
            <Col xs={12} md={6} className='h-100'>
              <div className='w-100 h-100 flex_center flex-column'>
                <form className='h-75 p-5'>
                  <h2 className='fw-bold mb-5'>SIGNUP !</h2>
                  <CustomInput mb={3} label="Username" name="username"
                    handleChange={handleChange}
                    value={user.username}
                    errors={errors}
                  />
                  <CustomInput name="email" label="Email" mb={5} type="text"
                    value={user.email}
                    handleChange={handleChange}
                    errors={errors}
                  />
                  <CustomInput name="phone" label="Phone" mb={5} type="text"
                    value={user.phone}
                    handleChange={handleChange}
                    errors={errors}
                  />
                  <CustomInput name="password" label="password" mb={5} type="text"
                    value={user.password}
                    handleChange={handleChange}
                    errors={errors}
                  />
                  <Button type="submit" className='px-5 py-2 rounded-5 fw-bold box_shadow mb-4' onClick={handleSubmit}>Submit</Button>
                  <p className='common_grey'>Already have and account ? <Link to="/login">
                    <span className='cursor' style={{ color: "#0d6efd" }}>Sign in</span>
                  </Link></p>
                </form>
              </div>
            </Col>
            <Col xs={12} md={6} >
              <div className='common_blue flex_center h-100' >
                <h4 className='text-white fw-bold text-capitalize'><span className="mx-2"><FiEdit /></span>Notes</h4>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </section>
  )
}

export default SignupForm