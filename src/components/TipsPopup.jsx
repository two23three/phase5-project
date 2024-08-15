import React from 'react';
import { useAuth } from './AuthProvider';

const TipsPopup = ({ isOpen, onClose }) => {
  const { user } = useAuth(); // Use the user object from AuthProvider
  const RoleId = user?.role_id; // Get the role_id from user, with optional chaining to handle undefined
  const accountType = RoleId === 2 ? 'Business' : 'Personal';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg text-black w-11/12 max-w-lg h-5/6 overflow-y-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Tips for Managing {accountType} Account
        </h2>
        {RoleId === 1 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Budget Wisely
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Set financial goals and prioritize your expenses.</li>
                <li>Track your spending regularly.</li>
                <li>Use budgeting apps or tools.</li>
                <li>Review and adjust your budget periodically.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Secure Your Account
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Use strong, unique passwords.</li>
                <li>Enable two-factor authentication.</li>
                <li>Regularly update your account information.</li>
                <li>Be cautious of phishing scams.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Maximize Savings
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Automate your savings.</li>
                <li>Take advantage of interest-earning accounts.</li>
                <li>Plan for long-term financial goals.</li>
                <li>Review your savings plan quarterly.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Manage Credit Responsibly
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Pay your bills on time.</li>
                <li>Keep your credit utilization low.</li>
                <li>Check your credit report annually.</li>
                <li>Understand the terms of your credit accounts.</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Streamline Operations
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Automate routine tasks.</li>
                <li>Utilize project management tools.</li>
                <li>Regularly assess operational efficiency.</li>
                <li>Implement feedback systems for continuous improvement.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Financial Management
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Keep accurate and detailed financial records.</li>
                <li>Regularly review financial statements.</li>
                <li>Forecast and plan for future expenses.</li>
                <li>Maintain an emergency fund for unexpected costs.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Ensure Data Security
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Protect your business data with encryption.</li>
                <li>Train employees on data security best practices.</li>
                <li>Regularly back up your data.</li>
                <li>Monitor and manage access to sensitive information.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Optimize Customer Relations
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Provide excellent customer service.</li>
                <li>Engage with customers through social media.</li>
                <li>Collect and act on customer feedback.</li>
                <li>Develop loyalty programs to retain customers.</li>
              </ul>
            </div>
          </div>
        )}
        <div className="mt-6 flex justify-end">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TipsPopup;
