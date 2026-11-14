import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaGithub } from "react-icons/fa6";
import { RepositorySidebar } from "./RepositorySidebar";
import MainContent from "./MainContent";
import EventBar from "./EventBar";
import { IoIosGitPullRequest } from "react-icons/io";
import { RiGitRepositoryFill } from "react-icons/ri";
import { SiGithubcopilot } from "react-icons/si";
import { IoMailUnreadOutline } from "react-icons/io5";
import { VscIssues } from "react-icons/vsc";
import { GoPlus } from "react-icons/go";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { useRef } from "react";
import { FaSearch } from "react-icons/fa";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  const [suggestedRepos, setSuggestedRepos] = React.useState([]);
  const [suggestedReposLoading, setSuggestedReposLoading] =
    React.useState(true);
  const [userRepos, setUserRepos] = React.useState([]);
  const [userDetails,setuserDetails] = useState();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const navigate = useNavigate();
  const [activePage, setActivePage] = React.useState("Dashboard");
  const [isOpen, setIsOpen] = React.useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const fetchUserRepositories = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        setUserRepos([]);
        setLoading(false);
        return;
      }

      try {
        const repos = await axios.get(
          `${import.meta.env.VITE_URL}/current-user-repo/${userId}`,
          { withCredentials: true },
        );

        setUserRepos(repos.data);
        console.log("repos.data", repos);
      } catch (error) {
        console.error("Error fetching user repositories:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRepositories();
  }, []);

  useEffect(() => {
    const fetchSuggestedRepository = async () => {
      try {
        const repos = await axios.get(`${import.meta.env.VITE_URL}/all-repos`);

        setSuggestedRepos(repos.data);
        console.log("respos.data", repos);
      } catch (error) {
        console.error("Error fetching suggested repositories:", error);
        setError(error);
      } finally {
        setSuggestedReposLoading(false);
      }
    };

    fetchSuggestedRepository();
  }, []);

  useEffect(() => {
    
    //get-user-profile
    const fetchUser = async () => {
      const userId = localStorage.getItem("userId");
      try {
        const user = await axios.get(
          `${import.meta.env.VITE_URL}/get-user-profile/${userId}`,
          { withCredentials: true },
        );
        console.log("currentuser", user);
        setuserDetails(user.data)
      } catch(error) {
        console.error("Error fetching suggested repositories:", error);
        setError(error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        e.key === "/" &&
        !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)
      ) {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <div className="relative min-h-screen dashboard-container">
        <div className="navbar-container">
          <div className="navbar-left">
            <div
              className="hmbm-glogo-container"
              onClick={() => setIsOpen(true)}
            >
              <RxHamburgerMenu />
            </div>
            <FaGithub className="hmbm-glogo" onClick={() => navigate("/")} />

            <div
              className="font-semibold py-1 px-2 hover:bg-gray-800 dashboard-text cursor-pointer"
              onClick={() => navigate("/")}
            >
              Dashboard
            </div>
          </div>

          <div className="navbar-right">
            <div
              className="flex items-center gap-2 w-[300px] px-3 py-1.5 
                border border-gray-600 rounded-md 
                bg-[#0d1117] text-gray-400
                hover:border-gray-400
                focus-within:border-blue-500 cursor-pointer"
            >
              <FaSearch className="text-gray-400 text-sm cursor-pointer" />

              <input
                ref={searchRef}
                type="text"
                name="query"
                placeholder="Type / to search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent outline-none 
               text-sm text-white placeholder-gray-400 cursor-pointer"
              />
              <kbd
                className="border border-gray-600 rounded px-1.5 
                  text-xs text-gray-400"
              >
                /
              </kbd>
            </div>

            <div className="flex justify-center items-center  rounded-lg border border-gray-300 opacity-75 gap-1 p-1 cursor-pointer">
              <SiGithubcopilot className="text-lg" />{" "}
              <MdOutlineArrowDropDown className="text-2xl" />{" "}
            </div>

            {/* navbar vertical divider */}
            <div className="h-6  border border-r border-gray-700 opacity-75 "></div>

            <div className="navbar-right">
              <div className="flex justify-center items-center  rounded-lg border border-gray-300 opacity-75 gap-1 p-1 cursor-pointer">
                <GoPlus className="text-2xl" />{" "}
                <MdOutlineArrowDropDown className="text-2xl" />{" "}
              </div>

              <div className="flex justify-center items-center w-8 h-8 rounded-lg border border-gray-300 opacity-75 cursor-pointer">
                <VscIssues />
              </div>

              <div className="flex justify-center items-center w-8 h-8 rounded-lg border border-gray-300 opacity-75 cursor-pointer">
                <IoIosGitPullRequest />
              </div>

              <div className="flex justify-center items-center w-8 h-8 rounded-lg border border-gray-300 opacity-75 cursor-pointer">
                <RiGitRepositoryFill />
              </div>

              <div className="flex justify-center items-center w-8 h-8 rounded-lg border border-gray-300 opacity-75 cursor-pointer">
                <IoMailUnreadOutline />
              </div>

              <div className="flex justify-center items-center overflow-hidden w-8 h-8 rounded-[50%]  border border-gray-300 cursor-pointer">
                {" "}
                <img
                  src="https://static.everypixel.com/ep-pixabay/0329/8099/0858/84037/3298099085884037069-head.png"
                  alt="avtar"
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Overlay */}
        <Sidebar
          userRepos={suggestedRepos}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          navigate={navigate}
        />

        <div className="flex">
          {/* Repository Sidebar */}

          <div className="hidden md:block">
            <RepositorySidebar
              repositories={suggestedRepos}
              loading={loading}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0 ">
            <MainContent />
          </div>

          {/* Event Bar */}
          <div className="hidden md:block  ">
            <EventBar />
          </div>
        </div>
      </div>
    </>
  );
};

export { Dashboard };
