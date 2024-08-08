import React from "react";

function PrivacyPolicyPopup({ show, onClose }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-center text-black">PRIVACY POLICY</h2>
        <p className="mb-4 text-black">
          We take your privacy very seriously, and as such we strive to keep any data use to the very minimum required.
          The following sections describe the data we collect, why we collect it and how you can manage it.
        </p>
        <p className="mb-4 text-black">
          <strong>ADVERTISING</strong>: The app relies on advertising as its primary means of funding and it uses Google AdMob to provide the adverts. By default, adverts are not personalised. We will only ever show you personalised adverts if you give us your explicit consent to do so.
        </p>
        <p className="mb-4 text-black">
          <strong>NON-PERSONALISED ADS</strong>: To show non-personalised ads, there is still a requirement to use a mobile identifier to combat fraud and abuse, and to perform frequency capping, ad measurement and aggregated ad reporting. We consider these activities to be necessary to effectively provide the advertising service and, in the case of fraud and abuse, to protect you from potential harm. As such we use legitimate interests to collect this data.
        </p>
        <p className="mb-4 text-black">
          <strong>PERSONALISED ADS</strong>: Personalised ads will only be shown if you give us your explicit consent to do so. To enable the personalisation, Google AdMob will collect and process certain data to help make the adverts you see more relevant to you. Please refer to Google's information regarding how they use your data to achieve this.
        </p>
        <p className="mb-4 text-black">
          <strong>CRASH LOGS</strong>: In order to provide a reliable and stable app, the app may collect crash information. This information is collected by Crashlytics (iOS) or Visual Studio App Center (Android, Windows) and often proves to be vital when trying to work out why an app may be crashing. Along with the crash data, a mobile identifier is collected which helps us ascertain how widespread the issue is and therefore assess how critical it is. We value the stability of the app highly and believe the ability to quickly fix critical issues is something that users do (and will) expect from us. As such we use legitimate interests to collect this data.
        </p>
        <p className="mb-4 text-black">
          <strong>DATA SHARING</strong>: Other than the specific scenarios discussed above, personal data is never shared without your explicit permission. In particular, data that is entered by you, such as expense logs, remain within the protected environment of the app at all times unless you choose to export this data yourself.
        </p>
        <p className="mb-4 text-black">
          <strong>EMAIL ADDRESS</strong>: The app does not request or store any email addresses, but you may choose to contact support using your email address. In this case, it is understood that we will use this email address to respond to your support request and will keep a copy of support interactions in case they need to be referred back to at a later date. We will only use this email address for support purposes and will never send any marketing to this email address.
        </p>
        <p className="mb-4 text-black">
          <strong>HOW TO MANAGE YOUR DATA</strong>: Google provides a set of controls which allow you to manage data that has been collected. The linked article also describes how you may revoke your consent to show personalised ads. If you wish to manage your crash log data, please go to 'More and navigate to Privacy' within the app where you can choose to 'Disable Crash Logs' to turn off the data collection. In this section you can also choose to 'Contact Support' if you wish to submit a request to delete your crash data. Please clearly state your requirement in the body of the email and leave the pre-generated content in place. If you wish to have your email address (and therefore any emails) removed from our systems, please send an email explaining this to <a href="mailto:support@barnes.com">support@barnes.com</a>.
        </p>
        <p className="mb-4 text-black">
          <strong>CONTACT US</strong>: If you wish to discuss this policy further, please contact us at <a href="mailto:support@barnes.com">support@barnes.com</a>.
        </p>
        <p className="mb-4 text-black">
          <strong>POLICY CHANGES</strong>: Any changes of significance to this privacy policy will be announced on our website (www.barnes.com).
        </p>
        <p className="text-black">Last updated: 10/08/2024.</p>
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

export default PrivacyPolicyPopup;
