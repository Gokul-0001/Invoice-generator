import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useInvoice } from '../context/InvoiceContext';
import { ArrowLeft, Download, Printer } from 'lucide-react';
import { generatePDF, printInvoice } from '../utils/pdfGenerator';
import ModernTemplate from '../components/templates/ModernTemplate';
import ClassicTemplate from '../components/templates/ClassicTemplate';
import MinimalTemplate from '../components/templates/MinimalTemplate';
import BoldTemplate from '../components/templates/BoldTemplate';
import ElegantTemplate from '../components/templates/ElegantTemplate';


const InvoicePreviewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { invoices } = useInvoice();


  const invoice = invoices.find(inv => inv.id === parseInt(id));


  if (!invoice) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Invoice Not Found</h2>
          <button
            onClick={() => navigate('/invoices')}
            className="btn-primary"
          >
            Back to Invoices
          </button>
        </div>
      </div>
    );
  }


  const renderTemplate = () => {
    const templateMap = {
      modern: ModernTemplate,
      classic: ClassicTemplate,
      minimal: MinimalTemplate,
      bold: BoldTemplate,
      elegant: ElegantTemplate,
    };


    const TemplateComponent = templateMap[invoice.template] || ModernTemplate;
    return <TemplateComponent data={invoice} />;
  };


  const handleDownload = async () => {
    const filename = `Invoice-${invoice.invoiceNumber}.pdf`;
    await generatePDF('invoice-template', filename);
  };


  const handlePrint = () => {
    printInvoice('invoice-template');
  };


  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate('/invoices')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Invoices</span>
        </button>


        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">
            Template: <span className="font-semibold capitalize text-purple-600">{invoice.template}</span>
          </span>


          {invoice.isPaid && (
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              Paid
            </span>
          )}


          <button
            onClick={handlePrint}
            className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Print</span>
          </button>


          <button
            onClick={handleDownload}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>


      {/* Invoice Preview */}
      <div className="bg-white rounded-lg shadow-lg overflow-visible">
        {renderTemplate()}
      </div>


    </div>
  );
};


export default InvoicePreviewPage;
