import { FileText } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';


const featureLinks = [
  { name: "Features", href: "/#features", type: "home-anchor" },
  { name: "Templates", href: "/#templates", type: "home-anchor" },
];


const companyLinks = [
  { name: "Blog", href: "#", type: "link" },
  { name: "Contact", href: "/contact", type: "route" }
];


const supportLinks = [
  { name: "Privacy Policy", href: "#", type: "link" },
  { name: "Terms of Service", href: "#", type: "link" }
];


const FooterLink = ({ item }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';


  const handleClick = (e) => {
    if (item.type === "home-anchor") {
      e.preventDefault();
      const id = item.href.replace('/#', '');
      
      if (isHome) {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    }
  };


  if (item.type === "route") {
    return (
      <Link to={item.href} className="text-gray-600 hover:text-purple-600 transition-colors text-base">
        {item.name}
      </Link>
    );
  }


  if (item.type === "home-anchor") {
    return (
      <button onClick={handleClick} className="text-gray-600 hover:text-purple-600 transition-colors text-base text-left">
        {item.name}
      </button>
    );
  }


  return (
    <a href={item.href} className="text-gray-600 hover:text-purple-600 transition-colors text-base">
      {item.name}
    </a>
  );
};


const FooterMain = () => (
  <footer className="bg-gray-50 pt-16 pb-8 px-4 border-t border-gray-200">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        {/* Brand Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }} 
          viewport={{ once: true }}
        >
          <Link to="/" className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Gallite Invoice</h3>
          </Link>
          <p className="text-gray-600 text-base leading-relaxed mb-6">
            Create professional invoices in seconds. Free forever. Perfect for freelancers and small businesses.
          </p>
          <div className="flex space-x-3">
            <a 
              href="https://www.linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-9 h-9 bg-purple-600 hover:bg-purple-700 rounded-lg flex items-center justify-center transition-colors shadow-md"
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-9 h-9 bg-purple-600 hover:bg-purple-700 rounded-lg flex items-center justify-center transition-colors shadow-md"
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a 
              href="https://www.instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-9 h-9 bg-purple-600 hover:bg-purple-700 rounded-lg flex items-center justify-center transition-colors shadow-md"
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </motion.div>


        {/* Features Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6, delay: 0.1 }} 
          viewport={{ once: true }}
        >
          <h4 className="text-gray-900 font-semibold mb-5 text-sm uppercase tracking-wide">FEATURES</h4>
          <ul className="space-y-3">
            {featureLinks.map(item => (
              <li key={item.name}>
                <FooterLink item={item} />
              </li>
            ))}
          </ul>
        </motion.div>


        {/* Company Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6, delay: 0.2 }} 
          viewport={{ once: true }}
        >
          <h4 className="text-gray-900 font-semibold mb-5 text-sm uppercase tracking-wide">COMPANY</h4>
          <ul className="space-y-3">
            {companyLinks.map(item => (
              <li key={item.name}>
                <FooterLink item={item} />
              </li>
            ))}
          </ul>
        </motion.div>


        {/* Support Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6, delay: 0.3 }} 
          viewport={{ once: true }}
        >
          <h4 className="text-gray-900 font-semibold mb-5 text-sm uppercase tracking-wide">SUPPORT</h4>
          <ul className="space-y-3">
            {supportLinks.map(item => (
              <li key={item.name}>
                <FooterLink item={item} />
              </li>
            ))}
          </ul>
        </motion.div>
      </div>


      {/* Bottom Section */}
      <div className="border-t border-gray-200 pt-8">
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-sm">
          <motion.p 
            className="text-gray-600 text-center" 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            transition={{ duration: 0.6 }} 
            viewport={{ once: true }}
          >
            © 2025 Gallite Invoice. All rights reserved.
          </motion.p>
        </div>
      </div>
    </div>
  </footer>
);


export default FooterMain;
