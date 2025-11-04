import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { InvoiceProvider } from './context/InvoiceContext';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import CreateInvoice from './pages/CreateInvoice';
import InvoiceListPage from './pages/InvoiceListPage';
import InvoicePreviewPage from './pages/InvoicePreviewPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem('invoiceUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('invoiceUser', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('invoiceUser');
  };

  // Protected Route wrapper
  const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" replace />;
  };

  return (
    <InvoiceProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          {/* Global Toaster */}
          <Toaster 
            position="top-right"
            reverseOrder={false}
            gutter={8}
            toastOptions={{
              duration: 3000,
              style: {
                background: '#fff',
                color: '#363636',
                fontSize: '14px',
                borderRadius: '8px',
                padding: '12px 16px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              },
            }}
          />
          
          {isAuthenticated ? (
            // Sidebar Layout for authenticated users
            <div className="flex">
              <Sidebar onLogout={handleLogout} />
              <div className="ml-64 flex-1">
                <Routes>
                  {/* Default route always goes to create */}
                  <Route path="/" element={<Navigate to="/create" replace />} />
                  <Route path="/login" element={<Navigate to="/create" replace />} />
                  
                  <Route
                    path="/create"
                    element={
                      <ProtectedRoute>
                        <CreateInvoice />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/invoices"
                    element={
                      <ProtectedRoute>
                        <InvoiceListPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/preview/:id"
                    element={
                      <ProtectedRoute>
                        <InvoicePreviewPage />
                      </ProtectedRoute>
                    }
                  />
                  {/* Catch all - redirect to create */}
                  <Route path="*" element={<Navigate to="/create" replace />} />
                </Routes>
              </div>
            </div>
          ) : (
            // Login page for non-authenticated users
            <Routes>
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          )}
        </div>
      </Router>
    </InvoiceProvider>
  );
}

export default App;
