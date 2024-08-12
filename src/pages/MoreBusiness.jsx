import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ContactPopup from "../components/ContactPopup";
import AboutUsPopup from "../components/AboutUsPopup";
import ChangePasswordPopup from "../components/ChangePasswordPopup";
import Logout from "../components/Logout";
import DeleteAccount from "../components/DeleteAccount";
import EditDetailsPopup from "../components/EditDetailsPopup";
import { useAuth } from '../components/AuthProvider';
import SwitchAccount from "../components/SwitchAccount";


function MoreBusiness() {
  
  const [isLoading, setIsLoading] = useState(true); // New loading state
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);
  const [isAboutUsPopupOpen, setIsAboutUsPopupOpen] = useState(false);
  const [isChangePasswordPopupOpen, setIsChangePasswordPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const { getUserId } = useAuth();
  const userID = getUserId();
  const API_URL = "https://barnes.onrender.com/";

  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}users`);
        const data = await response.json();
        const users = data.users;

        users.forEach(user => {
          if (user.id === userID) {
            console.log('Logged in user:', user)
            setUserInfo({
              name: user.name,
              email: user.email,
            });
          }
        });
        setIsLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsLoading(false); // Ensure loading state is updated even on error
      }
    };

    fetchData();
  }, []);
  const handleChangePasswordSubmit = (currentPassword, newPassword) => {
    console.log("Current Password:", currentPassword);
    console.log("New Password:", newPassword);

  };

  const handleDeleteAccount = () => {
    console.log("Account deleted");
  };

  if (isLoading)  {
    // Show a  spinner and message while fetching data
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <svg className="animate-spin h-8 w-8 text-blue-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-2  text-lg font-semibold">Loading user data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm bg-white rounded-b-xl overflow-hidden shadow-lg">
      <div className="flex items-center p-4">
        <img
          className="w-16 h-16 rounded-full"
          src="https://excellence.truman.edu/files/2022/02/Photo-Placeholder-Image-150x150-1.jpg"
          alt="Profile"
        />
        <div className="ml-4">
          <p className="text-gray-500 font-semibold text-centre mt-2 mb-2 text-left">Business Account</p>
          <h2 className="text-neutral-800 text-lg font-semibold text-left">{userInfo.name || 'User Name'}</h2>
          <p className="text-neutral-800 text-left">{userInfo.email || 'user@example.com'}</p>
        </div>
        <div className="ml-auto ">
          <button onClick={() => setIsEditPopupOpen(true)} >
            <svg class=" h-6 w-7 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>

            <i className="fas fa-edit"></i>
          </button>
        </div>
      </div>
      <div className="bg-gray-900 p-4 rounded-t-xl">
        <div className="text-gray-400 mb-2 text-left text-xs">CUSTOMER SUPPORT</div>
        <div className="space-y-2">
          <button className=" w-full flex items-center text-left text-white py-2 px-4 rounded bg-gray-800 hover:bg-gray-700"
          onClick={() => setIsAboutUsPopupOpen(true)}
          >
            <svg className="h-8 w-6 text-slate-400 text-left	" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="ml-2">What is Barnes?</span>
          </button>
          <button className=" w-full flex items-center text-left text-white py-2 px-4 rounded bg-gray-800 hover:bg-gray-700"
          onClick={() => setIsContactPopupOpen(true)}
          >
            <svg class="mr-2 h-8 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Contact Us
          </button>
        </div>
        <div className="text-gray-400 mt-4 mb-2 text-left text-xs ">ACCOUNT</div>
        <div className="space-y-2">
        <SwitchAccount onLogout={() => console.log("Logging out...")} />
        </div>

        <div className="text-gray-400 mt-4 mb-2 text-left text-xs">PREFERENCES</div>
        <div className="space-y-2">
          <button className="w-full flex items-center text-left text-white py-2 px-4 rounded bg-gray-800 hover:bg-gray-700"
          onClick={() => setIsChangePasswordPopupOpen(true)}
          >
            <svg class="h-8 w-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>

            <i className="fas fa-lock mr-2"></i>Change Password
          </button>
          <Logout onLogout={() => console.log("Logging out...")} />
          <DeleteAccount onDelete={handleDeleteAccount} />
        </div>
        <div className="mt-4 text-center">
          <button className="w-full py-2 px-4 rounded bg-green-500 text-white font-bold hover:bg-green-600 transition duration-200">
            Add funds via <span className="ml-2">M-Pesa</span>
          </button>
        </div>
      </div>
      <AboutUsPopup
        isOpen={isAboutUsPopupOpen}
        onClose={() => setIsAboutUsPopupOpen(false)}
      />
      <Navbar/>
      <ContactPopup isOpen={isContactPopupOpen} onClose={() => setIsContactPopupOpen(false)} />
      {isChangePasswordPopupOpen && (
        <ChangePasswordPopup
          onClose={() => setIsChangePasswordPopupOpen(false)}
          onSubmit={handleChangePasswordSubmit}
        />
      )}
      <EditDetailsPopup isOpen={isEditPopupOpen} onClose={() => setIsEditPopupOpen(false)} />


    </div>
  );
}

export default MoreBusiness;
