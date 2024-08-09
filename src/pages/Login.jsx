import React from "react";
import { NavLink } from "react-router-dom";

function Login() {
  return (
    <div className="w-full max-w-xs">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Login to Barnes!</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-400">Email or Phone Number<span className="text-red-500">*</span></label>
            <input
              type="text"
              placeholder="Email or Phone Number"
              className="w-full p-3 rounded bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-400">Password<span className="text-red-500">*</span></label>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          <div className="text-right">
            <a href="#" className="text-gray-400 hover:underline">Forgot Password?</a>
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded bg-red-600 text-white font-bold hover:bg-red-700 transition duration-200"
          >
            Login
          </button>
        </form>
        <div className="flex items-center justify-center mt-6">
          <div className="border-t border-gray-600 w-full"></div>
          <span className="px-9  text-gray-400">Don’t have an account?</span>
          <div className="border-t border-gray-600 w-full"></div>
        </div>
        <div className="text-center mt-4">
          <NavLink
            to='/register'>
            <a href="#" className="text-white font-bold hover:underline">Sign Up</a>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Login