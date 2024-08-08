import React from 'react';

const AboutUsPopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg text-black w-11/12 max-w-lg">
        <h2 className="text-2xl font-bold mb-4">About Us</h2>
        
        <h3 className="text-xl font-semibold mt-4">Who we are</h3>
        <p className="mb-4">
          We are a dedicated team focused on providing innovative financial solutions to individuals and small business owners. Our aim is to simplify the complexity of managing finances and offer tools that empower our users to achieve their financial goals.
        </p>

        <h3 className="text-xl font-semibold mt-4">Why trust us</h3>
        <p className="mb-4">
          Our platform is built on a foundation of security and transparency. We prioritize the protection of your financial data with top-notch encryption and follow strict compliance regulations. Our user-friendly interface and robust features have been designed with your needs in mind, ensuring that you can trust us with your financial management.
        </p>

        <h3 className="text-xl font-semibold mt-4">Our mission</h3>
        <p>
          Our mission is to create a comprehensive budgeting solution that brings clarity and control over personal and business finances. We strive to offer a seamless experience that helps users track income, manage expenses, set savings goals, and navigate debt, all while providing valuable insights into their financial health.
        </p>

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

export default AboutUsPopup;
