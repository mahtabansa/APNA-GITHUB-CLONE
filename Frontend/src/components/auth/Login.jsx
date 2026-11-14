import React from 'react'
import { FaGithub } from "react-icons/fa";
import axios from 'axios';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthProvider.jsx';

const loginSchema = z.object({
   email:z.string().min(3,"please enter valid username or email"),
   password:z.string().min(8,"enter valid password")
})

export const Login = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useAuth();
  const {register,handleSubmit,formState:{errors,isSubmitting}} = useForm({
    resolver:zodResolver(loginSchema)
  });

    const onSubmit = async(data) => {
       
        try {
            const result = await axios.post(`${import.meta.env.VITE_URL}/auth`, data,{withCredentials:true});
             localStorage.setItem("token",result.data.token);
             localStorage.setItem("userId",result.data.userId);
             setCurrentUser(result.data.userId);
             navigate("/");
        } catch (error) {
            console.log('Error while login',error);

        }
    };

  return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">

        <div className="text-center mb-6">
          <div className=" flex justify-center text-center text-white mb-4">
            <div className="text-6xl ">
              <FaGithub />
            </div>
          </div>

        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-[#161b22] border border-[#30363d]
             rounded-lg p-6 space-y-5"
        >
          <div>
            <label className="block text-white text-sm mb-2">
              Username or email
            </label>
            <input
              type="text"
              name="email"
              {...register("email")}
              placeholder="Enter username or email"
              className="w-full bg-[#0d1117] border border-[#30363d]
                 rounded-md px-3 py-2 text-white outline-none
                 focus:border-blue-500"
            />
          <p className="text-gray-500 text-xs mt-2">
            {errors?.email?.message}
            </p>
          </div>


          <div>
            <label className="block text-white text-sm mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              {...register("password")}
              placeholder="Enter password"
              className="w-full bg-[#0d1117] border border-[#30363d]
                 rounded-md px-3 py-2 text-white outline-none
                 focus:border-blue-500"
            />
            <p className="text-gray-500 text-xs mt-2">
            {errors?.password?.message}
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-[#238636] hover:bg-[#2ea043]
               text-white font-semibold py-2 rounded-md transition" disabled={isSubmitting}
          >
            {isSubmitting?"Submitting...":"Login"}
          </button>
        </form>

        <div className="border border-[#30363d] rounded-md
           text-center p-2 mt-4 text-sm text-gray-300">
          Create an account?
          <a href="/signup">signup</a>
        </div>

      </div>
    </div>
  )
}
