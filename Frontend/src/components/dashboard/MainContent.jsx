import React from "react";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { TbBrandGithubCopilot } from "react-icons/tb";
import { useState } from "react";
import { useRef } from "react";
import { CgDebug } from "react-icons/cg";
import { VscSendToRemoteAgent } from "react-icons/vsc";
import { LuCircleDashed } from "react-icons/lu";
import { MdOutlineNoteAdd } from "react-icons/md";
import { IoGitBranchOutline } from "react-icons/io5";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";

const MainContent = () => {
  const [prompt, setPrompt] = useState("");
  const inputRef = useRef(null);

  const handleSubmit = () => {
    if (!prompt.trim()) return;

    console.log("User prompt:", prompt);
    setPrompt("");
  };
  return (
    <>
      <div className="p-4 ">
        <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <TbBrandGithubCopilot className="text-3xl opacity-75" />
          <h3>Good morning, mahtabansa!</h3>
        </div>

          <div className="flex items-center ">
          {" "}
          <span className="text-sm outline-1 outline-offset-2 outline-green-500 rounded-xl text-green-500 px-1 bg-">
            Preview
          </span>{" "}
          <span className="p-1 text-gray-300 text-lg">
            <MdOutlineArrowDropDown />
          </span>
        </div>

        </div>

        <div
          onClick={() => inputRef.current?.focus()}
          className="bg-[#15191e] w-full my-4 rounded-xl
      min-h-[30vh] border border-[#30363d]
      hover:border-gray-500
      focus-within:border-blue-500
      focus-within:ring-1 focus-within:ring-blue-500
      p-4 cursor-text transition-all duration-200"
        >
          <textarea
            ref={inputRef}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="How can I help you today?"
            className="w-full h-25 bg-transparent text-white
        outline-none resize-none placeholder:text-gray-500"
          />

          <div className="flex justify-between items-center mt-3">
            <button className="text-gray-400 hover:text-white">+ Attach</button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleSubmit();
              }}
              disabled={!prompt.trim()}
              className="bg-blue-600 text-white px-4 py-2
          rounded-lg hover:bg-blue-700
          disabled:opacity-40"
            >
              Send ↑
            </button>
          </div>
        </div>

        <div className="flex flex-wrap justify-around items-center gap-2">
          <div className="flex flex-row itmes-center border-1 border-gray-700 rounded-lg items-center px-3 py-2 gap-2">
            <CgDebug className="text-xl opacity-75" />
            <span>Debug</span>
          </div>
          <div className="flex flex-row itmes-center border-1 border-gray-700 rounded-lg items-center px-3 py-2  gap-2">
            {" "}
            <VscSendToRemoteAgent className="text-xl opacity-75" />
            <span>Agent</span>
          </div>
          <div className="flex flex-row itmes-center border-1 border-gray-700 rounded-lg items-center px-3 py-2  gap-2">
            {" "}
            <LuCircleDashed className="text-xl opacity-75" />
            <span>Create Issue</span>
          </div>
          <div className="flex flex-row itmes-center border-1 border-gray-700 rounded-lg items-center px-3 py-2  gap-2">
            <MdOutlineNoteAdd className="text-xl opacity-75" />
            <span>write Code</span>{" "}
            <IoMdArrowDropup className="text-xl opacity-75" />{" "}
          </div>
          <div className="flex flex-row itmes-center border-1 border-gray-700 rounded-lg items-center px-3 py-2  gap-2">
            <IoGitBranchOutline className="text-xl opacity-75" />{" "}
            <span>Git</span> <IoMdArrowDropup className="text-xl opacity-75" />
          </div>
        </div>

        <div className="py-4">
          <div className="flex flex-row justify-between">
            <span className="font-semibold text-medium opacity-75 ">
              Pull requests
            </span>
            <div className="flex flex-row itmes-center gap-2">
              {" "}
              <span className="text-blue-400 text-medium">view all</span>
              <IoMdArrowDropdown className="text-xl opacity-75" />
            </div>
          </div>
        </div>

        <div className="flex items-center w-full h-20 bg-[#15191e] text-white rounded-lg ">
          <span className="opacity-75 p-2">
            No pull request found ,try a different filter.
          </span>
        </div>

        <div className="py-4">
          <div className="flex flex-row justify-between">
            <span className="font-semibold text-medium opacity-75 ">
              Issues
            </span>
            <div className="flex flex-row itmes-center gap-2">
              {" "}
              <span className="text-blue-400 text-medium">view all</span>
              <IoMdArrowDropdown className="text-xl opacity-75" />
            </div>
          </div>
        </div>

        <div className="flex items-center w-full h-20 bg-[#15191e] text-white rounded-lg ">
          <span className="opacity-75 p-2">
            No issues found, try a different filter.
          </span>
        </div>
      </div>
    </>
  );
};

export default MainContent;
