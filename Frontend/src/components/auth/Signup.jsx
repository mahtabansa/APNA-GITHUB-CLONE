import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import axios from 'axios';
import { useForm } from "react-hook-form"
import z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";

const signupSchema = z.object({

    username: z.string()
        .min(3, "username must be at least 3 character"),

    email: z.string().min(3,"Enter valid email"),

    password: z.string().min(8, "Password must be 8 character"),

})

export const Signup = () => {

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: zodResolver(signupSchema)
    });
    console.log("re-render");

    const onSubmit = async (data) => {
       
        console.log(data);
        try {
            const result = await axios.post(`${import.meta.env.VITE_URL}/signup`, data,{withCredentials:true});
            console.log(result.data.message);
            
             localStorage.setItem({"token":result.token})
             localStorage.setItem({"userId":result.userId})
        } catch (error) {
            console.log('Error while Creating signup',error);

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

                    <h2 className="text-white text-2xl font-semibold">
                        Create your account
                    </h2>
                    <p className="text-gray-400 mt-2">
                        Join GitHub and start building.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="bg-[#161b22] border border-[#30363d]
          rounded-lg p-6 space-y-5"
                >
                    <div>
                        <label className="block text-white text-sm mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            {...register("username")}
                            placeholder="Enter username"
                            className="w-full bg-[#0d1117] border border-[#30363d]
              rounded-md px-3 py-2 text-white outline-none
              focus:border-blue-500"
                        />
                    </div>
                     <p className="text-gray-500 text-xs mt-2">
                           {errors?.username?.message}
                        </p>


                    <div>
                        <label className="block text-white text-sm mb-2">
                            Email address
                        </label>
                        <input
                            type="email"
                            name="email"
                            {...register("email")}
                            placeholder="Enter email"
                            className="w-full bg-[#0d1117] border border-[#30363d]
              rounded-md px-3 py-2 text-white outline-none
              focus:border-blue-500"
                        />
                    </div>
                     <p className="text-gray-500 text-xs mt-2">
                           {errors?.email?.message}
                        </p>

                    <div>
                        <label className="block text-white text-sm mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            {...register("password")}
                            placeholder="Create password"
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
                        className=" w-full bg-[#238636] hover:bg-[#2ea043]
            text-white font-semibold py-2 rounded-lg transition" disabled={isSubmitting}
                    >
                        {isSubmitting ? "Submitting.." : "Sign Up"}
                    </button>

                </form>

                <div className="border border-[#30363d] rounded-md
        text-center p-4 mt-4 text-sm text-gray-300">
                    Already have an account?
                    <a href="/auth" className="text-sm font-bold text-blue-400 ml-1 hover:underline">
                        Sign in
                    </a>
                </div>

            </div>
        </div>
    );
}
