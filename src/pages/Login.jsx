import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthProvider';
import backgroundImage from '../assets/loginbackground.png'; 

function Login() {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isSwitching, setIsSwitching] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false); // State to manage success message visibility
  const [errorMessage, setErrorMessage] = useState(''); // State to manage error messages
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setIsSwitching(true);
    e.preventDefault();

    const isEmail = emailOrPhone.includes('@');
    const isPhoneNumber = /^(2547\d{8}|07\d{8})$/.test(emailOrPhone);

    if (!isEmail && !isPhoneNumber) {
      setErrorMessage('Please enter a valid email or phone number');
      setIsSwitching(false);
      return;
    }

    try {
      const loginResponse = await fetch('https://barnes.onrender.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: isEmail ? emailOrPhone : '',
          phone_number: isPhoneNumber ? emailOrPhone : '',
          password,
        }),
      });
      const loginData = await loginResponse.json();

      if (loginResponse.ok) {
        const usersResponse = await fetch('https://barnes.onrender.com/users');
        const usersData = await usersResponse.json();

        const user = usersData.users.find(u => u.email === emailOrPhone || u.phone_number === emailOrPhone);

        if (user) {
          login(loginData.access_token, user); 
          setIsSwitching(false); 
          setShowSuccess(true); // Show the success message
          setTimeout(() => {
            navigate('/home'); // Redirect after 3 seconds
          }, 3000);
        } else {
          setErrorMessage('User not found');
          setIsSwitching(false);
        }
      } else {
        setErrorMessage(loginData.msg || 'Invalid credentials');
        setIsSwitching(false);
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('An error occurred. Please try again.');
      setIsSwitching(false);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div
      className="bg-cover bg-center h-screen w-screen flex items-center justify-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="pl-4 pr-4 max-w-xs">
        <div className="bg-[#242424] p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Login to Barnes!</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-400">Email Address<span className="text-red-500">*</span></label>
              <input
                type="text"
                placeholder="Email address"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                className="w-full p-3 rounded bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
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
            <button
              type="submit"
              className={`w-full py-3 rounded font-bold transition duration-200 ${isSwitching ? 'cursor-not-allowed opacity-50' : ''} ${errorMessage ? 'bg-red-600 text-white' : 'bg-red-600 text-white hover:bg-red-700'}`}
              disabled={isSwitching}
            >
              {isSwitching ? 'Attempting to ' : ''}
              {errorMessage ? 'Login' : 'Login'}
            </button>
            {errorMessage && <div className="text-red-500 text-center mt-2">{errorMessage}</div>}
          </form>
          <div className="text-center mt-4">
            <a href="/register" className="text-white font-bold hover:underline">Sign Up</a>
          </div>
        </div>
      </div>
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-60">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <div className="w-20 h-20 rounded-full bg-green-100 p- mx-auto mb-3.5">
              <svg
                className="w-20 h-20 text-green-500 animate-checkmark-fade"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="text-2xl text-gray-500 font-semibold mb-2">Successful Login!</h3>
            <p className="text-sm text-gray-500">
              Redirecting you now...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
