import React from 'react';
import PaidStamp from '../PaidStamp';

const ModernTemplate = ({ data }) => {
  const calculateSubtotal = () => {
    return data.items.reduce((sum, item) => sum + item.quantity * item.rate, 0);
  };

  const calculateTax = () => {
    return (calculateSubtotal() * data.taxRate) / 100;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const formatCurrency = (amount) => {
    return `${data.currencySymbol || '$'}${amount.toFixed(2)}`;
  };

  return (
    <div 
      id="invoice-template" 
      className="bg-white p-8 max-w-4xl mx-auto shadow-lg print:shadow-none print:p-0 relative overflow-visible"
    >
      
      {/* Paid Stamp */}
      {data.isPaid && <PaidStamp paidDate={data.paidDate} template="modern" />}

      <div className="px-12 py-8">
        {/* Company Logo at Top */}
        {data.companyLogo && (
          <div className="mb-6">
            <img 
              src={data.companyLogo} 
              alt="Company Logo" 
              className="h-16 w-auto object-contain"
            />
          </div>
        )}

        {/* Invoice Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-5xl font-bold text-blue-600 mb-2">INVOICE</h1>
            <p className="text-xl text-gray-600">#{data.invoiceNumber}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600 mb-1">Issue Date: {data.invoiceDate}</p>
            {!data.isPaid && data.dueDate && (
              <p className="text-sm text-gray-600">Due Date: {data.dueDate}</p>
            )}
          </div>
        </div>

        {/* From and Bill To */}
        <div className="grid grid-cols-2 gap-12 mb-12">
          <div>
            <h3 className="text-blue-600 font-bold text-sm uppercase tracking-wide mb-3">
              FROM
            </h3>
            <p className="font-bold text-lg mb-1">{data.companyName}</p>
            <p className="text-sm text-gray-600">{data.companyAddress}</p>
            <p className="text-sm text-gray-600">{data.companyCity}</p>
            <p className="text-sm text-gray-600">{data.companyEmail}</p>
            <p className="text-sm text-gray-600">{data.companyPhone}</p>
          </div>
          <div>
            <h3 className="text-blue-600 font-bold text-sm uppercase tracking-wide mb-3">
              BILL TO
            </h3>
            <p className="font-bold text-lg mb-1">{data.clientName}</p>
            <p className="text-sm text-gray-600">{data.clientAddress}</p>
            <p className="text-sm text-gray-600">{data.clientCity}</p>
            <p className="text-sm text-gray-600">{data.clientEmail}</p>
            <p className="text-sm text-gray-600">{data.clientPhone}</p>
          </div>
        </div>

        {/* Items Table */}
        <table className="w-full mb-8">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="text-left py-3 px-4 font-semibold">Description</th>
              <th className="text-center py-3 px-4 font-semibold">Qty</th>
              <th className="text-right py-3 px-4 font-semibold">Rate</th>
              <th className="text-right py-3 px-4 font-semibold">Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="py-4 px-4">{item.description}</td>
                <td className="text-center py-4 px-4">{item.quantity}</td>
                <td className="text-right py-4 px-4">{formatCurrency(item.rate)}</td>
                <td className="text-right py-4 px-4 font-semibold">
                  {formatCurrency(item.quantity * item.rate)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div className="flex justify-end mb-12">
          <div className="w-80">
            <div className="flex justify-between py-2 text-gray-700">
              <span>Subtotal</span>
              <span className="font-semibold">{formatCurrency(calculateSubtotal())}</span>
            </div>
            <div className="flex justify-between py-2 text-gray-700 mb-2">
              <span>Tax ({data.taxRate}%)</span>
              <span className="font-semibold">{formatCurrency(calculateTax())}</span>
            </div>
            <div className="flex justify-between py-4 px-4 bg-blue-600 text-white rounded">
              <span className="text-lg font-bold">Total</span>
              <span className="text-lg font-bold">{formatCurrency(calculateTotal())}</span>
            </div>
          </div>
        </div>

        {/* Notes and Terms */}
        <div className="grid grid-cols-2 gap-8 pt-8 border-t border-gray-200">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Notes</h4>
            <p className="text-sm text-gray-600">{data.notes}</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Terms & Conditions</h4>
            <p className="text-sm text-gray-600">{data.terms}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;
