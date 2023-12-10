import { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { getUserDetails, editUserDetials } from "../services/api/user";
import { useAuth } from "../context/authContext";
import { sendNotification } from "../utils/notifications";
import { BasicFormLayout } from "../components/shared/BasicFormLayout";
import CustomInput from "../components/shared/CustomInput";
import { VscAccount } from "react-icons/vsc";
import CustomLoader from "../components/shared/CustomLoader";
import { config } from "../config";

const Profile = () => {
  const [currentUser, setCurrentUser] = useState({
    username: "",
    email: "",
    phone: "",
  });
  const [isDisable, setIsDisable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        setIsLoading(true);
        const res = await getUserDetails();
        if (res?.status === 200) {
          setCurrentUser(res?.data?.user);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setCurrentUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurrentUser();
  }, [isLoggedIn]);

  const handleChange = (e) => {
    setCurrentUser({
      ...currentUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = () => {
    setIsDisable(!isDisable);
  };

  const handleEditUser = async () => {
    setIsLoading(true);
    if (currentUser) {
      let res = await editUserDetials(currentUser);
      if (res?.status === 200) {
        setCurrentUser(res?.data?.user);
        setIsEdit(false);
        setIsDisable(true);
        sendNotification("success", res?.data?.message);
      } else {
        // sendNotification("warning", res?.response?.data?.message);
      }
    }
    setIsLoading(false);
  };

  if (isLoading) return <CustomLoader />;
  return (
    <BasicFormLayout
      pageTitle="Profile"
      pageIcon={<VscAccount />}
      handleEdit={handleEdit}
      isDisable={isDisable}
      checked={isEdit}
      setChecked={setIsEdit}
      showEditIcon={true}
    >
      <div className="flex_center">
        {isLoggedIn && currentUser ? (
          <form className="h-75 p-5">
            <div className="d-flex justify-content-between">
              <h2 className="fw-bold mb-5 text-uppercase">profile !</h2>
            </div>
            <CustomInput
              mb={5}
              label="Username"
              name="username"
              handleChange={handleChange}
              value={currentUser?.username}
              isDisable={isDisable}
              textStyle={"capitalize"}
            />
            <CustomInput
              name="email"
              label="Email"
              mb={5}
              type="text"
              value={currentUser?.email}
              handleChange={handleChange}
              isDisable={isDisable}
            />
            <CustomInput
              name="phone"
              label="Phone"
              mb={5}
              type="text"
              value={currentUser?.phone}
              handleChange={handleChange}
              isDisable={isDisable}
            />
            {/* disable false means user can edit */}
            {isDisable ? null : isLoading ? (
              <Button
                variant="primary"
                className="px-5 py-2 rounded-5 fw-bold  mb-4"
                style={{ boxShadow: config.theme.form_btn_box_shadow }}
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
                className="px-5 py-2 rounded-5 fw-bold  mb-4"
                style={{ boxShadow: config.theme.form_btn_box_shadow }}
                onClick={handleEditUser}
              >
                Save Changes
              </Button>
            )}
          </form>
        ) : null}
      </div>
    </BasicFormLayout>
  );
};

export default Profile;
