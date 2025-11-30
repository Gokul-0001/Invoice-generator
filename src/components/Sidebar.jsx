import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, Plus, List, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';

const Sidebar = ({ onLogout }) => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Auto-collapse based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { path: '/create', icon: Plus, label: 'Create Invoice' },
    { path: '/invoices', icon: List, label: 'All Invoices' },
  ];

  return (
    <div className="relative">
      <div
        className={`
          bg-white border-r border-gray-200 h-screen flex flex-col flex-shrink-0
          transition-all duration-300 ease-in-out overflow-x-hidden
          ${isCollapsed ? 'w-20' : 'w-64'}
        `}
      >
        {/* Logo/Brand */}
        <div className="h-16 border-b border-gray-200 flex items-center px-4 flex-shrink-0 overflow-hidden">
          {isCollapsed ? (
            <FileText className="w-8 h-8 text-purple-600 flex-shrink-0 mx-auto" />
          ) : (
            <div className="flex items-center space-x-3 min-w-0">
              <FileText className="w-8 h-8 text-purple-600 flex-shrink-0" />
              <h1 className="text-xl font-medium text-gray-900 truncate">Invoice</h1>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto overflow-x-hidden">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`
                      flex items-center rounded-lg transition-all duration-200
                      ${isCollapsed ? 'justify-center p-4' : 'space-x-3 px-4 py-3'}
                      ${
                        isActive
                          ? 'bg-purple-50 text-purple-700 font-medium'
                          : 'text-gray-700 font-medium hover:bg-gray-50'
                      }
                    `}
                  >
                    <Icon className={`flex-shrink-0 ${isCollapsed ? 'w-6 h-6' : 'w-5 h-5'}`} />
                    
                    {!isCollapsed && <span className="truncate">{item.label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom Section - Logout */}
        <div className="flex-shrink-0 border-t border-gray-200 p-4">
          <button
            onClick={onLogout}
            className={`
              flex items-center rounded-lg text-red-600 font-medium hover:bg-red-50 w-full transition-all duration-200
              ${isCollapsed ? 'justify-center p-4' : 'space-x-3 px-4 py-3'}
            `}
          >
            <LogOut className={`flex-shrink-0 ${isCollapsed ? 'w-6 h-6' : 'w-5 h-5'}`} />
            
            {!isCollapsed && <span className="truncate">Logout</span>}
          </button>
        </div>
      </div>

      {/* Collapse/Expand Button - Centered vertically in header */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute top-8 -translate-y-1/2 -right-3 bg-white border border-gray-200 rounded-full p-1.5 shadow-md hover:bg-gray-50 transition-all duration-200 z-10"
        title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4 text-gray-600" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        )}
      </button>
    </div>
  );
};

export default Sidebar;
