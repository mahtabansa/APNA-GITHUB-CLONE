import { useState } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { NavLink, useNavigate } from "react-router-dom";

const repositories = [
  { id: 1, name: "apna-github-clone" },
  { id: 2, name: "MERN-Project" },
  { id: 3, name: "Portfolio" },
  { id: 4, name: "E-commerce" },
];

export const RepositorySidebar = ({ onSelect, activeRepo }) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filteredRepos = repositories.filter((repo) =>
    repo.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <aside className=" w-80 h-full bg-[#15191e]  ring-1 ring-[#4f4d4d] p-4 focus:outline-blue-800 ">

      <div className="flex flex-col mb-4  gap-2">
     
               <div className="flex flex-row items-center gap-2 font-semibold p-2  hover:rounded-lg hover:bg-gray-700 ">
                 <IoHomeOutline className="text-lg" /> <span>Home</span>
               </div>

                 <div className="flex flex-row items-center gap-2 font-semibold p-2  hover:rounded-lg hover:bg-gray-700 ">
                 <IoHomeOutline className="text-lg" /> <span>Home</span>
               </div>

                 <div className="flex flex-row items-center gap-2 font-semibold p-2  hover:rounded-lg hover:bg-gray-700 ">
                 <IoHomeOutline className="text-lg" /> <span>Home</span>
               </div>
      </div>
      <div className="block border-t border-gray-300 opacity-25 my-3 "></div>

      <div className="flex justify-between px-2 items-center mb-4">
              <span className="opacity-75">Top repositories</span>
              <CiSearch className="text-xl opacity-75 font-extrabold" />
      </div>

      <div className="space-y-2">
        {filteredRepos.map((repo) => (
          <>
            
            <div className="flex flex-row items-center gap-2 hover:rounded-lg hover:bg-gray-700 " onClick={()=>navigate("/hello")} >
              <div className=" relative overflow-hidden w-10 h-10 rounded-[50%]">
                <img src="https://static.everypixel.com/ep-pixabay/0329/8099/0858/84037/3298099085884037069-head.png"    alt="avtar" class="h-full w-full object-contain" />
              </div>
              <div>{repo.name}</div>
          </div>
          
          </>
        ))}
      </div>

    </aside>
  );
}