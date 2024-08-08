import React, { useState } from "react";

function DeleteAccount({ onDelete }) {
    const [showDeletePopup, setShowDeletePopup] = useState(false);

    const handleDeleteAccount = () => {
        onDelete();
        setShowDeletePopup(false);
    };

    return (
        <div>
            <button
                className="w-full flex items-center text-left text-white py-2 px-4 rounded bg-gray-800 hover:bg-gray-700"
                onClick={() => setShowDeletePopup(true)}
            >
                <svg
                    className="h-8 w-8 text-slate-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete Account
            </button>

            {showDeletePopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded shadow-lg text-black">
                        <p>Are you sure you want to delete your account?<br></br><p>(Warning! This action cannot be undone)</p> </p>
                        <div className="flex space-x-4 mt-4">
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded"
                                onClick={handleDeleteAccount}
                            >
                                Yes
                            </button>
                            <button
                                className="bg-gray-500 text-white px-4 py-2 rounded"
                                onClick={() => setShowDeletePopup(false)}
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DeleteAccount;
