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
          <p className="text-gray-500 font-semibold text-centre mt-2 mb-2 text-left">Personal Account</p>
          <h2 className="text-neutral-800 text-lg font-semibold text-left">Susan Kamau</h2>
          <p className="text-neutral-800">skamau@gmail.com</p>
          <p className="text-neutral-600 text-left">Referral points: 9</p>
        </div>
        <div className="ml-auto">
          <button >
            <svg class="mt-12 h-6 w-7 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>

            <i className="fas fa-edit"></i>
          </button>
        </div>
      </div>
      <div className="bg-gray-900 p-4">
        <div className="text-gray-400 mb-2 text-left text-xs">CUSTOMER SUPPORT</div>
        <div className="space-y-2">
          <button className="w-full flex items-center text-left text-white py-2 px-4 rounded bg-gray-800 hover:bg-gray-700">
            <i className="fas fa-info-circle mr-2"></i>
            <svg className="h-8 w-6 text-slate-400 text-left	" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
        <div className="text-gray-400 mt-4 mb-2 text-left text-xs ">ACCOUNT</div>
        <div className="space-y-2">
          <button className="w-full flex items-center text-left text-white py-2 px-4 rounded bg-gray-800 hover:bg-gray-700">
            <svg class="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>

            <i className="fas fa-exchange-alt mr-2"></i>Switch to Business Account
          </button>
        </div>
        <div className="text-gray-400 mt-4 mb-2 text-left text-xs">YOUR REFERRAL CODE</div>
        <div className="flex items-center h-13 text-lg	 bg-slate-700 text-centre text-white py-1 px-4 rounded">
          <span className="flex-1">skamau12345</span>
          <button className="button" >
            <svg class="h-6 w-8 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
            </svg>

          </button>
        </div>
        <div className="text-gray-400 mt-4 mb-2 text-left text-xs">PREFERENCES</div>
        <div className="space-y-2">
          <button className="w-full flex items-center text-left text-white py-2 px-4 rounded bg-gray-800 hover:bg-gray-700">
            <svg class="h-8 w-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>

            <i className="fas fa-lock mr-2"></i>Change Password
          </button>
          <button className="w-full flex items-center text-left text-white py-2 px-4 rounded bg-gray-800 hover:bg-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6" width='30px' display='flex' justifyContent='space-between'>
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
            </svg>
            <i className="fas fa-sign-out-alt mr-2"></i>Log Out
          </button>
          <button className="w-full flex items-center text-left text-white py-2 px-4 rounded bg-gray-800 hover:bg-gray-700">
            <svg class="h-8 w-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>

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
