import React, { useState } from 'react';

const CodeCopyComponent = () => {
  const [isCopied, setIsCopied] = useState(false);
  const code = "skamau12345"; // The code you want to copy

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Hide the alert after 2 seconds
    });
  };

  return (
    <div className="flex items-center h-13 text-lg bg-slate-700 text-center text-white py-1 px-4 rounded">
      <div className="flex-1">{code}</div>
      <button className="button" onClick={handleCopy}>
        <svg className="h-6 w-8 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
        </svg>
      </button>
      {isCopied && (
        <div className="mt-2 text-green-500">Code has been successfully copied!</div>
      )}
    </div>
  );
};

export default CodeCopyComponent;
