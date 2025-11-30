import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { InvoiceProvider } from './context/InvoiceContext';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';

// Layouts for main (marketing/public) pages
import HeaderMain from './layouts/HeaderMain';
import FooterMain from './layouts/FooterMain';
import ScrollToTop from './components/ScrollToTop'; // Add this import

// Dashboard components
import Header from './components/Header';
import Sidebar from './components/Sidebar';

// Page components
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Contact from './pages/Contact';
import CreateInvoice from './pages/CreateInvoice';
import InvoiceListPage from './pages/InvoiceListPage';
import InvoicePreviewPage from './pages/InvoicePreviewPage';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Listen to Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const userData = {
          email: firebaseUser.email,
          displayName: firebaseUser.displayName || firebaseUser.email.split('@')[0],
          photoURL: firebaseUser.photoURL,
          uid: firebaseUser.uid,
        };
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('invoiceUser', JSON.stringify(userData));
      } else {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('invoiceUser');
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('invoiceUser', JSON.stringify(userData));
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('invoiceUser');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const ProtectedRoute = ({ children }) => (
    isAuthenticated ? children : <Navigate to="/login" replace />
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <InvoiceProvider>
      <Router>
        <ScrollToTop /> {/* Add this line */}
        <div className="min-h-screen bg-gray-50">
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
            <div className="flex h-screen overflow-hidden">
              <Sidebar onLogout={handleLogout} />
              <div className="flex-1 flex flex-col overflow-hidden">
                <Header user={user} onLogout={handleLogout} />
                <main className="flex-1 overflow-auto p-2 bg-gray-50">
                  <Routes>
                    <Route path="/create" element={<ProtectedRoute><CreateInvoice /></ProtectedRoute>} />
                    <Route path="/invoices" element={<ProtectedRoute><InvoiceListPage /></ProtectedRoute>} />
                    <Route path="/preview/:id" element={<ProtectedRoute><InvoicePreviewPage /></ProtectedRoute>} />
                    <Route path="/" element={<Navigate to="/create" replace />} />
                    <Route path="/login" element={<Navigate to="/create" replace />} />
                    <Route path="*" element={<Navigate to="/create" replace />} />
                  </Routes>
                </main>
              </div>
            </div>
          ) : (
            <Routes>
              <Route path="/" element={
                <>
                  <HeaderMain />
                  <Home />
                  <FooterMain />
                </>
              } />
              <Route path="/contact" element={
                <>
                  <HeaderMain />
                  <Contact />
                  <FooterMain />
                </>
              } />
              <Route path="/login" element={
                <>
                  <Login onLogin={handleLogin} />
                </>
              } />
              <Route path="/signup" element={
                <>
                  <SignUp onLogin={handleLogin} />
                </>
              } />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          )}
        </div>
      </Router>
    </InvoiceProvider>
  );
};

export default App;
