import React from "react";
import { useAuth } from "../context/authContext";

const Home = () => {
  const { isLoggedIn } = useAuth();
  return (
    <div className="text-center my-5">
      <h1>Welcome !</h1>
      <div className="text-center my-5">
        {isLoggedIn ? (
          <>
            <h1>User is Logged In</h1>
          </>
        ) : (
          <h1>User is Logout</h1>
        )}
      </div>
    </div>
  );
};

export default Home;
