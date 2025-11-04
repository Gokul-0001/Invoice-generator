import React from 'react';
import ModernTemplate from './templates/ModernTemplate';
import ClassicTemplate from './templates/ClassicTemplate';
import MinimalTemplate from './templates/MinimalTemplate';
import BoldTemplate from './templates/BoldTemplate';
import ElegantTemplate from './templates/ElegantTemplate';
import { Download, Printer, Mail } from 'lucide-react';
import { generatePDF, printInvoice } from '../utils/pdfGenerator';


const InvoicePreview = ({ data, template, onTemplateChange }) => {
  const templates = [
    { id: 'modern', name: 'Modern' },
    { id: 'classic', name: 'Classic' },
    { id: 'minimal', name: 'Minimal' },
    { id: 'bold', name: 'Bold' },
    { id: 'elegant', name: 'Elegant' },
  ];


  const renderTemplate = () => {
    switch (template) {
      case 'classic':
        return <ClassicTemplate data={data} />;
      case 'minimal':
        return <MinimalTemplate data={data} />;
      case 'bold':
        return <BoldTemplate data={data} />;
      case 'elegant':
        return <ElegantTemplate data={data} />;
      default:
        return <ModernTemplate data={data} />;
    }
  };


  const handleDownload = async () => {
    const filename = `Invoice-${data.invoiceNumber}.pdf`;
    const success = await generatePDF('invoice-template', filename);
    
    if (!success) {
      console.error('Failed to generate PDF');
    }
  };


  const handlePrint = () => {
    printInvoice('invoice-template');
  };


  const handleSendEmail = () => {
    const subject = `Invoice ${data.invoiceNumber}`;
    const body = `Please find attached the invoice ${data.invoiceNumber} for ${data.clientName}.`;
    window.location.href = `mailto:${data.clientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };


  return (
    <div className="space-y-6">
      {/* Template Selector and Action Buttons */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Select Template</h2>
            <p className="text-sm text-gray-600 mt-1">Choose a design for your invoice</p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={handleDownload} 
              className="flex items-center space-x-2 bg-white text-gray-700 px-5 py-2.5 rounded-lg hover:bg-purple-50 transition-colors border border-gray-300 shadow-sm font-medium"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>
            <button 
              onClick={handleSendEmail} 
              className="flex items-center space-x-2 bg-white text-gray-700 px-5 py-2.5 rounded-lg hover:bg-purple-50 transition-colors border border-gray-300 shadow-sm font-medium"
            >
              <Mail className="w-4 h-4" />
              <span>Send Email</span>
            </button>
            <button 
              onClick={handlePrint} 
              className="flex items-center space-x-2 bg-gray-900 text-white px-5 py-2.5 rounded-lg hover:bg-gray-800 transition-colors shadow-sm font-medium"
            >
              <Printer className="w-4 h-4" />
              <span>Print</span> 
            </button>
          </div>
        </div>


        {/* Template Selection Buttons */}
        {onTemplateChange && (
          <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
            {templates.map((temp) => (
              <button
                key={temp.id}
                onClick={() => onTemplateChange(temp.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  template === temp.id
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {temp.name}
              </button>
            ))}
          </div>
        )}
      </div>


      {/* Invoice Preview with Background */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-lg shadow-inner border border-gray-200">
        <div className="max-w-5xl mx-auto">
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
};


export default InvoicePreview;
