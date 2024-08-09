import React from "react";

function TermsPopup({ show, onClose }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-centre text-black">TERMS OF SERVICE</h2>
        <p className="mb-4 text-black text-left">
          PLEASE READ THESE TERMS OF SERVICE BEFORE USING THE BARNES APP. BY
          USING OUR APP OR ACCESSING ANY PAGE ON OUR SITE, YOU AGREE TO BE
          BOUND BY THESE TERMS OF SERVICE AND OUR PRIVACY POLICY.
        </p>
        <p className="mb-4 text-black text-left">
          <strong>GENERAL</strong>: Welcome to the Barnes app, owned by Barnes
          Tech Limited ('Barnes', 'we', 'us', 'our'). The Barnes app is a
          project management tool designed to streamline assessment and
          management tasks for users ('Service').
        </p>
        <p className="mb-4 text-black text-left">
          <strong>ACCEPTANCE OF TERMS</strong>: By using our Service, you agree
          to abide by these Terms of Service, our Privacy Policy, and any
          additional terms that may be posted on our Site from time to time. We
          may revise these terms without notice, and your continued use of the
          Service constitutes your agreement to the revised terms.
        </p>
        <p className="mb-4 text-black text-left">
          <strong>ELIGIBILITY</strong>: The Service is available to users aged
          18 or older. By using the Service, you confirm that you meet this age
          requirement.
        </p>
        <p className="mb-4 text-black text-left">
          <strong>OWNERSHIP AND LICENSE</strong>: All content on the Barnes app,
          including software, text, images, and logos, is owned by Barnes or its
          licensors and is protected under Kenyan copyright and trademark laws.
          We grant you a limited, non-transferable license to use the Service
          for personal, non-commercial purposes. Any other use is prohibited
          without our written consent.
        </p>
        <p className="mb-4 text-black text-left">
          <strong>USER ACCOUNTS</strong>: To access certain features, you may
          need to register and provide accurate, current, and complete
          information. You are responsible for maintaining the confidentiality
          of your account information. Notify us immediately if you suspect
          unauthorized access to your account.
        </p>
        <p className="mb-4 text-black text-left">
          <strong>CONTENT YOU PROVIDE</strong>: You are responsible for the
          content you upload to the Service. By uploading content, you grant
          Barnes a worldwide, royalty-free license to use it for providing the
          Service.
        </p>
        <p className="mb-4 text-black text-left">
          <strong>GEOGRAPHIC RESTRICTIONS</strong>: Barnes is based in Kenya,
          and the Service may not be accessible in some countries. By using the
          Service, you are responsible for complying with local laws.
        </p>
        <p className="mb-4 text-black text-left">
          <strong>LIABILITY DISCLAIMER</strong>: The Service is provided 'as is'
          without any warranties. Barnes is not liable for any damages arising
          from your use of the Service, including but not limited to loss of
          data or profits. Our total liability is limited to KES 10,000.
        </p>
        <p className="mb-4 text-black text-left">
          <strong>GOVERNING LAW</strong>: These Terms of Service are governed by
          the laws of Kenya. Any disputes arising from these terms will be
          resolved in Kenyan courts.
        </p>
        <p className="mb-4 text-black text-left">
          <strong>TERMINATION</strong>: We may terminate your access to the
          Service at any time without notice if you violate these terms.
        </p>
        <div className="flex justify-end">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default TermsPopup;
