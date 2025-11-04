import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, Plus, List, LogOut } from 'lucide-react';


const Sidebar = ({ onLogout }) => {
  const location = useLocation();


  const navItems = [
    { path: '/create', icon: Plus, label: 'Create Invoice' },
    { path: '/invoices', icon: List, label: 'All Invoices' },
  ];


  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 flex flex-col">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <FileText className="w-8 h-8 text-purple-600" />
          <h1 className="text-xl font-bold text-gray-900">Invoice Generator</h1>
        </div>
      </div>


      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-purple-50 text-purple-600 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>


      {/* Logout Button */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={onLogout}
          className="flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 w-full transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};


export default Sidebar;
