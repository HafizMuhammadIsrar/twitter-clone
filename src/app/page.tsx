"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaTwitter } from "react-icons/fa";

const TwitterLoginPage = () => {
  const [username, setUsername] = useState("dummy_user");
  const [password, setPassword] = useState("password123");
  const route = useRouter();
  const handleLogin = (e: any) => {
    e.preventDefault();
    // Dummy login action - you could add your own login logic here.
    console.log("Logging in with:", username, password);
    route.push("/dashboard");

    // alert("Logged in successfully!");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
        <div className="flex justify-center mb-6 text-blue-500">
          <FaTwitter size={50} />
        </div>
        <h2 className="mb-6 text-2xl font-bold text-center">
          Log in to Twitter
        </h2>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-3 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Log In
          </button>
        </form>

        <div className="mt-6 text-center">
          <a href="#" className="text-sm text-blue-500 hover:underline">
            Forgot password?
          </a>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="#" className="font-semibold text-blue-500 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TwitterLoginPage;

// import { useRouter } from "next/navigation";

// export default function Home() {
//   const route = useRouter();

//   return (
//     <div className="flex font-custom    flex-col items-center gap-6 min-h-screen p-8 pb-20  sm:p-20 ]">
//       Home Page{" "}
//       <button
//         onClick={() => {
//           route.push("/dashboard");
//         }}
//       >
//         Click here to Go dashboard
//       </button>
//     </div>
//   );
// }
