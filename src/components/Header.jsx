import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronDown, LogOut } from 'lucide-react';

const Header = ({ user, onLogout }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Close dropdown when clicking outside
  const handleClickOutside = (e) => {
    if (!e.target.closest('.profile-dropdown-container')) {
      setShowProfileMenu(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get user initials for avatar fallback
  const getInitials = () => {
    if (user?.displayName) {
      return user.displayName
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    return user?.email?.charAt(0).toUpperCase() || 'U';
  };

  const handleLogoutClick = () => {
    setShowProfileMenu(false);
    onLogout();
    navigate('/login');
  };

  const userName = user?.displayName || user?.email?.split('@')[0] || 'User';
  const userEmail = user?.email || 'user@example.com';

  return (
    <header className="fixed top-0 left-64 right-0 bg-white border-b border-gray-200 h-16 flex items-center justify-end px-8 z-30 shadow-sm">
      {/* Right Section - Profile */}
      <div className="relative profile-dropdown-container">
        <button
          onClick={() => setShowProfileMenu(!showProfileMenu)}
          className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {/* Avatar */}
          <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-semibold text-sm flex-shrink-0 overflow-hidden">
            {user?.photoURL ? (
              <img 
                src={user.photoURL} 
                alt={userName}
                className="w-full h-full object-cover"
              />
            ) : (
              <span>{getInitials()}</span>
            )}
          </div>

          {/* User Info */}
          <div className="hidden sm:block text-left">
            <div className="text-sm font-medium text-gray-900">{userName}</div>
          </div>

          {/* Dropdown Arrow */}
          <ChevronDown 
            className={`w-4 h-4 text-gray-600 transition-transform flex-shrink-0 ${
              showProfileMenu ? 'rotate-180' : ''
            }`}
          />
        </button>

        {/* Dropdown Menu */}
        {showProfileMenu && (
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-40">
            {/* Profile Header */}
            <div className="px-4 py-4 bg-gradient-to-r from-purple-50 to-blue-50 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center font-semibold text-lg flex-shrink-0 overflow-hidden">
                  {user?.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt={userName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span>{getInitials()}</span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-gray-900">{userName}</p>
                </div>
              </div>
            </div>

            {/* Gmail Section */}
            <div className="px-4 py-3 border-b border-gray-200">
              <p className="text-xs font-medium text-gray-500 mb-1">Gmail</p>
              <p className="text-sm text-gray-900 break-all">{userEmail}</p>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Logout Button */}
            <button
              onClick={handleLogoutClick}
              className="w-full px-4 py-3 text-left text-red-600 hover:bg-red-50 flex items-center space-x-3 transition-colors"
            >
              <LogOut className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
