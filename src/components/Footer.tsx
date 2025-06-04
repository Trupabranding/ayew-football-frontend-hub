
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Academy Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="bg-wine-red text-white p-2 rounded-lg mr-3">
                <span className="font-bold text-xl">MA</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Mafarah Ayew</h3>
                <p className="text-gray-300 text-sm">Football Academy & NGO Sporting Club</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Developing exceptional football talent while building stronger communities 
              through sports, education, and character development.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-wine-red transition-colors duration-200">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-gray-300 hover:text-wine-red transition-colors duration-200">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-gray-300 hover:text-wine-red transition-colors duration-200">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-gray-300 hover:text-wine-red transition-colors duration-200">
                <Youtube size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#about" className="text-gray-300 hover:text-wine-red transition-colors duration-200">About Us</a></li>
              <li><a href="#players" className="text-gray-300 hover:text-wine-red transition-colors duration-200">Our Players</a></li>
              <li><a href="#matches" className="text-gray-300 hover:text-wine-red transition-colors duration-200">Matches</a></li>
              <li><a href="#news" className="text-gray-300 hover:text-wine-red transition-colors duration-200">News</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-wine-red transition-colors duration-200">Contact</a></li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-lg font-bold mb-4">Programs</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-wine-red transition-colors duration-200">Youth Academy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-wine-red transition-colors duration-200">Professional Development</a></li>
              <li><a href="#" className="text-gray-300 hover:text-wine-red transition-colors duration-200">Community Sports</a></li>
              <li><a href="#" className="text-gray-300 hover:text-wine-red transition-colors duration-200">NGO Initiatives</a></li>
              <li><a href="#" className="text-gray-300 hover:text-wine-red transition-colors duration-200">Scholarships</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 py-6 text-center">
          <p className="text-gray-300">
            © 2024 Mafarah Ayew Football Academy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
