import React from 'react'
import {useNavigate} from 'react-router-dom'
import { RxCross2 } from "react-icons/rx";
const EventBar = () => {
  const navigate = useNavigate();
  return (
   
<aside className="w-[360px] py-4 mr-3 flex flex-col gap-5">

  <div className="flex flex-col">

    {/* Event Banner */}
    <div className="w-full">
      <img
        src="/universe26-virtual.svg"
        alt="Event banner"
        className="w-full h-auto object-cover"
      />
    </div>

    {/* Event Card */}
    <div className="border border-gray-700 rounded-b-lg overflow-hidden">

      {/* Header */}
      <div className="flex justify-between items-center p-3 border-b border-gray-700">

        <img
          src="/universe26-logo-dark.svg"
          alt="Universe 2026 logo"
        />

        <RxCross2 className="cursor-pointer text-gray-400 hover:text-white" />

      </div>

      {/* Description */}
      <div className="flex items-center py-3 px-3 border-b border-gray-700">

        <span className="text-gray-300">
          Catch up on all that was announced.
        </span>

      </div>

      {/* Button */}
      <div className="m-3 flex justify-center items-center bg-white p-3 text-lg text-black rounded-lg cursor-pointer hover:bg-gray-200">

        <span>See what's new</span>

      </div>

    </div>

  </div>


  
  <div className="flex flex-col">

    {/* Event Card */}
    <div className="border border-gray-700 rounded-lg overflow-hidden ">

      {/* heading  */}
      <div className="flex items-center py-3 px-3 border-b border-gray-700">

        <span className="text-gray-300 text-xl font-semibold">
          Learn. Collaborate. Grow.
        </span>

      </div>


      {/* Description */}
      <div className="flex items-center py-3 px-3 border-b border-gray-700">

        <span className="text-gray-300">
         GitHub Education gives you the tools and community support to take on tech challenges and turn them into opportunities. Your future in tech starts here!
        </span>

      </div>

      {/* Education button  */}
      <div className="flex items-center py-3 px-3 border-b border-gray-700 ">
        
        <span className=" border p-2 border-gray-700 rounded-lg cursor-pointer hover:shadow-lg" onClick={()=>navigate("/education")}>
        Go to GitHub Education 
        </span>

      </div>

    </div>

  </div>

</aside>

  )
}

export default EventBar