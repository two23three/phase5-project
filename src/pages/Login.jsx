import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthProvider';
import backgroundImage from '../assets/loginbackground.png'; 

function Login() {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isEmail = emailOrPhone.includes('@');
    const isPhoneNumber = /^(2547\d{8}|07\d{8})$/.test(emailOrPhone);

    if (!isEmail && !isPhoneNumber) {
      alert('Please enter a valid email or phone number');
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
          navigate('/home'); 
        } else {
          console.log('User not found');
        }
      } else {
        alert(loginData.msg);
      }
    } catch (error) {
      console.error('Login error:', error);
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
            <label className="block text-gray-400">Email or Phone Number<span className="text-red-500">*</span></label>
            <input
              type="text"
              placeholder="Email or Phone (254xxxxxx)"
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
            className="w-full py-3 rounded bg-red-600 text-white font-bold hover:bg-red-700 transition duration-200"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-4">
          <a href="/register" className="text-white font-bold hover:underline">Sign Up</a>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Login;