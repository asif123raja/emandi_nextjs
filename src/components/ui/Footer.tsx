import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-teal-600 text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        {/* App Info */}
        <div className="text-center md:text-left">
          <span className="text-white text-3xl font-bold">
            <span className="text-purple-300">Krishi</span>
            <span className="text-white">Mart</span>
          </span>
          <p className="text-sm mt-2">Your go-to marketplace for fresh vegetables and more.</p>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center md:justify-end space-x-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
            <FaFacebook size={24} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
            <FaTwitter size={24} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
            <FaInstagram size={24} />
          </a>
        </div>
      </div>

      <div className="mt-6 text-center text-sm border-t border-white pt-4">
        © 2024 FarmForecast. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
