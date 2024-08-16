import React, { useState, useEffect } from "react";
import ContactPopup from "../components/ContactPopup";
import EditDetailsPopup from "../components/EditDetailsPopup";
import ChangePasswordPopup from "../components/ChangePasswordPopup";
import Logout from "../components/Logout";
import DeleteAccount from "../components/DeleteAccount";
import AboutUsPopup from "../components/AboutUsPopup";
import SwitchAccount from "../components/SwitchAccount";
import { useAuth } from '../components/AuthProvider';
import TipsPopup from "../components/TipsPopup";

function More({ emailOrPhone }) {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    referralCode: '',
    referralPoints: 0
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isChangePasswordPopupOpen, setIsChangePasswordPopupOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isAboutUsPopupOpen, setIsAboutUsPopupOpen] = useState(false);
  const [isTipsPopupOpen, setIsTipsPopupOpen] = useState(false);
  const { getUserId } = useAuth();
  const userID = getUserId();
  const API_URL = "https://barnes.onrender.com/";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}users`);
        const data = await response.json();
        const users = data.users;

        users.forEach(user => {
          if (user.id === userID) {
            setUserInfo({
              name: user.name,
              email: user.email,
              referralCode: user.referral_code,
              referralPoints: user.referral_count,
              roleId: user.role_id
            });
          }
        });
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [emailOrPhone]);

  const handleChangePasswordSubmit = (currentPassword, newPassword) => {
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(userInfo.referralCode).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  const handleDeleteAccount = () => {
    console.log("Account deleted");
  };

  const handleUpdateUserDetails = (updatedDetails) => {
    setUserInfo(prev => ({
      ...prev,
      ...updatedDetails
    }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <svg className="animate-spin h-8 w-8 text-blue-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-2 ">Loading user data...</p>
        </div>
      </div>
    );
  }
  if (userInfo.roleId === 2) {

    return (
      <div className="w-screen h-screen bg-white overflow-hidden shadow-lg">
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
              <svg className=" h-6 w-7 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
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
              <span className="ml-3">What is Barnes?</span>
            </button>
            <button className=" w-full flex items-center text-left text-white py-2 px-4 rounded bg-gray-800 hover:bg-gray-700"
              onClick={() => setIsContactPopupOpen(true)}
            >
              <svg className="mr-2 h-8 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="">Contuct Us</span>
              </button>
            <button className=" w-full flex items-center text-left text-white py-2 px-4 rounded bg-gray-800 hover:bg-gray-700"
              onClick={() => setIsTipsPopupOpen(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-80q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-200v-80h320v80H320Zm10-120q-69-41-109.5-110T180-580q0-125 87.5-212.5T480-880q125 0 212.5 87.5T780-580q0 81-40.5 150T630-320H330Zm24-80h252q45-32 69.5-79T700-580q0-92-64-156t-156-64q-92 0-156 64t-64 156q0 54 24.5 101t69.5 79Zm126 0Z"/></svg>
              <span className="ml-2">Tips on Managing Finances</span>
            </button>
          </div>
          
          <div className="text-gray-400 mt-4 mb-2  text-left text-xs ">ACCOUNT</div>
          <div className="space-y-2">
            <SwitchAccount />
          </div>

          <div className="text-gray-400 mt-4 mb-2 text-left text-xs">PREFERENCES</div>
          <div className="space-y-2">
            <button className="w-full flex items-center text-left text-white py-2 px-4 rounded bg-gray-800 hover:bg-gray-700"
              onClick={() => setIsChangePasswordPopupOpen(true)}
            >
              <svg className="h-8 w-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>

              <i className="fas fa-lock mr-2"></i>Change Password
            </button>
            <Logout onLogout={() => console.log("Logging out...")} />
            <DeleteAccount onDelete={handleDeleteAccount} />
          </div>
          <div className="mt-4 text-center">
            <button className="w-full py-2 px-4 rounded-full bg-white text-green-700 font-bold hover:bg-neutral-400 transition duration-200">
              Save funds via <span className="ml-2">M-Pesa</span>
            </button>
          </div>
        </div>
        <AboutUsPopup
          isOpen={isAboutUsPopupOpen}
          onClose={() => setIsAboutUsPopupOpen(false)}
        />
        <TipsPopup
        isOpen={isTipsPopupOpen}
        onClose={() => setIsTipsPopupOpen(false)}
      />
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
  return (
    <div className="w-screen h-screen bg-white 	 overflow-hidden shadow-lg">
      <div className="flex items-center p-4">
        <img
          className="w-16 h-16 rounded-full"
          src="https://excellence.truman.edu/files/2022/02/Photo-Placeholder-Image-150x150-1.jpg"
          alt="Profile"
        />
        <div className="ml-4">
          <p className="text-gray-500 font-semibold mt-2 mb-2 text-left">Personal Account</p>
          <h2 className="text-neutral-800 text-lg font-semibold text-left">{userInfo.name || 'User Name'}</h2>
          <p className="text-neutral-800 text-left">{userInfo.email || 'user@example.com'}</p>
          <p className="text-neutral-600 text-left">Referral points: {userInfo.referralPoints || 0}</p>
        </div>
        <div className="ml-auto">
          <button onClick={() => setIsEditPopupOpen(true)}>
            <svg className="h-6 w-7 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
        </div>
      </div>
      <div className="bg-gray-900 p-4 rounded-t-xl">
        <div className="text-gray-400 mb-2 text-left text-xs">CUSTOMER SUPPORT</div>
        <div className="space-y-2">
          <button className="w-full flex items-center text-left text-white py-2 px-4 rounded bg-gray-800 hover:bg-gray-700"
            onClick={() => setIsAboutUsPopupOpen(true)}
          >
            <svg className="h-8 w-6 text-slate-400 text-left" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="ml-2">What is Barnes?</span>
          </button>
          <button
            className="w-full flex items-center text-left text-white py-2 px-4 rounded bg-gray-800 hover:bg-gray-700"
            onClick={() => setIsContactPopupOpen(true)}
          >
            <svg className="h-8 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <p className='ml-2'>Contact Us</p>
          </button>
          <button className=" w-full flex items-center text-left text-white py-2 px-4 rounded bg-gray-800 hover:bg-gray-700"
              onClick={() => setIsTipsPopupOpen(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-80q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-200v-80h320v80H320Zm10-120q-69-41-109.5-110T180-580q0-125 87.5-212.5T480-880q125 0 212.5 87.5T780-580q0 81-40.5 150T630-320H330Zm24-80h252q45-32 69.5-79T700-580q0-92-64-156t-156-64q-92 0-156 64t-64 156q0 54 24.5 101t69.5 79Zm126 0Z"/></svg>
              <span className="ml-2">Tips on Managing Finaces</span>
            </button>
        </div>
        <div className="text-gray-400 mt-4 mb-2 text-left text-xs">ACCOUNT</div>
        <div className="space-y-2">
          <SwitchAccount />
        </div>
        <div className="text-gray-400 mt-4 mb-2 text-left text-xs">YOUR REFERRAL CODE</div>
        <div className="flex items-center h-13 text-lg bg-slate-700 text-center text-white py-1 px-4 rounded">
          <div className="flex-1">{userInfo.referralCode || 'Referral Code'}</div>
          <button className="button" onClick={handleCopy}>
            <svg className="h-6 w-8 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
            </svg>
          </button>
        </div>
        {isCopied && (
          <div className="mt-2 text-green-500">Code has been copied to Clipboard</div>
        )}
        <div className="text-gray-400 mt-4 mb-2 text-left text-xs">SECURITY</div>
        <div className="space-y-2">
          <button
            className="w-full flex items-center text-left text-white py-2 px-4 rounded bg-gray-800 hover:bg-gray-700"
            onClick={() => setIsChangePasswordPopupOpen(true)}
          >
            <svg className="h-8 w-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
            <p className='ml-2'> Change Password</p>
          </button>
          <Logout onLogout={() => console.log("Logging out...")} />
          <DeleteAccount onDelete={handleDeleteAccount} />
        </div>
        <div className="mt-4 text-center">
          <a href="/budget" >
            <button href="/budget" className="w-full py-2 px-4 rounded-full bg-white text-green-700 font-bold hover:bg-neutral-400 transition duration-200">
              Save funds via <span className="ml-2">M Pesa</span>
            </button>
          </a>

        </div>
      </div>
      <ContactPopup isOpen={isContactPopupOpen} onClose={() => setIsContactPopupOpen(false)} />
      {isEditPopupOpen && (
        <EditDetailsPopup
          currentDetails={userInfo}
          onClose={() => setIsEditPopupOpen(false)}
          onUpdate={handleUpdateUserDetails}
        />
      )}
      {isChangePasswordPopupOpen && (
        <ChangePasswordPopup
          onClose={() => setIsChangePasswordPopupOpen(false)}
          onSubmit={handleChangePasswordSubmit}
        />
      )}
      <AboutUsPopup
        isOpen={isAboutUsPopupOpen}
        onClose={() => setIsAboutUsPopupOpen(false)}
      />
      <TipsPopup
        isOpen={isTipsPopupOpen}
        onClose={() => setIsTipsPopupOpen(false)}
      />
    </div>
  );
}

export default More;