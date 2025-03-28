import { Github, Linkedin, Mail, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-zinc-900/80 backdrop-blur-md border-t border-white/10 py-12"
      id="contact"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: Logo and Description */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Divyansh Raj
            </h3>
            <p className="text-gray-400 mb-6">
              Building digital experiences that combine functionality with
              elegant design.
            </p>
            <p className="text-gray-500 text-sm">
              &copy; {currentYear} All rights reserved.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-lg font-medium text-white mb-4">Quick Links</h4>
            <nav className="flex flex-col space-y-3">
              <a
                href="#"
                className="text-gray-400 hover:text-green-400 transition-colors"
              >
                Home
              </a>
              <a
                href="#projects"
                className="text-gray-400 hover:text-green-400 transition-colors"
              >
                Projects
              </a>
              <a
                href="#skills"
                className="text-gray-400 hover:text-green-400 transition-colors"
              >
                Skills
              </a>
              <a
                href="#contact"
                className="text-gray-400 hover:text-green-400 transition-colors"
              >
                Contact
              </a>
            </nav>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h4 className="text-lg font-medium text-white mb-4">
              Get In Touch
            </h4>
            <a
              href="mailto:contact@divyanshraj.com"
              className="flex items-center text-gray-400 hover:text-green-400 transition-colors mb-3"
            >
              <Mail size={18} className="mr-2" />
              contact@divyanshraj.com
            </a>

            {/* Social Media */}
            <div className="flex space-x-4 mt-6">
              <a
                href="https://github.com/divyanshraj"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-zinc-700 transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com/in/divyanshraj"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-zinc-700 transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://twitter.com/divyanshraj"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-zinc-700 transition-colors"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
