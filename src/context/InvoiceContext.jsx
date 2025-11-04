import React, { createContext, useContext, useState, useEffect } from 'react';

const InvoiceContext = createContext();

export const useInvoice = () => {
  const context = useContext(InvoiceContext);
  if (!context) {
    throw new Error('useInvoice must be used within InvoiceProvider');
  }
  return context;
};

export const InvoiceProvider = ({ children }) => {
  const [invoices, setInvoices] = useState([]);
  const [currentInvoice, setCurrentInvoice] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');

  // Load invoices from localStorage on mount
  useEffect(() => {
    const storedInvoices = localStorage.getItem('invoices');
    if (storedInvoices) {
      setInvoices(JSON.parse(storedInvoices));
    }
  }, []);

  // Save invoices to localStorage whenever they change
  useEffect(() => {
    if (invoices.length > 0) {
      localStorage.setItem('invoices', JSON.stringify(invoices));
    }
  }, [invoices]);

  const createInvoice = (invoiceData) => {
    const newInvoice = {
      ...invoiceData,
      id: Date.now(), // Generate unique ID
      template: selectedTemplate, // Save the selected template
      createdAt: new Date().toISOString(),
    };
    setInvoices([...invoices, newInvoice]);
    return newInvoice;
  };

  const updateInvoice = (id, updatedData) => {
    setInvoices(invoices.map(inv => 
      inv.id === id ? { ...inv, ...updatedData } : inv
    ));
  };

  const deleteInvoice = (id) => {
    const updatedInvoices = invoices.filter(inv => inv.id !== id);
    setInvoices(updatedInvoices);
    // Update localStorage
    if (updatedInvoices.length === 0) {
      localStorage.removeItem('invoices');
    } else {
      localStorage.setItem('invoices', JSON.stringify(updatedInvoices));
    }
  };

  const getInvoiceById = (id) => {
    return invoices.find(inv => inv.id === parseInt(id));
  };

  return (
    <InvoiceContext.Provider
      value={{
        invoices,
        currentInvoice,
        selectedTemplate,
        setCurrentInvoice,
        setSelectedTemplate,
        createInvoice,
        updateInvoice,
        deleteInvoice,
        getInvoiceById,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};
