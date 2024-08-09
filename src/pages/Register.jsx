import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import TermsPopup from "../components/TermsPopup";
import PrivacyPopup from "../components/PrivacyPolicyPopup";

function Register() {
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [formData, setFormData] = useState({
    phoneNumber: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    accountType: '',
    referralCode: ''
  });

  const handleTermsClick = (e) => {
    e.preventDefault();
    setShowTerms(true);
  };

  const handlePrivacyClick = (e) => {
    e.preventDefault();
    setShowPrivacy(true);
  };

  const closeTermsPopup = () => {
    setShowTerms(false);
  };

  const closePrivacyPopup = () => {
    setShowPrivacy(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Implement your form submission logic here
    console.log("Form Data Submitted:", formData);

    // Clear form fields after submission
    setFormData({
      phoneNumber: '',
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      accountType: '',
      referralCode: ''
    });

    // Optionally, redirect or show a success message
  };

  return (
    <div className="w-full max-w-xs">
      <div className="bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Sign up to Barnes!</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              placeholder="Enter your Phone Number"
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Enter your name"
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="Enter Email"
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              value={formData.password}
              placeholder="Enter password"
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              placeholder="Re-Type Password"
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          <div>
            <select
              name="accountType"
              value={formData.accountType}
              onChange={handleChange}
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
              name="referralCode"
              value={formData.referralCode}
              placeholder="Enter Referral Code (Optional)"
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              className="w-5 h-6 transform scale-150 mr-2.4 focus:ring-red-500"
              required
            />
            <span className="text-gray-400">
              I agree with the
              <button 
                onClick={handleTermsClick} 
                className="text-red-500 ml-1 hover:cursor-pointer hover:underline"
              >
                Terms of Service
              </button>
              and
              <button 
                onClick={handlePrivacyClick} 
                className="text-red-500 ml-1 hover:cursor-pointer hover:underline"
              >
                Privacy Policy
              </button>
            </span>
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded bg-red-800 text-white font-bold hover:bg-red-900 transition duration-200"
          >
            Create Account
          </button>
        </form>
        <p className="mt-4 text-center text-gray-400">
          Already have an account? 
        </p>
        <NavLink to='/login'>
          <a href="#" className="text-white font-bold hover:underline">Login</a>
        </NavLink>
      </div>
      <TermsPopup show={showTerms} onClose={closeTermsPopup} />
      <PrivacyPopup show={showPrivacy} onClose={closePrivacyPopup} />
    </div>
  );
}

export default Register;
