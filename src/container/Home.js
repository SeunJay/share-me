import { useState, useRef, useEffect } from "react";
import { Link, Routes, Route } from "react-router-dom";
import { AiFillCloseCircle } from "react-icons/ai";
import { HiMenu } from "react-icons/hi";

import { Sidebar, UserProfile } from "../components";
import Pins from "./Pins";
import { client } from "../client";
import logo from "../assets/logo.png";
import { userQuery } from "../utils/data";

const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState();
  const scrollRef = useRef(null);

  const userInfo =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();

  useEffect(() => {
    const query = userQuery(userInfo?._id);

    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, [userInfo?._id]);

  console.log(user);

  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out">
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar />
      </div>

      <div className="flex md:hidden flex-row">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
          <HiMenu
            fontSize={40}
            className="cursor-pointer"
            onClick={() => setToggleSidebar(true)}
          />

          <Link to="/">
            <img src={logo} alt="logo" className="w-28" />
          </Link>

          <Link to={`user-profile/${userInfo?._id}`}>
            <img
              src={userInfo?.image}
              alt="user-pic"
              className="w-9 h-9 rounded-full "
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
