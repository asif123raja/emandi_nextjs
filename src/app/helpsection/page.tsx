"use client"; // Use this directive if you're using Next.js with the App Router

import React from "react";
import Link from "next/link";

const HelpSection: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Help Center</h1>

      {/* FAQ Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions (FAQs)</h2>
        <div className="space-y-4">
          <div className="p-4 border border-gray-300 rounded shadow">
            <h3 className="font-semibold">1. How do I place an order?</h3>
            <p>To place an order, simply browse our products, add your desired items to the cart, and proceed to checkout.</p>
          </div>
          <div className="p-4 border border-gray-300 rounded shadow">
            <h3 className="font-semibold">2. What payment methods do you accept?</h3>
            <p>We accept various payment methods, including credit cards, PayPal, and bank transfers.</p>
          </div>
          <div className="p-4 border border-gray-300 rounded shadow">
            <h3 className="font-semibold">3. How can I track my order?</h3>
            <p>Once your order has shipped, you will receive a tracking link via email to monitor its status.</p>
          </div>
          <div className="p-4 border border-gray-300 rounded shadow">
            <h3 className="font-semibold">4. What is your return policy?</h3>
            <p>Our return policy allows returns within 30 days of purchase. Please visit our Returns page for more details.</p>
          </div>
          <div className="p-4 border border-gray-300 rounded shadow">
            <h3 className="font-semibold">5. How can I contact customer support?</h3>
            <p>You can contact our support team through the contact form or by emailing support@example.com.</p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p>If you have any further questions or need assistance, please reach out to us:</p>
        <ul className="list-disc list-inside mt-2">
          <li>Email: <a href="mailto:support@example.com" className="text-teal-600">support@example.com</a></li>
          <li>Phone: <a href="tel:+1234567890" className="text-teal-600">+1 (234) 567-890</a></li>
          <li>Address: 123 Fresh Avenue, Fruit City, Country</li>
        </ul>
      </div>

      {/* Additional Resources Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Additional Resources</h2>
        <ul className="list-disc list-inside">
          <li>
            <a href="/terms" className="text-teal-600">Terms of Service</a>
          </li>
          <li>
            <a href="/privacy" className="text-teal-600">Privacy Policy</a>
          </li>
          <li>
            <a href="/returns" className="text-teal-600">Returns Policy</a>
          </li>
          <li>
            <a href="/shipping" className="text-teal-600">Shipping Information</a>
          </li>
        </ul>
      </div>

      {/* Support Chat Section */}
      <div className="bg-gray-100 p-4 rounded">
        <h2 className="text-2xl font-semibold mb-4">Need More Help?</h2>
        <p>If you need immediate assistance, please use our live chat support.</p>
        <Link href="/chatsection">
        <button className="mt-4 bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-500 transition duration-300">
          Start Chat
        </button>
      </Link>
      </div>
    </div>
  );
};

export default HelpSection;
