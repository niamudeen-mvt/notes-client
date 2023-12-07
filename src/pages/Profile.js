import { useEffect, useState } from "react";
import { getUserDetails } from "../services/api/user";
import { useAuth } from "../context/authContext";
import { Container } from "react-bootstrap";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { editUserDetials } from "../services/api/user";
import { FaCheck } from "react-icons/fa6";
import { sendNotification } from "../utils/notifications";

const Profile = () => {
  const [currentUser, setCurrentUser] = useState({
    username: "",
    email: "",
    phone: "",
  });
  const [isEdit, setIsEdit] = useState(false);

  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await getUserDetails();
        if (res?.status === 200) {
          setCurrentUser(res?.data?.user);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setCurrentUser(null);
      }
    };

    fetchCurrentUser();
  }, [isLoggedIn]);

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleEditUser = async () => {
    if (currentUser) {
      let res = await editUserDetials(currentUser);
      if (res?.status === 200) {
        setCurrentUser(res?.data?.user);
        setIsEdit(false);
        sendNotification("success", res?.data?.message);
      } else {
        // sendNotification("warning", res?.response?.data?.message);
      }
    }
  };

  const handleChange = (e) => {
    setCurrentUser({
      ...currentUser,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="common_container flex_center">
      <Container className="py-5 box_shadow flex_center position-relative">
        {isLoggedIn ? (
          <div className="">
            <div className="mb-3">
              <label className="text-left">Name</label>
              <br />
              <input
                type="text"
                disabled={!isEdit}
                value={currentUser?.username}
                onChange={handleChange}
                spellCheck="false"
                name="username"
                className="px-3 text-capitalize"
              />
            </div>
            <div className="mb-3">
              <label className="text-left">Email</label>
              <br />
              <input
                type="text"
                disabled={!isEdit}
                value={currentUser?.email}
                onChange={handleChange}
                spellCheck="false"
                name="email"
                className="px-3 text-lowercase"
              />
            </div>
            <div className="mb-3">
              <label className="text-left">Phone</label>
              <br />
              <input
                type="text"
                disabled={!isEdit}
                value={currentUser?.phone}
                onChange={handleChange}
                spellCheck="false"
                name="phone"
                className="px-3 text-capitalize"
              />
            </div>

            <BiSolidMessageSquareEdit
              color="#0d6efd"
              fontSize={"25px"}
              className="cursor"
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
              }}
              onClick={handleEdit}
            />
            {isEdit ? (
              <FaCheck
                color="green"
                fontSize={"25px"}
                onClick={() => handleEditUser()}
                className="cursor"
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "80px",
                }}
              />
            ) : null}
          </div>
        ) : null}
      </Container>
    </div>
  );
};

export default Profile;
