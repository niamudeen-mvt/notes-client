import { useEffect, useState } from "react";
import { getUserDetails } from "../services/api/user";
import { useAuth } from "../context/authContext";

const Profile = () => {
  const [currentUser, setCurrentUser] = useState(null);

  const { isLoggedIn } = useAuth();

  console.log(isLoggedIn);
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
  return (
    <div className="text-center my-5">
      {isLoggedIn ? (
        <>
          <h1>User is Logged In</h1>

          <p>Name: {currentUser?.username}</p>
        </>
      ) : (
        <h1>User is Logout</h1>
      )}
    </div>
  );
};

export default Profile;
