import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { CheckCircle, X, FileText } from 'lucide-react';
import InvoiceForm from '../components/InvoiceForm';
import InvoicePreview from '../components/InvoicePreview';
import { useInvoice } from '../context/InvoiceContext';

const CreateInvoice = () => {
  const { createInvoice, selectedTemplate, setSelectedTemplate } = useInvoice();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('edit');
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const defaultInvoiceData = {
    invoiceNumber: 'INV-001',
    invoiceDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    taxRate: 8.5,
    currency: 'USD',
    currencySymbol: '$',
    companyLogo: null,
    companyName: 'Your Company Name',
    companyAddress: '123 Business St, Suite 100',
    companyCity: 'City, State 12345',
    companyEmail: 'hello@yourcompany.com',
    companyPhone: '+1 (555) 123-4567',
    clientName: 'Client Company Name',
    clientAddress: '456 Client Ave',
    clientCity: 'City, State 67890',
    clientEmail: 'client@company.com',
    clientPhone: '+1 (555) 987-6543',
    items: [
      { description: 'Web Design Services', quantity: 1, rate: 2500 },
      { description: 'Logo Design', quantity: 1, rate: 800 },
      { description: 'Brand Guidelines', quantity: 1, rate: 500 },
    ],
    notes: 'Thank you for your business!',
    terms: 'Payment is due within 30 days. Late payments may incur a 5% monthly fee.',
    isPaid: false,
    paidDate: null,
    template: selectedTemplate,
  };

  const [formData, setFormData] = useState(defaultInvoiceData);

  useEffect(() => {
    setFormData(prev => ({ ...prev, template: selectedTemplate }));
  }, [selectedTemplate]);

  const handleFormChange = (data) => {
    setFormData({ ...data, template: selectedTemplate });
  };

  const handleSaveClick = () => {
    if (!formData) {
      toast.error('Please fill in the invoice details');
      return;
    }
    setShowConfirmModal(true);
  };

  const handleConfirmSave = () => {
    const newInvoice = createInvoice({ ...formData, template: selectedTemplate });
    setShowConfirmModal(false);
    toast.success('Invoice saved successfully!');
    setTimeout(() => {
      navigate('/invoices');
    }, 1000);
  };

  const handleCancelSave = () => {
    setShowConfirmModal(false);
  };

  return (
    // ONLY RESPONSIVE CONTAINER CHANGES
    <div className="w-full min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        
        <div className="mb-6">
          <h1 className="text-3xl font-medium text-gray-900 mb-2">Create Invoice</h1>
          <p className="text-gray-600">Create professional invoices with customizable templates</p>
        </div>

        <div className="mb-6">
          <div className="flex space-x-4 border-b">
            <button
              onClick={() => setActiveTab('edit')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'edit'
                  ? 'border-b-2 border-purple-600 text-purple-700'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Edit Invoice
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'preview'
                  ? 'border-b-2 border-purple-600 text-purple-700'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Preview & Share
            </button>
          </div>
        </div>

        {activeTab === 'edit' ? (
          <div className="space-y-6">
            <InvoiceForm 
              key="invoice-form" 
              onFormChange={handleFormChange} 
              initialData={formData} 
            />
            <div className="flex justify-end space-x-4">
              <button onClick={() => navigate('/invoices')} className="btn-secondary">
                Cancel
              </button>
              <button onClick={handleSaveClick} className="btn-primary">
                Save Invoice
              </button>
            </div>
          </div>
        ) : (
          <InvoicePreview 
            data={formData} 
            template={selectedTemplate}
            onTemplateChange={setSelectedTemplate}
          />
        )}

        {showConfirmModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-8 relative animate-fade-in border border-gray-200">
              <button
                onClick={handleCancelSave}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                  <FileText className="w-8 h-8 text-white" />
                </div>
              </div>

              <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">Confirm Invoice Template</h2>
                <p className="text-gray-600 mb-4">
                  You have selected the <span className="font-semibold text-gray-900 capitalize">{selectedTemplate}</span> template for this invoice.
                </p>
                <div className="inline-flex items-center px-4 py-2 bg-purple-50 rounded-lg border border-purple-200">
                  <span className="text-sm font-medium capitalize text-purple-700">
                    {selectedTemplate} Template
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  This template cannot be changed after saving the invoice.
                </p>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={handleCancelSave}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmSave}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all font-medium flex items-center justify-center space-x-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>Confirm & Save</span>
                </button>
              </div>
            </div>
          </div>
        )}

        <style>{`
          @keyframes fade-in {
            from { opacity: 0; transform: scale(0.95) translateY(-10px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
          }
          .animate-fade-in { animation: fade-in 0.2s ease-out; }
        `}</style>
      </div>
    </div>
  );
};

export default CreateInvoice;
