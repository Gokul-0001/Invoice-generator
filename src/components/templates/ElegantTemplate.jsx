import React from 'react';
import PaidStamp from '../PaidStamp';

const ElegantTemplate = ({ data }) => {
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

  // Show stamp only when paid indicator is 'stamp'
  const shouldShowStamp = data.isPaid && data.paidIndicator === 'stamp';

  return (
    <div 
      id="invoice-template" 
      className="bg-white max-w-4xl mx-auto shadow-lg print:shadow-none relative overflow-visible"
    >
      {/* Paid Stamp - Only for stamp indicator */}
      {shouldShowStamp && <PaidStamp paidDate={data.paidDate} template="elegant" />}

      {/* Header */}
      <div className="bg-gradient-to-br from-purple-600 to-pink-500 text-white p-12">
        {data.companyLogo && (
          <div className="mb-4">
            <img 
              src={data.companyLogo} 
              alt="Company Logo" 
              className="h-12 w-auto object-contain"
            />
          </div>
        )}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold mb-2">Invoice</h1>
            <p className="text-lg opacity-90">{data.invoiceNumber}</p>
          </div>
          <div className="text-right">
            {data.isPaid && data.paidIndicator === 'text' ? (
              <p className="text-sm opacity-90 mb-1">Paid Date: {data.paidDate}</p>
            ) : !data.isPaid ? (
              <>
                <p className="text-sm opacity-90 mb-1">Invoice Date: {data.invoiceDate}</p>
                {data.dueDate && (
                  <p className="text-sm font-semibold">Payment Due: {data.dueDate}</p>
                )}
              </>
            ) : null}
          </div>
        </div>
      </div>

      <div className="p-12">
        {/* From and Bill To */}
        <div className="grid grid-cols-2 gap-12 mb-12">
          <div>
            <div className="mb-3">
              <h3 className="text-purple-600 font-bold text-lg mb-1">Billed From</h3>
              <div className="w-20 h-0.5 bg-gradient-to-r from-purple-600 to-pink-500"></div>
            </div>
            <p className="font-semibold text-lg text-gray-900 mb-1">{data.companyName}</p>
            <p className="text-sm text-gray-600">{data.companyAddress}</p>
            <p className="text-sm text-gray-600">{data.companyCity}</p>
            <p className="text-sm text-gray-600">{data.companyEmail}</p>
            <p className="text-sm text-gray-600">{data.companyPhone}</p>
          </div>
          <div>
            <div className="mb-3">
              <h3 className="text-purple-600 font-bold text-lg mb-1">Billed To</h3>
              <div className="w-20 h-0.5 bg-gradient-to-r from-purple-600 to-pink-500"></div>
            </div>
            <p className="font-semibold text-lg text-gray-900 mb-1">{data.clientName}</p>
            <p className="text-sm text-gray-600">{data.clientAddress}</p>
            <p className="text-sm text-gray-600">{data.clientCity}</p>
            <p className="text-sm text-gray-600">{data.clientEmail}</p>
            <p className="text-sm text-gray-600">{data.clientPhone}</p>
          </div>
        </div>

        {/* Items Table */}
        <table className="w-full mb-8">
          <thead>
            <tr className="border-b-2 border-purple-600">
              <th className="text-left py-4 px-2 font-bold text-purple-700">Description</th>
              <th className="text-center py-4 px-2 font-bold text-purple-700">Qty</th>
              <th className="text-right py-4 px-2 font-bold text-purple-700">Rate</th>
              <th className="text-right py-4 px-2 font-bold text-purple-700">Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="py-4 px-2">{item.description}</td>
                <td className="text-center py-4 px-2">{item.quantity}</td>
                <td className="text-right py-4 px-2">{formatCurrency(item.rate)}</td>
                <td className="text-right py-4 px-2 font-semibold">
                  {formatCurrency(item.quantity * item.rate)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div className="flex justify-end mb-8">
          <div className="w-96">
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="text-gray-700">Subtotal</span>
              <span className="font-semibold text-gray-900">{formatCurrency(calculateSubtotal())}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="text-gray-700">Tax ({data.taxRate}%)</span>
              <span className="font-semibold text-gray-900">{formatCurrency(calculateTax())}</span>
            </div>
            <div className="flex justify-between py-4 px-6 bg-gradient-to-br from-purple-600 to-pink-500 text-white rounded-lg mt-4">
              <span className="text-lg font-bold">
                {data.isPaid ? 'Total Amount' : 'Total Amount Due'}
              </span>
              <span className="text-lg font-bold">{formatCurrency(calculateTotal())}</span>
            </div>
            {/* Paid Amount - shown for all paid invoices */}
            {data.isPaid && (
              <div className="flex justify-between py-3 px-6 bg-green-50 mt-2 rounded border border-green-200">
                <span className="font-semibold text-green-900">Paid Amount</span>
                <span className="font-bold text-green-900">{formatCurrency(calculateTotal())}</span>
              </div>
            )}
          </div>
        </div>

        {/* Notes and Terms */}
        <div className="grid grid-cols-2 gap-8 pt-8 border-t border-purple-200">
          <div>
            <h4 className="font-bold text-purple-700 mb-2">Notes</h4>
            <p className="text-sm text-gray-700">{data.notes}</p>
          </div>
          <div>
            <h4 className="font-bold text-purple-700 mb-2">Terms & Conditions</h4>
            <p className="text-sm text-gray-700">{data.terms}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElegantTemplate;
