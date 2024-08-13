import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TermsPopup from "../components/TermsPopup";
import PrivacyPolicyPopup from "../components/PrivacyPolicyPopup";

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [role, setRole] = useState('Personal'); // Default role
  const [referralCode, setReferralCode] = useState('');

  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if passwords match
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
  
    // Check if terms are accepted
    if (!termsAccepted) {
      alert('You must accept the Terms and Conditions to register.');
      return;
    }
  
    // Convert phone number to international format if it starts with '07'
    let formattedPhoneNumber = phoneNumber;
    if (formattedPhoneNumber.startsWith('07')) {
      formattedPhoneNumber = '254' + formattedPhoneNumber.substring(1);
    }
    
    // Map role to corresponding number
    const roleId = role === 'Personal' ? 1 : 2;

    // Make the API request
    try {
      const response = await fetch('https://barnes.onrender.com/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone_number: formattedPhoneNumber,
          password,
          role_id: roleId,
          referral_code: referralCode, 
        }),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert('Registration successful');
        navigate('/login');
      } else {
        alert(data.msg || 'An error occurred'); // Show error message from backend
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('An error occurred while registering. Please try again.');
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="w-full max-w-xs mx-auto">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Sign Up for Barnes!</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-400">Name<span className="text-red-500">*</span></label>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-400">Email<span className="text-red-500">*</span></label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-400">Phone Number<span className="text-red-500">*</span></label>
            <input
              type="text"
              placeholder="Enter Phone ( 07xxxxxx)"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-3 rounded bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-400">Role<span className="text-red-500">*</span></label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 rounded bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            >
              <option value="Personal">Personal</option>
              <option value="Business">Business</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-400">Password<span className="text-red-500">*</span></label>
            <div className="relative">
              <input
                type={passwordVisible ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-400"
              >
                {passwordVisible ? 'Hide' : 'Show'}
              </span>
            </div>
          </div>
          <div>
            <label className="block text-gray-400">Confirm Password<span className="text-red-500">*</span></label>
            <div className="relative">
              <input
                type={passwordVisible ? 'text' : 'password'}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 rounded bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-400"
              >
                {passwordVisible ? 'Hide' : 'Show'}
              </span>
            </div>
          </div>
          <div>
            <label className="block text-gray-400">Referral Code:</label>
            <input
              type="text"
              placeholder="Referral code (Optional)"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
              className="w-full p-3 rounded bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={() => setTermsAccepted(!termsAccepted)}
              className="mr-2"
            />
            <span className="text-gray-400">
              I agree with the
              <button 
                onClick={handleTermsClick} 
                className="text-red-500 ml-1 hover:underline"
              >
                Terms of Service
              </button>
              and
              <button 
                onClick={handlePrivacyClick} 
                className="text-red-500 ml-1 hover:underline"
              >
                Privacy Policy
              </button>
            </span>
          </div>
          
          <button
            type="submit"
            className="w-full py-3 rounded bg-red-600 text-white font-bold hover:bg-red-700 transition duration-200"
          >
            Register
          </button>
        </form>
        <div className="text-center text-gray-500 mt-4">
          Already have an account? <a href="/login" className="text-red-500 hover:underline">Log in</a>
        </div>
      </div>
      {showTerms && <TermsPopup onClose={closeTermsPopup} />}
      {showPrivacy && <PrivacyPolicyPopup onClose={closePrivacyPopup} />}
    </div>
  );
}

export default Register;
