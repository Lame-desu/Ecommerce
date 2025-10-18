export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white text-black px-6 md:px-20 py-16 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center">Privacy Policy</h1>
      <p className="text-center text-gray-700 mb-12">
        Last updated: October 12, 2025
      </p>

      <section className="space-y-6 leading-relaxed text-[17px]">
        <p>
          Welcome to <strong>Shaba Commerce</strong> (“we,” “our,” “us”). Your
          privacy is very important to us. This Privacy Policy explains how we
          collect, use, and protect your personal information when you visit our
          website and use our services.
        </p>

        <h2 className="text-2xl font-semibold mt-10">
          1. Information We Collect
        </h2>
        <p>
          We collect information that you provide directly to us, such as when
          you create an account, make a purchase, subscribe to our newsletter,
          or contact our support team. This may include your name, email
          address, phone number, billing and shipping addresses, and payment
          details.
        </p>
        <p>
          Additionally, we automatically collect certain technical information
          such as your IP address, browser type, device information, and pages
          you visit on our website through cookies and similar technologies.
        </p>

        <h2 className="text-2xl font-semibold mt-10">
          2. How We Use Your Information
        </h2>
        <p>The information we collect is used to:</p>
        <ul className="list-disc ml-6 space-y-2">
          <li>Process and deliver your orders.</li>
          <li>Provide customer support and respond to your inquiries.</li>
          <li>
            Send order updates, promotions, and marketing messages (with your
            consent).
          </li>
          <li>Improve our products, website, and user experience.</li>
          <li>Prevent fraudulent transactions and maintain security.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10">
          3. Sharing of Information
        </h2>
        <p>
          We do not sell your personal data. However, we may share your
          information with trusted third-party service providers who assist us
          in operating our business, such as payment processors, shipping
          partners, and analytics providers. These parties are obligated to keep
          your data secure and use it only for the purposes specified by us.
        </p>

        <h2 className="text-2xl font-semibold mt-10">4. Cookies</h2>
        <p>
          We use cookies and similar technologies to personalize your
          experience, analyze website traffic, and understand user behavior. You
          can manage your cookie preferences through your browser settings.
        </p>

        <h2 className="text-2xl font-semibold mt-10">5. Google Sign-In</h2>
        <p>
          If you sign in using Google, we receive your basic profile information
          (such as name, email, and profile picture) from Google to authenticate
          your account. This information is used only for login purposes and
          account management. We do not access your Google password or other
          private data.
        </p>

        <h2 className="text-2xl font-semibold mt-10">6. Data Security</h2>
        <p>
          We use industry-standard security measures to protect your information
          from unauthorized access, alteration, or destruction. However, please
          note that no method of transmission over the Internet is completely
          secure.
        </p>

        <h2 className="text-2xl font-semibold mt-10">7. Your Rights</h2>
        <p>
          You have the right to access, update, or delete your personal
          information. You can contact us anytime to make changes or request
          account deletion.
        </p>

        <h2 className="text-2xl font-semibold mt-10">
          8. Changes to This Policy
        </h2>
        <p>
          We may update this Privacy Policy from time to time. Any changes will
          be posted on this page with an updated “Last Updated” date.
        </p>

        <h2 className="text-2xl font-semibold mt-10">9. Contact Us</h2>
        <p>
          If you have any questions or concerns about this Privacy Policy or how
          we handle your data, please contact us at:
        </p>
        <p className="font-medium">📧 support@shabacommerce.com</p>
      </section>

      <footer className="text-center text-sm text-gray-600 mt-16 border-t pt-6">
        &copy; {new Date().getFullYear()} Shaba Commerce. All rights reserved.
      </footer>
    </main>
  );
}
