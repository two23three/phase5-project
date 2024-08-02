import React from "react";

function Budget(){

    return (
        <div className="min-h-screen bg-gray-900 text-white p-4">
          <div className="space-y-8">
            {/* Savings Goals */}
            <div className="bg-gray-800 p-4 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Savings goals</h2>
              <div className="space-y-4">
                <div className="bg-gray-700 p-2 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span>Business Expansion</span>
                    <span className="text-green-500">Ksh 100,000/Ksh 100,000</span>
                  </div>
                  <div className="bg-gray-600 rounded h-4">
                    <div className="bg-green-500 h-4 rounded" style={{ width: '100%' }}></div>
                  </div>
                </div>
                <div className="bg-gray-700 p-2 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span>Real Estate Investments</span>
                    <span className="text-gray-400">Ksh 251,000/Ksh 500,000</span>
                  </div>
                  <div className="bg-gray-600 rounded h-4">
                    <div className="bg-green-500 h-4 rounded" style={{ width: '50%' }}></div>
                  </div>
                </div>
                <button className="flex items-center bg-gray-700 p-2 rounded-lg w-full justify-center text-gray-400 hover:text-white">
                  <span className="mr-2">+</span> Set new goal
                </button>
              </div>
            </div>

            {/* Debt Management */}
            <div className="bg-gray-800 p-4 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Debt Management</h2>
              <div className="space-y-4">
                <div className="bg-gray-700 p-2 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span>Car loan</span>
                    <span className="text-red-500">Ksh 100,000/Ksh 250,000</span>
                  </div>
                  <div className="bg-gray-600 rounded h-4">
                    <div className="bg-red-500 h-4 rounded" style={{ width: '40%' }}></div>
                  </div>
                </div>
                <button className="flex items-center bg-gray-700 p-2 rounded-lg w-full justify-center text-gray-400 hover:text-white">
                  <span className="mr-2">+</span> Add loan
                </button>
              </div>
            </div>

            {/* Limits */}
            <div className="bg-gray-800 p-4 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Limits</h2>
              <div className="space-y-4">
                <div className="bg-gray-700 p-2 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span>Entertainment</span>
                    <span className="text-yellow-500">Ksh 5,000/Ksh 10,000</span>
                  </div>
                  <div className="bg-gray-600 rounded h-4">
                    <div className="bg-yellow-500 h-4 rounded" style={{ width: '50%' }}></div>
                  </div>
                </div>
                <button className="flex items-center bg-gray-700 p-2 rounded-lg w-full justify-center text-gray-400 hover:text-white">
                  <span className="mr-2">+</span> Add limit
                </button>
              </div>
            </div>
          </div>
        </div>
      );
}

export default Budget