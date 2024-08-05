import React from "react";

function MorePersonal() {
  return (
    <div className="w-full max-w-sm bg-white rounded-lg overflow-hidden shadow-lg">
      <div className="flex items-center p-4">
        <img
          className="w-16 h-16 rounded-full"
          src="https://via.placeholder.com/150"
          alt="Profile"
        />
        <div className="ml-4">
          <h2 className="text-lg font-semibold">Susan Kamau</h2>
          <p className="text-gray-600">skamau@gmail.com</p>
          <p className="text-gray-500">Referral points: 9</p>
        </div>
        <div className="ml-auto">
          <button className="text-gray-500 hover:text-gray-700">
            <i className="fas fa-edit"></i>
          </button>
        </div>
      </div>
      <div className="bg-gray-900 p-4">
        <div className="text-gray-400 mb-2">CUSTOMER SUPPORT</div>
        <div className="space-y-2">
          <button className="w-full flex items-center text-left text-white py-2 px-4 rounded bg-gray-800 hover:bg-gray-700">
            <i className="fas fa-info-circle mr-2"></i>
            <svg className="h-8 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="ml-2">What is Barnes?</span>
          </button>
          <button className="w-full flex items-center text-left text-white py-2 px-4 rounded bg-gray-800 hover:bg-gray-700">
            <svg class="h-8 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>

            <i className="fas fa-envelope mr-2"></i>Contact Us
          </button>
        </div>
        <div className="text-gray-400 mt-4 mb-2">ACCOUNT</div>
        <div className="space-y-2">
          <button className="w-full flex items-center text-left text-white py-2 px-4 rounded bg-gray-800 hover:bg-gray-700">
            <svg class="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>

            <i className="fas fa-exchange-alt mr-2"></i>Switch to Business Account
          </button>
        </div>
        <div className="text-gray-400 mt-4 mb-2">YOUR REFERRAL CODE</div>
        <div className="flex items-center bg-gray-800 text-white py-2 px-4 rounded">
          <span className="flex-1">skamau12345</span>
          <button className="text-gray-500 hover:text-gray-700">
            <i className="fas fa-copy"></i>
          </button>
        </div>
        <div className="text-gray-400 mt-4 mb-2">PREFERENCES</div>
        <div className="space-y-2">
          <button className="w-full flex items-center text-left text-white py-2 px-4 rounded bg-gray-800 hover:bg-gray-700">
            <svg class="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>

            <i className="fas fa-lock mr-2"></i>Change Password
          </button>
          <button className="w-full flex items-center text-left text-white py-2 px-4 rounded bg-gray-800 hover:bg-gray-700">
            <i className="fas fa-sign-out-alt mr-2"></i>Log Out
          </button>
          <button className="w-full flex items-center text-left text-white py-2 px-4 rounded bg-gray-800 hover:bg-gray-700">
            <i className="fas fa-trash-alt mr-2"></i>Delete Account
          </button>
        </div>
        <div className="mt-4 text-center">
          <button className="w-full py-2 px-4 rounded bg-green-500 text-white font-bold hover:bg-green-600 transition duration-200">
            Add funds via <span className="ml-2">M-Pesa</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default MorePersonal;
