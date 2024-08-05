import React from "react";

function MorePersonal(){

    return(
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
            <button className="w-full text-left text-white py-2 px-4 rounded bg-gray-800 hover:bg-gray-700">
              <i className="fas fa-info-circle mr-2"></i>What is Barnes?
            </button>
            <button className="w-full text-left text-white py-2 px-4 rounded bg-gray-800 hover:bg-gray-700">
              <i className="fas fa-envelope mr-2"></i>Contact Us
            </button>
          </div>
          <div className="text-gray-400 mt-4 mb-2">ACCOUNT</div>
          <div className="space-y-2">
            <button className="w-full text-left text-white py-2 px-4 rounded bg-gray-800 hover:bg-gray-700">
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
            <button className="w-full text-left text-white py-2 px-4 rounded bg-gray-800 hover:bg-gray-700">
              <i className="fas fa-lock mr-2"></i>Change Password
            </button>
            <button className="w-full text-left text-white py-2 px-4 rounded bg-gray-800 hover:bg-gray-700">
              <i className="fas fa-sign-out-alt mr-2"></i>Log Out
            </button>
            <button className="w-full text-left text-white py-2 px-4 rounded bg-gray-800 hover:bg-gray-700">
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
    )
}
export default MorePersonal