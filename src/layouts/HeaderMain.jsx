import { FileText } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const navLinks = [
  { name: "Features", href: "/#features", type: "home-anchor" },
  { name: "Templates", href: "/#templates", type: "home-anchor" },
  { name: "Contact", href: "/contact", type: "route" }
];

const HeaderMain = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  const handleAnchorClick = (e, href) => {
    e.preventDefault();
    
    const id = href.replace('/#', '');
    
    if (isHome) {
      // Already on home page, just scroll
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to home, then scroll after a delay
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div 
            className="flex items-center space-x-3" 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.6 }}
          >
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-medium text-gray-900">Gallite Invoice</h1>
            </Link>
          </motion.div>
          
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                {link.type === "route" ? (
                  <Link
                    to={link.href}
                    className="text-base font-medium text-gray-700 hover:text-purple-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                ) : (
                  <button
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className="text-base font-medium text-gray-700 hover:text-purple-600 transition-colors"
                  >
                    {link.name}
                  </button>
                )}
              </motion.div>
            ))}
          </nav>
          
          <motion.div
            className="flex items-center space-x-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link 
              to="/login" 
              className="inline-flex items-center px-6 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
            >
              Sign In
            </Link>
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default HeaderMain;
