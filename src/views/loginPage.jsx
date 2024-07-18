import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import FooterImg from "../assets/img/footerRight.png";
import LoginImage from "../assets/img/Login_image.jpg";

function LoginPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const usernameRef = useRef("");
  const passwordRef = useRef("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    let eid = localStorage.getItem("eid");

    if (!username || !password) {
      alert("Kindly Enter User Credentials");
      return false;
    }

    const TaskIDPKURL = `https://smartfm.in/NSEIPLSERVICE/UserValidation.php?UserName=${username}&Password=${password}`;

    try {
      const response = await fetch(TaskIDPKURL);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const eid = data.UserValues[0].EmployeeID;
      const UserIDPK = data.UserValues[0].UserIDPK;
      const IsCreatedTask = data.UserValues[0].IsCreatedTask;
      // console.log("🚀 ~ handleLogin ~ NstUserID:", UserIDPK);

      if (!data.UserValues[0].UserIDPK) {
        alert("Invalid UserName / Password");
        return false;
      }

      // Save username to local storage
      localStorage.setItem("username", username);
      localStorage.setItem("eid", eid);
      localStorage.setItem("UserIDPK", UserIDPK);
      localStorage.setItem("IsCreatedTask", IsCreatedTask);
      navigate("/Home");
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString();

  return (
    <div>
      <header>
        <section className="Login_main overflow-hidden">
          <div className="flex">
            <div className="w-3/4 h-screen">
              <img className="overflow-hidden" src={LoginImage} alt="Login" />
            </div>
            <div className="w-1/4 h-screen flex flex-col justify-center items-center">
              <div className="justify-center items-center fixed top-4 right-4 p-1">
                <div className="flex items-center"></div>
                <div id="clock" className="text-2xl font-bold mt-2">
                  <div class="flex items-center">
                    <i
                      id="day-icon"
                      class="far fa-sun clock-icon text-yellow-500 mr-2"
                    ></i>
                    <i
                      id="noon-icon"
                      class="fas fa-circle-notch clock-icon text-gray-500 mx-2"
                    ></i>
                    <i
                      id="night-icon"
                      class="far fa-moon clock-icon text-gray-500 ml-2"
                    ></i>
                  </div>
                  {formattedTime}
                </div>
              </div>
              <p className="text-2xl font-bold mb-6 text-center">Login</p>
              <form id="loginForm" className="space-y-4 w-3/4">
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Username:
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    ref={usernameRef}
                    className="w-full border rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Password:
                  </label>
                  <div className="flex items-center border-2 py-2 px-3 rounded-md">
                    <input
                      type={passwordVisible ? "text" : "password"}
                      id="password"
                      name="password"
                      ref={passwordRef}
                      onKeyDown={handleKeyDown}
                      className="pl-2 outline-none border-none"
                    />
                    {/* <input
                      type="checkbox"
                      id="togglePassword"
                      checked={passwordVisible}
                      onChange={() => setPasswordVisible(!passwordVisible)}
                    /> */}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleLogin}
                  className="w-full bg-blue-500 text-white rounded-md py-2 transition duration-300 hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200"
                >
                  Login
                </button>
              </form>
            </div>
            <div>
              <img
                className="fixed bottom-4 right-4 h-12 p-2"
                src={FooterImg}
                alt="Footer"
              />
            </div>
          </div>
        </section>
      </header>
    </div>
  );
}

export default LoginPage;
