import React, { useState } from "react";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";


const NavBar = ({ setSearch }) => {
  function showDropdownOptions() {
    document.getElementById("options").classList.toggle("hidden");
    document.getElementById("arrow-up").classList.toggle("hidden");
    document.getElementById("arrow-down").classList.toggle("hidden");
  }

  const [nav, setNav] = useState(false);

  const navState = () => {
    setNav(!nav);
  };
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      <nav className="flex px-4 pt-2 justify-between md:mx-32">
        <h1
          className="px-1 p-4 w-auto font-bold flex items-center justify-center sm:justify-start text-xl
        "
        >
          <Link to="/">deets.</Link>
        </h1>
        <div className="my-4 relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              className="w-5 h-5 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </span>

          <input
            type="text"
            className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:text-gray-300  focus:border-blue-400  focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="md:flex hidden">
          <a
            className="p-4 font-semibold  hover:underline underline-offset-8"
            href="/archive"
          >
            archive
          </a>
          <div className="p-4 font-semibold  hover:underline underline-offset-8 cursor-pointer">
            <a>{userInfo.name}</a>
          </div>

          <a
            type="submit"
            onClick={logoutHandler}
            className="flex justify-center font-semibold pt-4  hover:underline underline-offset-8 "
          >
            logout
          </a>
        </div>
        <div onClick={navState} className="flex md:hidden p-4 items-center ">
          {!nav ? <HiMenuAlt4 size={20} /> : <HiX size={20} />}
        </div>
        <div
          className={
            !nav
              ? "hidden"
              : "md:hidden my-12 absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white "
          }
        >
          <div>
            <a
              className="flex justify-center font-semibold pt-4  hover:underline underline-offset-8 "
              href="/archive"
            >
              archive
            </a>
            <div className="flex justify-center flex-col">
              <div className="p-4 font-semibold  hover:underline underline-offset-8 cursor-pointer justify-center">
                <a className="flex justify-center font-semibold pt-4  hover:underline underline-offset-8 ">{userInfo.name}</a>
              </div>

              <a
                type="submit"
                onClick={logoutHandler}
                className="flex justify-center font-semibold pt-4  hover:underline underline-offset-8 cursor-pointer "
              >
                logout
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
