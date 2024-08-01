function Register() {
    return (
      <div className="w-full max-w-xs ">
        <div className="bg-gray-800  rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Sign up to Barnes!</h2>
          <form className="space-y-4 px-1 mt-0"> {/* Added padding here */}
            <div>
              <input
                type="text"
                placeholder="Enter your Phone Number"
                className="w-full p-3 rounded bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full p-3 rounded bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Enter Email"
                className="w-full p-3 rounded bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Enter password"
                className="w-full p-3 rounded bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Re-Type Password"
                className="w-full p-3 rounded bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
            <div>
              <select
                className="w-full p-3 rounded bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              >
                <option value="">Select Account Type</option>
                <option value="personal">Personal</option>
                <option value="business">Business</option>
              </select>
            </div>
            <div>
              <input
                type="text"
                placeholder="Enter Referral Code (Optional)"
                className="w-full p-3 rounded bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                className="mr-2 focus:ring-red-500"
                required
              />
              <span className="text-gray-400">
                I agree with the Terms of Service and Privacy policy
              </span>
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded bg-red-800 text-white font-bold hover:bg-red-900 transition duration-200" // Adjusted button color
            >
              Create Account
            </button>
          </form>
          <p className="mt-4 text-center text-gray-400">
            Already have an account? <a href="#" className="text-red-500">Login</a>
          </p>
        </div>
      </div>
    );
  }
  
  export default Register;
  