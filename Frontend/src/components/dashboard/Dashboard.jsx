import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";
import { FaGithub } from "react-icons/fa6";
import { RepositorySidebar } from "./RepositorySidebar";
import { IoHomeOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import MainContent from "./MainContent";
import EventBar from "./EventBar";
export const Dashboard = () => {
  const [suggestedRepos, setSuggestedRepos] = React.useState([]);
  const [userRepos, setUserRepos] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const navigate = useNavigate();
  const [activePage, setActivePage] = React.useState("Dashboard");
  const [isOpen, setIsOpen] = React.useState(false);

  useEffect(() => {
    try {
      const userId = localStorage.getItem("userId");
      const getAllRepos = async () => {
        const repos = await axios.get(
          `${import.meta.env.VITE_URL}/current-user/${userId}`,
          { withCredentials: true },
        );
        console.log("repos", repos);
        setUserRepos(repos.data);
        getAllRepos();
      };
    } catch (error) {
      console.error("Error fetching user repositories:", error);
      setError(error);
    }


  }, []);


  useEffect(() => {
    const fetchSuggestedRepository = async () => {
      const repos = await axios.get(
        `${import.meta.env.VITE_URL}/all-repos`
      );
      setSuggestedRepos(repos.data);
      console.log("fetchsuggested Repository", repos);
    };
    try {
    } catch (error) {
      console.error("Error fetching suggested repositories:", error);
      setError(error);
    }


    fetchSuggestedRepository();
  }, []);

  return (
     <>
    <div className="fixed inset-0 z-[9999] dashboard-container">


      <div className="navbar-container">
        <div className="navbar-left">
          <div className='hmbm-glogo-container' onClick={() => setIsOpen(true)}>
            <RxHamburgerMenu />
          </div>

          <FaGithub className='hmbm-glogo' onClick={() => navigate('/')} />

          <div className='font-semibold py-1 px-2 hover:bg-gray-800 dashboard-text' onClick={() => navigate('/')}>Dashboard</div>
        </div>

        <div>for right</div>

      </div>

            {/* Overlay */}
      {isOpen && <div
        className={`overflow-y-auto  top-0 left-0 h-full w-80 bg-black text-white p-2
        transform transition-transform duration-300 z-[9999]  rounded-t-lg border-r border-gray-400
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >

        <div className="flex justify-between mb-4 pl-4">
          <FaGithub className='w-8 h-15 ' onClick={() => navigate('/home')} />
          <button
            onClick={() => setIsOpen(false)}
            className="text-4xl p-4"
          >
            <RxCross2 />
          </button>
        </div>

        <div className="flex flex-col mb-4 pl-4 gap-2">

          <div className="flex flex-row items-center gap-2 font-semibold p-2  hover:rounded-lg hover:bg-gray-900 ">
            <IoHomeOutline className="text-lg" /> <span>Home</span>
          </div>

          <div className="flex flex-row items-center gap-2 font-semibold p-2 hover:rounded-lg hover:bg-gray-900">
            <IoHomeOutline className="text-lg" /> <span>Home</span>
          </div>

          <div className="flex flex-row items-center gap-2 font-semibold p-2 hover:rounded-lg hover:bg-gray-900">
            <IoHomeOutline className="text-lg" /> <span>Home</span>
          </div>

          <div className="flex flex-row items-center gap-2 font-semibold p-2 hover:rounded-lg hover:bg-gray-900">
            <IoHomeOutline className="text-lg" /> <span>Home</span>
          </div>

          <div className="flex flex-row items-center gap-2 font-semibold p-2 hover:rounded-lg hover:bg-gray-900">
            <IoHomeOutline className="text-lg" /> <span>Home</span>
          </div>

        </div>
        {/*  divider for section*/}
        <div className="block border-t border-gray-300 opacity-25"></div>


        <div className="flex flex-col mb-4 pl-4 gap-2">

          <div className="flex flex-row items-center gap-2 font-semibold p-2  hover:rounded-lg hover:bg-gray-900 ">
            <IoHomeOutline className="text-lg" /> <span>Home 2</span>
          </div>

          <div className="flex flex-row items-center gap-2 font-semibold p-2 hover:rounded-lg hover:bg-gray-900">
            <IoHomeOutline className="text-lg" /> <span>Home 2</span>
          </div>

          <div className="flex flex-row items-center gap-2 font-semibold p-2 hover:rounded-lg hover:bg-gray-900">
            <IoHomeOutline className="text-lg" /> <span>Home 2</span>
          </div>

          <div className="flex flex-row items-center gap-2 font-semibold p-2 hover:rounded-lg hover:bg-gray-900">
            <IoHomeOutline className="text-lg" /> <span>Home 3</span>
          </div>

          <div className="flex flex-row items-center gap-2 font-semibold p-2 hover:rounded-lg hover:bg-gray-900">
            <IoHomeOutline className="text-lg" /> <span>Home 4</span>
          </div>

        </div>

        {/* section for top repositories*/}
        <div className="block border-t border-gray-300 opacity-25"></div>

        <div className="bg-gray-500 flex px-2 items-center">
          <span>Top repositories</span>
          <span><CiSearch /></span>
        </div>

        <div className="flex flex-col mb-4 pl-4 gap-2">

          <div className="flex flex-row items-center gap-2 font-semibold p-2  hover:rounded-lg hover:bg-gray-900 ">
            <IoHomeOutline className="text-lg" /> <span>Home 2</span>
          </div>

          <div className="flex flex-row items-center gap-2 font-semibold p-2 hover:rounded-lg hover:bg-gray-900">
            <IoHomeOutline className="text-lg" /> <span>Home 2</span>
          </div>

          <div className="flex flex-row items-center gap-2 font-semibold p-2 hover:rounded-lg hover:bg-gray-900">
            <IoHomeOutline className="text-lg" /> <span>Home 2</span>
          </div>

          <div className="flex flex-row items-center gap-2 font-semibold p-2 hover:rounded-lg hover:bg-gray-900">
            <IoHomeOutline className="text-lg" /> <span>Home 3</span>
          </div>

          <div className="flex flex-row items-center gap-2 font-semibold p-2 hover:rounded-lg hover:bg-gray-900">
            <IoHomeOutline className="text-lg" /> <span>Home 4hehehef</span>
          </div>

        </div>


      </div>
      }


      <div className="flex">

        {/* Repository Sidebar */}
        <div className="hidden md:block">
          <RepositorySidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0 ">
          <MainContent />
          
        </div>

        {/* Event Bar */}
        <div className="hidden md:block  ">
          <EventBar/>
        </div>

      </div>

    </div>

    </>
  )

};
